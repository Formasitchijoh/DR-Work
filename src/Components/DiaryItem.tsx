import React from 'react'
import logo from '.././resource/logo.png'
const DiaryItem = () => {
  return (
    <form className='Item-card'>
      <div className='Item-header'>
        <div className='Item-img'>
              <img src={logo} alt='img' className='Item-image'/>
        </div>
        <div className='item-details'>
                <span className='Item-name'>Cooking</span>
                <div className='Item-time'>
                  <span className='Item-date'>23 June 2023</span>
                  <span className='Item-time'>@ 10:20</span>
                </div>
                <span className='Item-Status'>Pulic</span>
        </div>
      </div>
      <div className='Item-body'>
        <span className='Item-message'>Contrary to pupular belief that Lorem Ipsum is not simply random text it has roots in a piece of classical Latin literatur from 45 BC</span>
      </div>

    </form>
  )
}

export default DiaryItem