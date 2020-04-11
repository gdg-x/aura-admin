import firebase from '@/config/firebase'

let teamServices = {
    // Get All the Team Members Details
    getAllTeam:()=>{
        let team = []
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("team")
            .orderBy("role", "asc")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    team.push(doc.data());
                })
                resolve({
                    success:true,
                    data:team
                })
            })
            .catch(err => {
                reject(err)
                // console.log("Error getting documents", err);
            });
        })
    },

    // Get Team Member Details whose id = id
    getTeamMemberDetails:(id)=>{
        let teamData = {}
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("team")
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

    // Add Team Member whose document id is id and Data is data
    addTeamMember:(id,data)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("team")
            .doc(id)
            .set(data)
            .then(res => {
                resolve({
                    success:true,
                    msg:'Team Member Addedd Successfully'
                })
            })
            .catch(e => {
                reject({
                    success:false,
                    msg:'Failed to Add Team Member: '+ e
                })
            });
        })
    },

    // Remove Team Member whose id is id
    removeTeamMember:(id)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("team")
            .doc(id)
            .delete()
            .then(() => {
                resolve({
                    success:true,
                    msg:'Team Member Removed Successfully'
                })
            })
            .catch(e => {
                reject({
                    success:false,
                    msg:'Error in Removing Team Member: '+e
                })
            });
        })
    },

    // Edit Team member whose id is id and data is data
    editTeamMember:(id, data)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("team")
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

export default teamServices
