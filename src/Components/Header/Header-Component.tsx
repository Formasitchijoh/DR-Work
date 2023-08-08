import React,{useEffect,useState} from 'react'
import logo from '../../resource/logo.png'
import person from "../../resource/pajamas-profile.svg"
import { useAppSelector,useAppDispatch } from '../../hooks/storeHook'
import Cookies from 'js-cookie'
import { fireauth } from '../../firebase'
import { login,logout } from '../Slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'


export  const LoginHeader = () =>{
  return(
    <div className="header xl:justify-start  ">
        <div className='logo flex justify-center items-center  w-3/4 xl:w-1/4 xl:ml-20'>
           <img  src={logo} alt='web diary' className=' w-1/4 xl:w-20  h-full'/>
          <p className=' text-sm  xl:text-2xl block float-none from-neutral-900 text-white'>Private Journal</p>
        </div>
       
    </div>

  )
}

const Header = () => {
    const { user } = useAppSelector(state => state.auth)
  const navigate = useNavigate()

    const dispatch = useAppDispatch();
    const [isSignOut, setisSignOut] = useState(false)


    useEffect(() => {
      const unsubscribe = fireauth.onAuthStateChanged(user => {
        if (user) {
          // user is signed in
          dispatch(login({
            email: user.email || '',
            id: user.uid,
            photoUrl: user.photoURL || null
          }));
          
        } else {
          // user is signed out
          dispatch(logout());
        }
      });
      return () => unsubscribe();
    }, [dispatch]);
    
    const  handleSignOut = async () =>{
        try{ 
          signOut(fireauth)
            dispatch(logout());
            setisSignOut(true)
            navigate("/")

        }catch(err){
            console.error('Error logging out:', err);
        }
    }

    const SignOutMenu = () =>{

        return(
            <ul className="relative w-1/2 h-full right-0 top-5 px-5">
                <li className='text-xl font-bold list-none bg-slate-200 py-2 border-y-2 border-gray-500 px-2 hover:translate-x-7 hover:bg-purple-400 hover:transition-transform ' onClick={handleSignOut}>SignOut</li>
                <li className='text-xl font-bold list-none bg-slate-200 py-2 border-y-2 border-gray-500 px-2  hover:shadow-md hover:opacity-80 hover:bg-teal-100' onClick={handleSignOut}>Profile</li>
                <li className='text-xl font-bold list-none bg-slate-200 py-2 border-y-2 border-gray-500 px-2  hover:scale-110 hover:rotate-3 hover:bg-purple-400 hover:transition-transform' onClick={handleSignOut}>About</li>
            </ul>
        )
    }

  
      

  return (
   <>
   <div className="header">
            <div className='logo'>
                <img  src={logo} alt='web diary' className='logo-img'/>
            </div>
            <div className='heading'>
            <p className='header-text'>Private Journal</p>
            </div>

            {
                !isSignOut ? ( <div className='micro ' onClick={ () =>setisSignOut(true)}>
                <img src={ user?.photoUrl  ?  user?.photoUrl : user?.email?.charAt(0).toUpperCase() }alt='web diary' className='micro rounded-full'/>
            </div>) : <SignOutMenu/>
            }
            
        </div>
   </>
  )
}

export default Header