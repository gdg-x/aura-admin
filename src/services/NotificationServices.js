import firebase from '@/config/firebase'

let notificationServices = {
    // Get All Push Notification Details
    getAllPushNotifications:()=>{
        let pushNotification = []
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("pushNotifications")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    let data = doc.data();
                    data.id = doc.id;
                    pushNotification.push(data);
                })
                resolve({
                    success:true,
                    data:pushNotification
                })
            })
            .catch(err => {
                reject(err)
            });
        })
    },

    // Add Push Notification whose document id is id and Data is data
    addPushNotification:(data)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("pushNotifications")
            .add(data)
            .then(res => {
                resolve({
                    success:true,
                    msg:'Push Notification Addedd Successfully'
                })
            })
            .catch(e => {
                reject({
                    success:false,
                    msg:'Failed to Add Push Notification: '+ e
                })
            });
        })
    },

    // Remove Notification whose id is id
    removeNotification:(id)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("pushNotifications")
            .doc(id)
            .delete()
            .then(() => {
                resolve({
                    success:true,
                    msg:'Push Notifiaction Removed Successfully'
                })
            })
            .catch(e => {
                reject({
                    success:false,
                    msg:'Error in Removing Push Notifiaction : '+e
                })
            });
        })
    },

    // Edit PushNotification whose id is id and data is data
    editPushNotification:(id, data)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("pushNotifications")
            .doc(id)
            .update(data)
            .then(() => {
                resolve({
                    success:true,
                    msg: data.title +' updated Successfully'
                })
            })
            .catch(e => {
                reject({
                    success: false,
                    msg: 'Error in updating Team Member '+ e
                })
            });
        })
    }
}

export default notificationServices