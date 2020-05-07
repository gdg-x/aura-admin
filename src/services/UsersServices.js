import firebase from '@/config/firebase'

let usersServices = {
    getAllUsers:()=>{
        let users=[]
        let teams=[]
        let finaldata = []
        console.log('calling')
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("users")
            .get()
            .then(async (snapshot) => {
                await snapshot.forEach(doc => {
                    users.push(doc.data())
                })
                await firebase.firestore.collection('team').get().then(docs=>{
                    docs.forEach(teamdoc=>{
                        teams.push(teamdoc.data())
                    })
                })
                let asd = await users.map(user=>{
                    teams.map(team=>{
                        if(user.uid == team.uid){
                            let fobj={...team,...user}
                            finaldata.push(fobj)
                        }
                    })
                })

                resolve({
                    success:true,
                    data:finaldata
                })
            })
            .catch(err => {
                reject(err)
            });
        })
    },
    removeUser:(uid, name)=>{
        return new Promise((resolve,reject)=>{
            let appp = firebase.functions.httpsCallable('team-removeAuth')
            appp({uid:uid, name:name}).then(res=>{
                resolve(res.data)
            }).catch(e=>{
                reject(e)
            })
        })
    },
    enableUser:(uid)=>{
        return new Promise((resolve,reject)=>{
            let appp = firebase.functions.httpsCallable('team-enabledAuth')
            appp(uid).then(res=>{
                resolve(res.data)
            }).catch(e=>{
                console.log(e)
                reject(e)
            })
        })
    },
    disableUser:(uid)=>{
        return new Promise((resolve,reject)=>{
            let appp = firebase.functions.httpsCallable('team-disabledAuth')
            appp(uid).then(res=>{
                resolve(res.data)
            }).catch(e=>{
                console.log(e)
                reject(e)
            })
        })
    }
}
export default usersServices