import firebase from '@/config/firebase'

let speakersServices = {
    // Get All the Speakers Details
    getAllSpeakers:()=>{
        let speakers = []
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("Speakers")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    speakers.push(doc.data());
                })
                resolve({
                    success:true,
                    data:speakers
                })
            })
            .catch(err => {
                reject(err)
            });
        })
    },

    // Get Speaker Details whose id = id
    getSpeakerDetails:(id)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("Speakers")
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

    // Add speaker whose document id is id and Data is data
    addSpeaker:(id,data)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("Speakers")
            .doc(id)
            .set(data)
            .then(res => {
                resolve({
                    success:true,
                    msg:'Speakers Addedd Successfully'
                })
            })
            .catch(e => {
                reject({
                    success:false,
                    msg:'Failed to Add Speaker: '+ e
                })
            });
        })
    },

    // Remove Speaker whose id is id
    removeSpeaker:(id)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("Speakers")
            .doc(id)
            .delete()
            .then(() => {
                resolve({
                    success:true,
                    msg:'Speaker Removed Successfully'
                })
            })
            .catch(e => {
                reject({
                    success:false,
                    msg:'Error in Removing Speaker : '+e
                })
            });
        })
    },

    // Edit Speaker whose id is id and data is data
    editSpeaker:(id, data)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("Speakers")
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
                    msg: 'Error in updating Team Member '+ e
                })
            });
        })
    }
}

export default speakersServices
