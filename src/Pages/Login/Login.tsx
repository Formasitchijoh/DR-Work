import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../Components/Header/Header'
import logo from '../../resource/logo.png'
import '../.././index.css'
const Login = () => {
  return (
    <div className='main-container'>
        <div className='header'>
            <div className='logo'>
                <img src={logo} alt='web diary'/>
            </div>
            <p className='title'>Private Journal</p>
        </div>

        <div className='welcome-container'>
            <h1 className='welcome-message'>Welcome to the private diary</h1>
                <p className='create-text'>Create anaccount to get startes</p>
        </div>
        <div className='links'>
            <div className='get-started'>
            <Link to='/Login'>  <p>GET STARTED</p>  </Link>             
             </div>

             <div className='facebook'>
                <button className='facebook-btn'>Sign in with FaceBook</button>
             </div>
             <div className='google'>
                <button className='google-btn'>Sign in with FaceBook</button>
             </div>
        </div>
    </div>
  )
}

export default Login