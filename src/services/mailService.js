import firebase from '@/config/firebase'

let mailServices = {
    // Get All the mail Details
    getAllMails:()=>{
        let mails = []
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("mails")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    mails.push(doc.data());
                })
                resolve({
                    success:true,
                    data:mails
                })
            })
            .catch(err => {
                reject(err)
            });
        })
    },

    // Get mail Details whose id = id
    getMailDetails:(id)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("mails")
            .doc(id)
            .get()
            .then(doc => {
                if (doc.data() == undefined) {
                    resolve({
                        isFound:false,
                        data:{}
                    })
                } else if (doc.data()) {
                    resolve({
                        isFound:true,
                        data: doc.data()
                    })
                } else {
                resolve({
                    isFound:false,
                    data:{}
                })
                }
            })
            .catch(e => {
                reject(e)
            })
        })
    },

    // Add mail whose document id is id and Data is data
    addMail:(id,data)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("mails")
            .doc(id)
            .set(data)
            .then(res => {
                resolve({
                    success:true,
                    msg:'Mail Addedd Successfully'
                })
            })
            .catch(e => {
                reject({
                    success:false,
                    msg:'Failed to Add Mail: '+ e
                })
            });
        })
    },

    // Remove mail whose id is id
    removeMail:(id)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("mails")
            .doc(id)
            .delete()
            .then(() => {
                resolve({
                    success:true,
                    msg:'Mail Removed Successfully'
                })
            })
            .catch(e => {
                reject({
                    success:false,
                    msg:'Error in Removing Mail: '+e
                })
            });
        })
    },

    // Edit Mail whose id is id and data is data
    editMail:(id, data)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("mails")
            .doc(id)
            .update(data)
            .then(() => {
                resolve({
                    success:true,
                    msg: data.name +' updated Successfully'
                })
            })
            .catch(e => {
                reject({
                    success: false,
                    msg: 'Error in updating Mail '+ e
                })
            });
        })
    }
}

export default mailServices
