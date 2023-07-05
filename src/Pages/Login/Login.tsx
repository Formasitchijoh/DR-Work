import React, { useEffect,useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Header from '../../Components/Header/Header'
import logo from '../../resource/logo.png'
import { useAppDispatch,useAppSelector } from '../../hooks/storeHook'
import { firedb,fireauth } from '../../firebase'
import { GoogleAuthProvider,signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { login } from '../../Components/authSlice'
import FacebookAuth from '../Auth/FacebookAuth'
const Login = () => {

    const {user} = useAppSelector((state)=>state.auth)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [userName, setUserName] = useState<string>('initialname');

    useEffect(()=>{
        if(user){
             navigate("/dash")
        }

    },[user,navigate])
    const signInWithGoogle = async ()=>{

        try{
            const provider = new GoogleAuthProvider();
            const {user} =  await signInWithPopup(fireauth,provider);
            if(user && user.email){
                dispatch(
                login({
                    email:user.email,
                    id:user.uid,
                    photoUrl:user.photoURL || null
                }) )
                
                if (user.displayName === null) {
                    setUserName("");
                  } else {
                    setUserName(user.displayName);

                  }
            }
            navigate("/dash")  

            console.log(`loggin the user ${user.displayName} and ${userName}`);
            
           
    
        }catch(error){
            console.log(`Error Signing in ${error}`);
            
        }

    }

   

   
  return ( 
    <div className='max-w-screen h-[100vh]  '>
        <div className='w-full h-11 flex justify-center items-center gap-20 bg-black'>
            <div className='w-1/4 h-full gap-16'>
                <img src={logo} alt='web diary' className='w-full  max-h-full'/>
            </div>
            <p className='text-2xl from-neutral-900 text-white '>Private Journal</p>
        </div>
        <div className='flex flex-col justify-center items-center px-10 m-auto mt-20  gap-2 mb-5 '>
            <h1 className='text-2xl font-sans text-gray-800 font-bold'>Welcome to  private diary</h1>
                <div className='w-full '>
                <p className='text-lg mt-1/4 font-sans textt-gray-900 '>Create a private entries, log your activities, update records and publish what you want to the public to see </p>
                </div>
        </div>
        <div className='flex-col w-full justify-center items-center mt-20 m-auto '>
            <div className='flex justify-center items-center mb-2'>
            <Link to='/dash'>  <p className='text-lg font-semibold text-gray-700'>GET STARTED</p> <hr className='w-full h-0.5  bg-gray-500 font-sans'/>  </Link>             
             </div>

             <div  onClick={signInWithGoogle} className=' m-auto bg-black text-white focus:outline-none font-medium mb-5 rounded-lg text-sm px-5 py-2.5 text-center'>
                <button >Sign in with Google</button>
             </div>
             <div className='m-auto bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                <button className='text-lg font-sans '>Sign in with FaceBook</button>
             </div>
             <FacebookAuth/>
        </div>
        <div className='fixed flex justify-between bottom-0 gap-20'>
            <span className='text-lg text-gray-900 font-bold'>DRTech @ 2023</span>
            <span className='text-lg text-gray-500 '>Privary policy | T&C</span>
        </div>
    </div>
  )
}

export default Login