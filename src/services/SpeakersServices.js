import firebase from '@/config/firebase'

let speakersServices = {
    getEventsBySpeaker: (id) => {
        let events = []
        return new Promise((resolve, reject) => {
            firebase.firestore.collection('events').where('speakers', "array-contains", id).get().then(docs => {
                docs.forEach(doc => {
                    events.push(doc.data())
                })
                resolve({
                    success: true,
                    data: events
                })
            }).catch(e => {
                reject({
                    success: false,
                    msg: e
                })
            })
        })
    },

    // Get All the Speakers Details
    getAllSpeakers: () => {
        let speakers = []
        return new Promise((resolve, reject) => {
            firebase.firestore
                .collection("Speakers")
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        speakers.push(doc.data());
                    })
                    resolve({
                        success: true,
                        data: speakers
                    })
                })
                .catch(err => {
                    reject(err)
                });
        })
    },

    // Get Speaker Details whose id = id    
    getSpeakerDetails: (id) => new Promise((resolve, reject) => {
        firebase.firestore.collection("Speakers").doc(id).get().then(doc => {
            if (doc.exists) {
                resolve({
                    success: true,
                    data: doc.data()
                });
            } else {
                reject({
                    success: false,
                    message: "User Not exists",
                });
            }
        }).catch(e => {
            reject(e);
        })
    }),

    // Add speaker whose document id is id and Data is data
    addSpeaker: (id, data) => {
        return new Promise((resolve, reject) => {
            firebase.firestore
                .collection("Speakers")
                .doc(id)
                .set(data)
                .then(res => {
                    resolve({
                        success: true,
                        msg: 'Speaker Added Successfully'
                    })
                })
                .catch(e => {
                    reject({
                        success: false,
                        msg: 'Failed to Add Speaker: ' + e
                    })
                });
        })
    },

    // Remove Speaker whose id is id
    removeSpeaker: (id) => {
        return new Promise((resolve, reject) => {
            firebase.firestore
                .collection("Speakers")
                .doc(id)
                .delete()
                .then(() => {
                    resolve({
                        success: true,
                        msg: 'Speaker Removed Successfully'
                    })
                })
                .catch(e => {
                    reject({
                        success: false,
                        msg: 'Error in Removing Speaker : ' + e
                    })
                });
        })
    },

    // Edit Speaker whose id is id and data is data
    editSpeaker: (id, data) => {
        return new Promise((resolve, reject) => {
            firebase.firestore
                .collection("Speakers")
                .doc(id)
                .update(data)
                .then(() => {
                    resolve({
                        success: true,
                        msg: data.name + ' updated Successfully'
                    })
                })
                .catch(e => {
                    reject({
                        success: false,
                        msg: 'Error in updating Team Member ' + e
                    })
                });
        })
    }
}

export default speakersServices
