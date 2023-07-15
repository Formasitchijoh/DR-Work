import React from 'react'
import Header from '../../Components/Header/Header-Component'
import Footer from '../../Components/Footer'
const AddDiaryItem = () => {
  return (
    <div className='new-entry'>
      <Header/>
      <div className='create-new'>
        <span className='create-text'>Create a New diary</span>
        <div className='close'>
          <span className='x'>X</span>
        </div>
      </div>
      <div className='category'>
        <span className='text'>Category</span>
        <input type="select" placeholder='Category' className='select'/>
      </div>
      <div className='descript'>
        <span className='text'>Description</span>
        <textarea placeholder='Enter description here' className='text-area'>
        </textarea>
      </div>
      <div className='image-container'>
       <span className='text'>Upload Image from Device</span>
        <div className='image'>
        </div>
      </div>
      <div className='entry-status'>
        <input type="Checkbox" className='radio' />
        <span>Check to confirm if you want to continue</span>
      </div>
      <div  className='facebook-main '>
        <button className=' text-xl text-white'>Sign in with Google</button>
        </div>
        <Footer/>
        </div>
  )
}

export default AddDiaryItem