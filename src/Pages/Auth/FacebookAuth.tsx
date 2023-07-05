import React from 'react'
import { signInWithPopup,FacebookAuthProvider } from 'firebase/auth'
import { fireauth } from '../../firebase'
import { error } from 'console'


const FacebookAuth = () => {

    const signInWithFacebook =  ()=>{

        const provider = new FacebookAuthProvider();
       signInWithPopup(fireauth,provider)
       .then((response)=>{
        console.log(`The response is ${response}`);
       })
       .catch((err)=>{
        console.log(err.message);
        
       })
        
        

    }
  return (
    <div>
        <button onClick={signInWithFacebook} className='w-20 h-10 bg-gray-900 text-lg text-white'> Sign In</button>
    </div>
  )
}

export default FacebookAuth