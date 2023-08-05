import React,{useState} from 'react'
import logo from '../../resource/logo.png'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import DiaryData from '../types/diaryentry.type'
import {BiSolidLockOpen} from 'react-icons/bi'
import { BiSolidLock} from 'react-icons/bi'

type Props ={
 diaryEntry:DiaryData
}

const DiaryEntry = (props:Props) => { 

  return (
    <div className='Item-card'>
      <div className='Item-header'>
        <div className='Item-img'>
              <img src={props.diaryEntry.image} alt='img' className='Item-image'/>
        </div>
        <div className='item-details'>
                <span className='Item-name'>{props.diaryEntry.category}</span>
                <div className='Item-time'>
                  <span className='Item-date'>{props.diaryEntry.timeStamps}</span>
                </div>
                {props.diaryEntry.status ? (
                  <div className='flex gap-2 justify-start items-center  '>
                <span className='Item-Status'>Public</span><span className='text-red-500'><BiSolidLockOpen/></span>
                  </div>
              ):(
                <div className='flex gap-2 justify-start items-center '>
                <span className='Item-Status text-teal-500'>Private</span><span className='text-green-500'><BiSolidLock/></span>
                  </div>
              )}
        </div>
      </div>
      <div className='Item-body'>
        <span className='Item-message font-italics'>{props.diaryEntry.description}</span>
        {/* <h3>{props.diaryEntry.startDate} and {props.diaryEntry.endDate}</h3> */}
        {/* <h3>{props.diaryEntry.firebaseUser}</h3> */}

      </div>

    </div>
  )
}

export default DiaryEntry