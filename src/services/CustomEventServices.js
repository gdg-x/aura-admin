import firebase from '@/config/firebase'

let customEventServices = {
    // Get All the Custom Events Details
    getAllCustomEvents:()=>{
        let events = []
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("events")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    events.push(doc.data());
                })
                resolve({
                    success:true,
                    data:events
                })
            })
            .catch(err => {
                reject(err)
            });
        })
    },

    // Get Custom Event Details whose id = id
    getCustomEventDetails:(id)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("events")
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

    // Add Custom Event whose document id is id and Data is data
    addCustomEvent:(id,data)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("events")
            .doc(id)
            .set(data)
            .then(res => {
                resolve({
                    success:true,
                    msg:'Custom Event Addedd Successfully'
                })
            })
            .catch(e => {
                reject({
                    success:false,
                    msg:'Failed to Custom Event: '+ e
                })
            });
        })
    },

    // Remove Custom Event whose id is id
    removeCustomEvent:(id)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("events")
            .doc(id)
            .delete()
            .then(() => {
                resolve({
                    success:true,
                    msg:'Custom Event Removed Successfully'
                })
            })
            .catch(e => {
                reject({
                    success:false,
                    msg:'Error in Removing Custom Event: '+e
                })
            });
        })
    },

    // Edit Custom Event whose id is id and data is data
    editCustomEvent:(id, data)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("events")
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
                    msg: 'Error in updating Custom Event '+ e
                })
            });
        })
    }
}

export default customEventServices
