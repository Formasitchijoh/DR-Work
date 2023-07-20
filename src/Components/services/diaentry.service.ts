import React from 'react'
import DiaryData from '../types/diaryentry.type'
import firebase from '../../firebase'

const db = firebase.database().ref("/webDiary");

const  getAll =()=> {
  return db;
}

const  create = (tutorial: DiaryData) => {
  return db.push(tutorial);
}

const  update = (key: string, value: any) => {
  return db.child(key).update(value);
}

const  deleteTutorial = (key: string) =>{
  return db.child(key).remove();
}
const deleteAll = () =>{
  return db.remove();
}

const DiaryServices =  {
    getAll,
    create,
    update,
    deleteTutorial,
    deleteAll
}

export default DiaryServices