
// //ye basically eek diary bana rhe hai statefull
// //sabse badi prblm is jb bhi ham apna srrver restart krte hai tb hamara ye map khali ho jata hai
const sessionidUseMap=new Map()

function setUser(id,user){
    sessionidUseMap.set(id,user)
}

function getUser(id){
    return sessionidUseMap.get(id)
}

module.exports={
    setUser,
    getUser,
}














