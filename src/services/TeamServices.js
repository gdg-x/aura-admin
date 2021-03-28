import firebase from '@/config/firebase'
import UserService from './UsersServices'

let teamServices = {

    getEventsByTeamMember:(id)=>{
        let events=[]
        return new Promise((resolve, reject)=>{
            firebase.firestore.collection('events').where('team',"array-contains",id).get().then(docs=>{
                docs.forEach(doc=>{
                  events.push(doc.data())
                })
                resolve({
                    success: true,
                    data:events
                })
              }).catch(e=>{
                reject({
                    success: false,
                    msg: e
                })
            })
        })
    },

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
                reject(err);
            });
        });
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
            .then(() => {
                resolve({
                    success:true,
                    msg:'Team Member Addedd Successfully & User Created' 
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
    removeTeamMember:(teamInfo)=>{
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("team")
            .doc(teamInfo.id)
            .delete()
            .then(() => {
                if(teamInfo.uid && teamInfo.uid.length>0){
                    UserService.removeUser(teamInfo.uid).then(res=>{
                        resolve({
                            success:true,
                            msg:'Team Member Removed Successfully',
                            data:res
                        })
                    }).catch(e=>{
                        reject({
                            success:false,
                            msg:'Error in Removing Team Member: '+e
                        })
                    })
                }else{
                    resolve({
                        success:true,
                        msg:'Team Member Removed Successfully',
                        data:""
                    })
                }
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
    },
    addFirstTime:(info)=>{
        return new Promise((resolve, reject)=>{
            let uid = firebase.auth.currentUser.uid;
            info.uid = uid;
            teamServices.addTeamMember(info.id, info).then((res)=>{
                if(res.success==true){
                    let data={
                        disabled:false,
                        id:info.id,
                        uid:uid,
                        userType:"Super Admin",
                    }
                    firebase.firestore.collection('users').doc(uid).set(data)
                    .then(() =>{
                        resolve({
                            success:true,
                        })
                    }).catch(e=>{
                        
                        reject({
                            success:false,
                            msg:e
                        })
                    })
                  }else{
                    reject({
                        success:false,
                        msg:"Something went wrong"
                    })
                  }
            }).catch(e=>{
                reject({
                    success:false,
                    msg:e
                })
            })
        })

    }
}

export default teamServices
