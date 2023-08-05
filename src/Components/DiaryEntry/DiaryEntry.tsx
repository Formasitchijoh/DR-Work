import React,{useState} from 'react'
import logo from '../../resource/logo.png'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {BiSolidLockOpen} from 'react-icons/bi'
import { BiSolidLock} from 'react-icons/bi'
import toggleRed from '../../resource/vector_red.svg'
import toggleGreen from '../../resource/vector.svg'
import deletebtn from '../../resource/delete.svg'
import DiaryData from '../types/diaryentry.type'

type Props ={
 entry:DiaryData,
setActiveDiaryEntry: (diaryEntry: DiaryData, index: number) => void,
index: number,
 setisDelete: React.Dispatch<React.SetStateAction<boolean>>,
 setActiveEntry: (diaryEntry: DiaryData, index: number) => void
}

const entry:React.FC<Props> = ({entry,setActiveDiaryEntry,setActiveEntry,index,setisDelete}) => { 

  const handleDelete = () =>{
    setActiveEntry(entry,index);
    setisDelete(true)
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
                 <span className='Item-Status text-teal-500'>Private</span><span className='text-green-500'><BiSolidLock/></span> <span onClick={() => setActiveDiaryEntry(entry, index)} > <img src={toggleGreen} alt=''/></span> 
                  
                </div>
            ):(
              <div className='flex gap-2 justify-start items-center '>
               <span className='Item-Status'>Public</span><span className='text-red-500'><BiSolidLockOpen/></span><span onClick={() => setActiveDiaryEntry(entry, index)}><img src={toggleRed} alt=''/> </span>
                  
              </div>
            )}


      </div>
      <div className='w-1/4 h-[7vh] ' onClick={handleDelete}>
      <img src={deletebtn} alt='' className='block w-1/2 h-1/4 float-right top-0'/>
    </div>
    </div>
    <div className='Item-body'>
      <span className='Item-message font-italics'>{entry.description}</span>
      
    </div>
   

  </div>
  )
}

export default entry