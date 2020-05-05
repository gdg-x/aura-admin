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
    return data.text+ ' Vrijraj Singh'
});


exports.removeAuth = functions.https.onCall((data)=>{
    console.log(data)
    const uid = data.uid
    let email =''
    let name = ''

    admin.auth().getUser(uid)
    .then(function(userRecord) {
        console.log('Successfully fetched user data:', userRecord.toJSON());
        email = userRecord.toJSON().email
        name = userRecord.toJSON().displayName
    })
    .catch(function(error) {
        console.log('Error fetching user data:', error);
    });

    return admin.auth().deleteUser(uid)
    .then(()=>{
        console.log('Successfully deleted user');
        return admin.firestore().collection('users').doc(uid).delete().then(async ()=>{
            let maildata = await sendGoodbyeEmail(email, name);
            return {
                success: true,
                mailstatus: maildata,
                msg:'Successfully deleted user'
            }
        })
    })
    .catch((error)=>{
        console.log('Error deleting user:', error);
        return {
            success: false,
            msg:error
        }
    });
})

exports.createAuthUser = functions.https.onCall(async(data)=>{
    console.log(data)
    const email = data.email 
    const password = generateP()
    const name = data.name 
    const image = data.image
    const role = data.role 
    const userType = data.userType
    return admin.auth().createUser({
        email: email,
        password: password,
        displayName: name,
        photoURL: image
    })
    .then((userRecord)=> {
        console.log('Successfully created new user:', userRecord.uid);
        return admin.firestore().collection('users').doc(userRecord.uid).set({
            uid:userRecord.uid,
            userType: userType,
            id:data.id 
        }).then(async ()=>{
            console.log('User Created with uid: '+ userRecord.uid)
            let maildata = await sendWelcomeEmail(email, name, password);
            return {
                success: true,
                emailstatus: maildata,
                msg: 'Successfully created new user:', 
                uid: userRecord.uid,
                docid: data.id
            }
        }).catch(e=>{
            return {
                success: false,
                msg: 'Error in Creating User : ' + e, 
            }
        })
    
    })
    .catch((error)=> {
        console.log('Error creating new user:', error);
        return {
            success: false,
            msg: 'Error in Creating User : ' + error, 
        }
    });
})

exports.createAuth = functions.https.onCall((data)=>{
    console.log(data)
    const email = data.email 
    const password = data.password 
    const name = data.name 
    const image = data.image
    const role = data.role 

    if((role == 'Core Team') || (role == 'Organizing Team') ){
        admin.auth().createUser({
            email: email,
            password: password,
            displayName: name,
            photoURL: image,
            role: role
        })
        .then((userRecord)=> {
            console.log('Successfully created new user:', userRecord.uid);
            admin()
            sendWelcomeEmail(email, name).then(res=>{
                return 'User created with UID ' + userRecord.uid
            }).catch(e=>{
                return e
            })
        })
        .catch((error)=> {
            console.log('Error creating new user:', error);
            return error
        });
    }
})

async function sendWelcomeEmail(email, displayName, pass) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: email,
    };
    mailOptions.subject = `Welcome to ${APP_NAME}!`;
    mailOptions.html = `
        <p>Hey ${displayName || ''}!</p> 
        <p>Welcome to ${APP_NAME}. I hope you will enjoy our service.</p>
        <p>This email contains important account access information for your ${email} account.</p>
        <p>This is your temporary password: <b>${pass}</b></p>
        <br>
        <p>If you have any questions, please contact contact@gdgjalandhar.com</p>
        <br>
        <p>Regards</p>
        <p>Team Admin</p>
    `;
    try{
        let data = await mailTransport.sendMail(mailOptions);
        return {
            success: true,
            msg: `Mail Sent to ${email}`
        }
    }catch(e){
        console.log(e);
        return {
            success: false,
            msg: `Error ${e}`
        }
    }
    
}

async function sendGoodbyeEmail(email, name) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: email,
    };
    mailOptions.subject = `Bye! to ${APP_NAME}!`;
    mailOptions.html = `
        <p>Hey ${name}!</p> 
        <p>Bye to ${APP_NAME}. I hope you have enjoyed our service.</p>
        <p>We confirm that we have deleted your ${APP_NAME} account. </p>
        <br>
        <p>If you have any questions, please contact contact@gdgjalandhar.com</p>
        <br>
        <p>Regards</p>
        <p>Team Admin</p>
    `;
    try{
        let data = await mailTransport.sendMail(mailOptions);
        return {
            success: true,
            msg: `Mail Sent to ${email}`
        }
    }catch(e){
        console.log(e);
        return {
            success: false,
            msg: `Error ${e}`
        }
    }
    
}

function generateP() { 
    var pass = ''; 
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +  
            'abcdefghijklmnopqrstuvwxyz0123456789@#$'; 
      
    for (i = 1; i <= 8; i++) { 
        var char = Math.floor(Math.random() 
                    * str.length + 1); 

        pass += str.charAt(char) 
    } 
      
    return pass; 
} 
