import firebase from '@/config/firebase'

let usersServices = {
    getCurrentUserDetails: () => {
        let uid = ''
        return new Promise((resolve, reject) => {
            uid = firebase.auth.currentUser.uid

            firebase.firestore.collection('team').where("uid", "==", uid).get().then(docs => {
                // console.log(docs)
                docs.forEach(doc => {
                    resolve({
                        success: true,
                        data: doc.data(),
                        uid: uid
                    })
                })
            }).catch(e => {
                reject({
                    success: false,
                    msg: e
                })
                // console.log(e)
            })
        })
    },

    getUserRole: () => {
        let uid = ''
        return new Promise((resolve, reject) => {
            uid = firebase.auth.currentUser.uid

            firebase.firestore.collection('users').doc(uid).get().then(docs => {
                // console.log(docs)
                resolve({
                    success: true,
                    data: docs.data(),
                    exists: docs.exists
                })
            }).catch(e => {
                reject({
                    success: false,
                    msg: e
                })
                // console.log(e)
            })
        })
    },
    updateUser: (docid, userType) => {
        return new Promise((resolve, reject) => {
            firebase.firestore.collection('users').doc(docid).update({
                userType: userType
            }).then(() => {
                // console.log(docs)
                resolve({
                    success: true,
                    msg: "User role updated"
                })
            }).catch(e => {
                reject({
                    success: false,
                    msg: e
                })
            })
        })
    },
    updateUserPassword: (currentPassword, newPassword) => {
        return new Promise((resolve, reject) => {
            var user = firebase.auth.currentUser;
            var cred = firebase.authw.EmailAuthProvider.credential(
                user.email, currentPassword);
            user.reauthenticateWithCredential(cred).then(() => {
                var user = firebase.auth.currentUser;
                user.updatePassword(newPassword).then(() => {
                    // console.log("Password updated!");
                    resolve({
                        success: true,
                        msg: "Password updated!"
                    });
                }).catch((e) => {
                    // console.log(e);
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
        });
    },

    getAllUsers: () => {
        let users = []
        let teams = []
        let finaldata = []
        // console.log('calling')
        return new Promise((resolve, reject) => {
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
                        })
                    })
                    let asd = await users.map(user => {
                        teams.map(team => {
                            if (user.uid == team.uid) {
                                let fobj = {
                                    ...team,
                                    ...user
                                }
                                finaldata.push(fobj)
                            }
                        })
                    })

                    resolve({
                        success: true,
                        data: finaldata
                    })
                })
                .catch(err => {
                    reject(err)
                });
        })
    },
    removeUser: (uid, name,communityName, communityEmail) => {
        return new Promise((resolve, reject) => {
            let appp = firebase.functions.httpsCallable('team-removeAuth')
            appp({
                uid: uid,
                name: name,
                communityName:communityName,
                communityEmail:communityEmail
            }).then(res => {
                resolve(res.data)
            }).catch(e => {
                reject(e)
            })
        })
    },
    enableUser: (uid) => {
        return new Promise((resolve, reject) => {
            let appp = firebase.functions.httpsCallable('team-enabledAuth')
            appp(uid).then(res => {
                resolve(res.data)
            }).catch(e => {
                // console.log(e)
                reject(e)
            })
        });
    },
    disableUser: (uid) => {
        return new Promise((resolve, reject) => {
            let appp = firebase.functions.httpsCallable('team-disabledAuth');
            appp(uid).then(res => {
                resolve(res.data);
            }).catch(e => {
                // console.log(e);
                reject(e);
            });
        });
    }

};
export default usersServices;