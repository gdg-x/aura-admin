import firebase from '@/config/firebase'

let partnersServices = {
    // Get All the Partners Details
    getAllPartners:()=>{
        let partners = []
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("partners")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    partners.push(doc.data());
                })
                resolve({
                    success:true,
                    data:partners
                })
            })
            .catch(err => {
                reject(err)
            });
        })
    },

    // Get Partner Details whose id = id
    getPartnerDetails:(id)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("partners")
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

    // Add partner whose document id is id and Data is data
    addPartner:(id,data)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("partners")
            .doc(id)
            .set(data)
            .then(res => {
                resolve({
                    success:true,
                    msg:'Partner Addedd Successfully'
                })
            })
            .catch(e => {
                reject({
                    success:false,
                    msg:'Failed to Add Partner: '+ e
                })
            });
        })
    },

    // Remove Partner whose id is id
    removePartner:(id)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("partners")
            .doc(id)
            .delete()
            .then(() => {
                resolve({
                    success:true,
                    msg:'Partner Removed Successfully'
                })
            })
            .catch(e => {
                reject({
                    success:false,
                    msg:'Error in Removing Partner : '+e
                })
            });
        })
    },

    // Edit Partner whose id is id and data is data
    editPartner:(id, data)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("partners")
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

export default partnersServices