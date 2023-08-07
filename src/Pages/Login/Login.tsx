import React, { useEffect,useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Header from '../../Components/Header/Header-Component'
import logo from '../../resource/logo.png'
import { useAppDispatch,useAppSelector } from '../../hooks/storeHook'
import { firedb,fireauth } from '../../firebase'
import { login } from '../../Components/Slices/authSlice'
import FacebookAuth from '../Auth/FacebookAuth'
import Footer from '../../Components/Footer/Footer'
import Cookies from 'js-cookie'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { LoginHeader } from '../../Components/Header/Header-Component'
const Login = () => {

    const {user} = useAppSelector((state)=>state.auth)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string>('initialname');


    useEffect(()=>{

      if(user){
        navigate("/dash")
      }
    },[user])


const signInWithGoogle = async ()=>{
  try{
      const provider = new GoogleAuthProvider();
      const {user} =  await signInWithPopup(fireauth, provider);
      if(user && user.email){
          dispatch(
          login({
              email:user.email,
              id:user.uid,
              photoUrl:user.photoURL || null
          }) )

          Cookies.set('user', JSON.stringify({
            email: user.email,
            id: user.uid,
            photoUrl: user.photoURL || null,
            displayName: user.displayName
          }) , {expires: 1});

        
          
          if (user.displayName === null) {
              setUserName("");
            } else {
              setUserName(user.displayName);
            }
      }
     
      navigate("/dash")  
      
  }catch(error){
      console.log(`Error Signing in ${error}`);}}
   
   
  return ( 
    <div className='xl:w-2xl'>
        <LoginHeader/>
      <div className='p-10 my-20 pb-10 shadow-2xl  max-w-lg  m-auto mt-10  h-[80vh] flex-col justify-center items-center border-4 border-gray-200 bg-white px-0 rounded-lg'>
        <div className='h-[50vh]'>
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
             <div className='facebook-main'>
                <FacebookAuth/>
             </div>
        </div>
        <div className=' xl:h-[25vh] h-[15vh] flex flex-col justify-end pb-5'>
             <Footer/>
             </div>

        </div>
        
    </div>
    </div>
   
  )
}

export default Login