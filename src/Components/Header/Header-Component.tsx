import React from 'react'
import logo from '../../resource/logo.png'
import micro from "../../resource/microphone.png"

const Header = () => {
  return (
   <>
   <div className="header">
            <div className='logo'>
                <img src={logo} alt='web diary' className='logo-img'/>
            </div>
            <div className='heading'>
            <p className='header-text'>Private Journal</p>
            </div>
            <div className='micro'>
                <img src={micro} alt='web diary' className='micro-img'/>
            </div>
        </div>
   </>
  )
}

export default Header