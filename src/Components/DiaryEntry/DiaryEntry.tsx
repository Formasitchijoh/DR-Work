import React,{useEffect, useState} from 'react'
import logo from '../../resource/logo.png'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {BiSolidLockOpen} from 'react-icons/bi'
import { BiSolidLock} from 'react-icons/bi'
import toggleRed from '../../resource/vector_red.svg'
import toggleGreen from '../../resource/vector.svg'
import deletebtn from '../../resource/delete.svg'
import DiaryData from '../types/diaryentry.type'
import { collection, query, orderBy, OrderByDirection, or, where, getDocs } from 'firebase/firestore'
import { firedb, fireauth } from '../../firebase'
import { addEntry } from '../Slices/diaryItemSlice'
import { useAppDispatch } from '../../hooks/storeHook'

type Props ={
 entry:DiaryData,
setActiveDiaryEntry: (diaryEntry: DiaryData, index: number) => void,
index: number,
 setisDelete: React.Dispatch<React.SetStateAction<boolean>>,
 setActiveEntry: (diaryEntry: DiaryData, index: number) => void,
 setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>,
 isUpdate: boolean

}

const DiaryEntry:React.FC<Props> = ({entry,setActiveDiaryEntry,setActiveEntry,index,setisDelete,isUpdate,setIsUpdate}) => {  

  const dispatch = useAppDispatch()

  useEffect(() =>{ 
    const fetchAllEntries = async () => {   
      // setLoading(true)
    try {  
      const diaryRef = collection(firedb, "webdiary");
    let  query_ = query(diaryRef, orderBy("timeStamps", "desc" as OrderByDirection));

    query_ = query(diaryRef, or(where("firebaseUser", "==", fireauth.currentUser?.uid), where("status", "==", true)));
      const querySnapshot = await getDocs(query_);
  
      
      const entries: DiaryData[] = [];
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        entries.push({
          key: doc.id,
          category: data.category,
          description: data.description,
          image: data.image,
          status: data.status,
          startDate: data.startDate,
          endDate: data.endDate,
          firebaseUser: data.firebaseUser,
          timeStamps: data.timeStamps,
        } as DiaryData);
      });
      
      dispatch(addEntry(entries));  
      // setLoading(false)
        //dispatch the newly fetch entries to firestore
    } catch (error) {
      console.error(error);
    }
  };
  fetchAllEntries()

},[dispatch])

  const handleDelete = () =>{
    setActiveEntry(entry,index);
    setisDelete(true);
    
  } 
  const handleUpdate = () =>{
    setActiveDiaryEntry(entry, index)
    setIsUpdate(true)
  }



  return (
    
    <div className='Item-card'>
    <div className='Item-header'>
      <div className='Item-img'>
            <img src={entry.image} alt='img' className='Item-image'/>
      </div>
      <div className='item-details'>
              <span className='Item-name'>{entry.category}</span>
              <div className='Item-time'>
                <span className='Item-date'>{entry.timeStamps}</span>
              </div>
              { entry.status ? (
                <div className='flex gap-2 justify-start items-center  '>
                 <span className='Item-Status text-teal-500'>Private</span><span className='text-green-500'><BiSolidLock/> </span> <span onClick={handleUpdate} className='w-20 ' > <img src={toggleRed} alt=''/></span> 
                  
                </div>
            ):(
              <div className='flex gap-2 justify-start items-center '>
               <span className='Item-Status'>Public</span><span className='text-red-500'><BiSolidLockOpen/></span><span onClick={handleUpdate} className='w-20'><img src={toggleGreen} alt=''/> </span>
                  
              </div>
            )}


      </div>
      <div className='w-1/4 xl:w-2/3 h-[7vh] ' onClick={handleDelete}>
      <img src={deletebtn} alt='' className='block w-1/2 h-1/4 float-right top-0'/>
    </div>
    </div>
    <div className='Item-body'>
      <span className='Item-message text-base italic'>{entry.description}</span>
      
    </div>
   

  </div>
  )
}

export default DiaryEntry

function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.')
}
function dispatch(arg0: { payload: DiaryData[]; type: "diaryEntry/addEntry" }) {
  throw new Error('Function not implemented.')
}

