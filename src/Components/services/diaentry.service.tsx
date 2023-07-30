import React from 'react'

const Service = () => {
  return (
    <div></div>
  )
}

export default Service

















// import React from 'react'
// import DiaryData from '../types/diaryentry.type'
// import { fireauth } from '../../firebase';
// import { collection, addDoc } from "firebase/firestore";
// import { getStorage,ref } from 'firebase/storage';
// import { firedb } from '../../firebase';
// const db = firedb.ref("/webDiary");

// const getAll = () => {
//   return db.orderByChild("status").equalTo(true).startAt(fireauth.currentUser && fireauth.currentUser?.uid)
// };
// const getPublicEntries = () =>{
//   return db.orderByChild("status").equalTo(true)
// }
// const getUserEntries = () =>{
//  return db.orderByChild("firebaseUser").equalTo(fireauth.currentUser && fireauth.currentUser?.uid)

// }


// const  create = (tutorial: DiaryData) => {
//   return db.push(tutorial);
// }

// const  update = (key: string, value: any) => {




//   return db.child(key).update(value);
// }

// const  deleteDiaryEntry = (key: string) =>{
//   return db.child(key).remove();
// }
// const deleteAll = () =>{
//   return db.remove();
// }

// const DiaryServices =  {
//     getAll,
//     create,
//     update,
//     deleteDiaryEntry,
//     deleteAll,
//     getPublicEntries,
//     getUserEntries
// }

// export default DiaryServices