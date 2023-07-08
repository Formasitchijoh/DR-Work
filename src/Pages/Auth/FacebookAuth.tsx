import React,{useEffect} from 'react'
import { signInWithPopup,FacebookAuthProvider } from 'firebase/auth'
import { fireauth } from '../../firebase'
import { useAppSelector,useAppDispatch } from '../../hooks/storeHook'
import { useDispatch } from 'react-redux'
import { login } from '../../Components/authSlice'
import { User } from '../../Models/User'
import { AuthState } from '../../Components/authSlice'
import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
const FacebookAuth = () => {
  const user = useAppSelector(state=>state.auth.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const signInWithFacebook = async () => { 
    const provider = new FacebookAuthProvider();
    provider.addScope('user_birthday');
    const {user} = await signInWithRedirect(fireauth, provider);

    // if(user && user.data.)
  };
  
  // After the user is redirected back to your app, you can retrieve the user's information using the following code:
  
  getRedirectResult(fireauth)
    .then((result) => {
      const user = result?.user;
      console.log(`userrrrrrr ${user}`);
    })
    .catch((error) => {
      console.log(error.message);
    });

//   const signInWithFacebook =  ()=>{
//   const provider = new FacebookAuthProvider();
//   provider.addScope('user_birthday');
//   signInWithPopup( fireauth,provider).then(function(result) {
//     var user = result.user;
//     console.log(`userrrrrrr ${user}`);
//   });
// }
   

  return (
    <div>
        <button onClick={signInWithFacebook} className=' text-xl text-white'> Sign In With Facebook </button>
    </div>
  )
}

export default FacebookAuth




