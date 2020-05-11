const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

const APP_NAME = 'Aura Admin';
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: functions.config().someservice.email,
        pass: functions.config().someservice.password
    },
});

exports.addMessage = functions.https.onCall((data) => {
    console.log(data)
    return data.text + ' Vrijraj Singh'
});

exports.disabledAuth = functions.https.onCall((uid) => {
    return admin.auth().updateUser(uid, {
        disabled: true
    }).then(async (userRecord) => {
        try {
            let updateUser = await admin.firestore().collection('users').doc(uid).update({
                disabled: true
            })
            return {
                success: true,
                msg: `${userRecord.toJSON().email} is Disabled`
            }
        } catch (e) {
            return {
                success: false,
                cc: 'Error while updating user collections',
                msg: e
            }
        }
    }).catch(e => {
        return {
            success: false,
            cc: 'Error while disabling user auth',
            msg: e
        }
    })
})

exports.enabledAuth = functions.https.onCall((uid) => {
    return admin.auth().updateUser(uid, {
        disabled: false
    }).then(async (userRecord) => {
        try {
            let updateUser = await admin.firestore().collection('users').doc(uid).update({
                disabled: false
            })
            return {
                success: true,
                msg: `${userRecord.toJSON().email} is Enabled`
            }
        } catch (e) {
            return {
                success: false,
                cc: 'Error while updating user collections',
                msg: e
            }
        }
    }).catch(e => {
        return {
            success: false,
            cc: 'Error while disabling user auth',
            msg: e
        }
    })
})

exports.removeAuth = functions.https.onCall((data) => {
    console.log(data)
    const uid = data.uid
    const name = data.name
    const communityEmail = data.communityEmail
    const communityName = data.communityName
    let email = ''

    admin.auth().getUser(uid)
        .then(function (userRecord) {
            console.log('Successfully fetched user data:', userRecord.toJSON());
            email = userRecord.toJSON().email
        })
        .catch(function (error) {
            console.log('Error fetching user data:', error);
        });

    return admin.auth().deleteUser(uid)
        .then(() => {
            console.log('Successfully deleted user');
            return admin.firestore().collection('users').doc(uid).delete().then(async () => {
                let maildata = await sendGoodbyeEmail(email, name, communityName, communityEmail);
                return {
                    success: true,
                    mailstatus: maildata,
                    msg: 'Successfully deleted user'
                }
            })
        })
        .catch((error) => {
            console.log('Error deleting user:', error);
            return {
                success: false,
                msg: error
            }
        });
})

exports.createAuthUser = functions.https.onCall(async (data) => {
    console.log(data)
    const email = data.email
    const password = generateP()
    const name = data.name
    const userType = data.userType
    const communityEmail = data.communityEmail
    const communityName = data.communityName
    return admin.auth().createUser({
            email: email,
            password: password
        })
        .then((userRecord) => {
            console.log('Successfully created new user:', userRecord.uid);
            return admin.firestore().collection('users').doc(userRecord.uid).set({
                uid: userRecord.uid,
                userType: userType,
                id: data.id,
                disabled: false
            }).then(async () => {
                console.log('User Created with uid: ' + userRecord.uid)
                let maildata = await sendWelcomeEmail(email, name, password, communityEmail, communityName);
                return admin.firestore().collection('team').doc(data.id).update({
                    uid: userRecord.uid
                }).then(() => {
                    return {
                        success: true,
                        emailstatus: maildata,
                        msg: 'Successfully created new user',
                        uid: userRecord.uid,
                        docid: data.id
                    }
                }).catch(e => {
                    return {
                        success: false,
                        emailstatus: maildata,
                        msg: 'Problem while updating team data',
                        error: e
                    }
                })
            }).catch(e => {
                return {
                    success: false,
                    msg: 'Error in Creating User : ' + e,
                }
            })

        })
        .catch((error) => {
            console.log('Error creating new user:', error);
            return {
                success: false,
                msg: 'Error in Creating User : ' + error,
            }
        });
})

async function sendWelcomeEmail(email, displayName, pass, communityEmail, communityName) {
    const mailOptions = {
        from: `${communityName} <${communityEmail}>`,
        to: email,
    };
    mailOptions.subject = `Welcome to ${communityName}!`;
    mailOptions.html = `
        <p>Hey ${displayName || ''}!</p> 
        <p>Welcome to ${communityName}. I hope you will enjoy our service.</p>
        <p>This email contains important account access information for your ${email} account.</p>
        <p>This is your temporary password: <b>${pass}</b></p>
        <p>Kindly Login into Admin panel or Contact Admin</p>
        <br>
        <p>If you have any questions, please contact ${communityEmail}</p>
        <br>
        <p>Regards</p>
        <p>Team ${communityName}</p>
    `;
    try {
        let data = await mailTransport.sendMail(mailOptions);
        return {
            success: true,
            msg: `Mail Sent to ${email}`
        }
    } catch (e) {
        console.log(e);
        return {
            success: false,
            msg: `Error ${e}`
        }
    }

}

async function sendGoodbyeEmail(email, name, communityName, communityEmail) {
    const mailOptions = {
        from: `${communityName} <${communityEmail}>`,
        to: email,
    };
    mailOptions.subject = `Bye! to ${communityName}!`;
    mailOptions.html = `
        <p>Hey ${name}!</p> 
        <p>Bye to ${communityName}. I hope you have enjoyed our service.</p>
        <p>We confirm that we have deleted your ${communityName} account. </p>
        <br>
        <p>If you have any questions, please contact ${communityEmail}</p>
        <br>
        <p>Regards</p>
        <p>Team ${communityName}</p>
    `;
    try {
        let data = await mailTransport.sendMail(mailOptions);
        return {
            success: true,
            msg: `Mail Sent to ${email}`
        };
    } catch (e) {
        console.log(e);
        return {
            success: false,
            msg: `Error ${e}`
        };
    }

}

function generateP() {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';
    for (let i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random() * str.length + 1);

        pass += str.charAt(char);
    }
    return pass;
}