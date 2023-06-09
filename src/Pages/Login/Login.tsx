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
    <div className='main'>
        <div className="header">
            <div className='logo'>
                <img src={logo} alt='web diary' className='logo-img'/>
            </div>
            <p className='header-text'>Private Journal</p>
        </div>
        <div className='welcome-main'>
            <h1 className='welcome-header'>Welcome to  private diary</h1>
                <div className='w-full '>
                <p className='welcome-msg'>Create a private entries, log your activities, update records and publish what you want to the public to see </p>
                </div>
        </div>
        <div className='signIn-btn '>
            <div className='getting-started'>
            <Link to='/dash'>  <p className='getting-started-txt'>GET STARTED</p> <hr className='getting-hr'/>  </Link>             
             </div>

             <div  onClick={signInWithGoogle} className='facebook-main '>
                <button className=' text-xl text-white'>Sign in with Google</button>
             </div>
             
             {/* <div className='m-auto bg-black text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                <button className='text-lg font-sans '>Sign in with FaceBook</button>
             </div> */}
             <div className='facebook-main'>
                <FacebookAuth/>
             </div>
        </div>
        <div className='footer'>
            <span className='dr-tech'>DRTech @ 2023</span>
            <span className='privacy'>Privary policy | T&C</span>
        </div>
    </div>
  )
}

export default Login