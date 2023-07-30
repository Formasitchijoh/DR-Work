import React, { useState } from 'react'
import DiaryData from './types/diaryentry.type';
import { deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject, getDownloadURL } from "firebase/storage";
import { firedb,storageRef } from '.././firebase';
import { useAppSelector,useAppDispatch } from '../hooks/storeHook';
import { addEntry } from './Slices/diaryItemSlice';
import { useNavigate } from 'react-router-dom';
import { resetEntry } from './Slices/currentEntrySlice';
type props = {
    currentDiaryEntry: any,
    setisdelete:React.Dispatch<React.SetStateAction<boolean>>
  };

  
const DeleteComponent:React.FC<props> = ({currentDiaryEntry,setisdelete}) => { 
        const { diaryentry } = useAppSelector((state) =>state.diaryEntry)
        const { currententry} = useAppSelector(state => state.currentEntry)
        const dispatch = useAppDispatch()
        const navigate = useNavigate()

  

      const handleDelete = async () => {
        const docRef = currententry?.key ? doc(firedb, 'webdiary', currententry.key) : undefined;
        if (docRef) { 
          try {
            await deleteDoc(docRef);
            const imgRef = currententry && currententry.image ? ref(storageRef, currententry.image) : undefined;
            if (imgRef) {
              await deleteObject(imgRef);
            }
            const entries = diaryentry.filter(entry => entry.key !== currentDiaryEntry.key);
            alert("done")
            dispatch(addEntry(entries));
            dispatch(resetEntry());
            setisdelete(false)
            navigate("/dash")
          } catch (error) {
            console.error("Error deleting diary entry:", error);
          }
        }
      };

      const cancelDelete = () =>{
        setisdelete(false)
        navigate("/dash")

      }

     
    

      
     

  return (
    <div className='absolute inset-0 w-2/3 xl:w-1/6 h-[40vh] m-auto bg-teal-700'>
        <div className='flex-col justify-center items-center'>
            <div className='bg-orange-700 text-white  font-sans flex justify-center items-center  h-10'>
                <span className='font-sans text-xl'>{currentDiaryEntry?.key}</span>
            </div>
            <div className='w-1/4 h-1/2 ml-20'>
            <svg xmlns="http://www.w3.org/2000/svg" width="116" height="116" viewBox="0 0 116 116" fill="none">
                <path d="M62.8334 67.6667H53.1667V43.5001H62.8334M62.8334 87.0001H53.1667V77.3334H62.8334M4.83337 101.5H111.167L58 9.66675L4.83337 101.5Z" fill="#F24E1E"/>
            </svg>
            </div>
            <div className='mx-5'>
            <span>Are you sure you want to delete this diary entry?</span>
            </div>
            <div className='flex justify-around items-center  '>
                <button onClick={cancelDelete} className='font-sans rounded-lg text-xl text-white my-5 bg-black w-1/4 h-10'>No</button>
                <button onClick={handleDelete}  className='font-sans rounded-lg text-xl text-orange-700   bg-white border-2 border-orange-700 w-1/4 h-10'>Yes</button>

            </div>
        </div>
    </div>
  )
}

export default DeleteComponent

