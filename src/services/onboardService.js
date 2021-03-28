import firebase from '@/config/firebase';

let teamOnboard = {
    getUserById: (id) => new Promise((resolve, reject) => {
        try {
            firebase.firestore.collection("teamOnboard").doc(id).get().then(doc => {
                if (doc.exists) {
                    resolve(doc.data());
                } else {
                    reject({
                        success: false,
                        message: "User Not exists",
                    });
                }
            });
        } catch (e) {
            reject(e);
        }
    }),
    deleteTempUse: (id) => new Promise((resolve, reject) => {
        firebase.firestore.collection("teamOnboard").doc(id).delete().then(() => {
            resolve({
                success: true
            });
        }).catch(e => {
            reject(e);
        });
    }),
    addOnBoardUserToUserManagement: (data) => new Promise((resolve, reject) => {
        firebase.firestore.collection("users").doc(data.uid).set({
            disabled: false,
            id: data.id,
            uid: data.uid,
            userType: data.userType
        }).then(result => {
            resolve({
                success: true
            });
        }).catch(e => {
            reject(e);
        });
    }),
    updateTeamWithUID: (uid, id) => new Promise((resolve, reject) => {
        firebase.firestore.collection("team").doc(id).update({uid}).then(res=>{
            resolve({success: true});
        }).catch(e=>{
            reject(e);
        });
    })
};

export default teamOnboard;