import firebase from '@/config/firebase';

const authServices = {
    resetPassword: (email) => new Promise((resolve, reject) => {
        firebase.auth.sendPasswordResetEmail(email).then(() => {
            resolve({
                success: true
            });
        }).catch((error) => {
            reject({
                success: false,
                message: error
            });
        });
    })
};

export default authServices;