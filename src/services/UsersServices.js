import firebase from '@/config/firebase'

let usersServices = {
    getAllUsers:()=>{
        let users=[]
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("users")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    users.push(doc.data());
                })
                resolve({
                    success:true,
                    data:users
                })
            })
            .catch(err => {
                reject(err)
            });
        })
    },
    removeUser:(uid)=>{
        return new Promise((resolve,reject)=>{
            let appp = firebase.functions.httpsCallable('team-removeAuth')
            appp({uid:uid}).then(res=>{
                resolve({
                    success: true,
                    msg: res
                })
            }).catch(e=>{
                console.log(e)
                reject({
                    success: false,
                    msg: e
                })
            })
        })
    }
}
export default usersServices