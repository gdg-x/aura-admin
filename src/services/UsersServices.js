import firebase from '@/config/firebase';

let usersServices = {
    addUser: (data) => new Promise((resolve, reject) => {
        firebase.firestore.collection("teamOnboard").doc(data.id).set({
            email: data.email,
            userType: data.userType,
            id: data.id,
        }).then(res => {
            resolve({
                success: true,
                message: "User Added Success"
            });
        }).catch(e => {
            reject(e);
        });
    }),

    removePendingUser: (userId) => new Promise((resolve, reject) => {
        firebase.firestore.collection("teamOnboard").doc(userId).delete().then(()=>{
            resolve({success: true});
        }).catch(e=>{
            reject({success: false, msg: e});
        });
    }),

    getCurrentUserDetails: () => new Promise((resolve, reject) => {
        const uid = firebase.auth.currentUser.uid;
        firebase.firestore.collection('team').where("uid", "==", uid).get().then(docs => {
            docs.forEach(doc => {
                resolve({
                    success: true,
                    data: doc.data(),
                    uid: uid
                });
            });
        }).catch(e => {
            reject({
                success: false,
                msg: e
            });
        });
    }),

    getUserRole: () => new Promise((resolve, reject) => {
        const uid = firebase.auth.currentUser.uid;
        firebase.firestore.collection('users').doc(uid).get().then(docs => {
            resolve({
                success: true,
                data: docs.data(),
                exists: docs.exists
            });
        }).catch(e => {
            reject({
                success: false,
                msg: e
            });
        });
    }),
    updateUser: (docid, userType) => new Promise((resolve, reject) => {
        firebase.firestore.collection('users').doc(docid).update({
            userType: userType
        }).then(() => {
            resolve({
                success: true,
                msg: "User role updated"
            });
        }).catch(e => {
            reject({
                success: false,
                msg: e
            });
        });
    }),

    updateUserPassword: (currentPassword, newPassword) => new Promise((resolve, reject) => {
        var user = firebase.auth.currentUser;
        var cred = firebase.authw.EmailAuthProvider.credential(
            user.email, currentPassword);
        user.reauthenticateWithCredential(cred).then(() => {
            var user = firebase.auth.currentUser;
            user.updatePassword(newPassword).then(() => {
                resolve({
                    success: true,
                    msg: "Password updated!"
                });
            }).catch((e) => {
                reject({
                    success: false,
                    msg: e
                });
            });
        }).catch((error) => {
            reject({
                success: false,
                msg: error
            });
        });
    }),

    getAllUsers: () => new Promise((resolve, reject) => {
        let users = [];
        let teams = [];
        let finaldata = [];
        firebase.firestore
            .collection("users")
            .get()
            .then(async (snapshot) => {
                await snapshot.forEach(doc => {
                    users.push(doc.data())
                })
                await firebase.firestore.collection('team').get().then(docs => {
                    docs.forEach(teamdoc => {
                        teams.push(teamdoc.data())
                    });
                });
                let asd = await users.map(user => {
                    teams.map(team => {
                        if (user.uid == team.uid) {
                            let fobj = {
                                ...team,
                                ...user
                            };
                            finaldata.push(fobj);
                        }
                    });
                });

                resolve({
                    success: true,
                    data: finaldata
                });
            })
            .catch(err => {
                reject(err);
            });
    }),

    // Get All Pending Users Info

    getAllPendingUsers: () => new Promise((resolve, reject) => {
        let users = [];
        firebase.firestore
            .collection("teamOnboard")
            .get()
            .then(async (snapshot) => {
                await snapshot.forEach(doc => {
                    users.push(doc.data())
                })

                resolve({
                    success: true,
                    data: users
                });
            })
            .catch(err => {
                reject(err);
            });
    }),


    removeUser: (uid) => new Promise((resolve, reject) => {
        firebase.firestore.collection("users").doc(uid).delete().then(res => {
            resolve({
                success: true
            });
        }).catch(e => {
            reject(e);
        });
    }),

    enableUser: (uid) => new Promise((resolve, reject) => {
        firebase.firestore.collection('users').doc(uid).update({
            disabled: false
        }).then(res => {
            resolve({
                success: true
            });
        }).catch(e => {
            reject(e);
        });
    }),

    disableUser: (uid) => new Promise((resolve, reject) => {
        firebase.firestore.collection('users').doc(uid).update({
            disabled: true
        }).then(res => {
            resolve({
                success: true
            });
        }).catch(e => {
            reject(e);
        });
    }),

};
export default usersServices;