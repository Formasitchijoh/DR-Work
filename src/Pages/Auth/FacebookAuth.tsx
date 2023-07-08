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

  // const signInWithFacebook = async () => { 
  //   const provider = new FacebookAuthProvider();
  //   provider.addScope('user_birthday');
  //   const {user} = await signInWithRedirect(fireauth, provider);

  // };

  useEffect(()=>{
    if(Boolean(user)){
        navigate("/")
    }
},[user,navigate]);
  
const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  provider.addScope('email');
  provider.addScope('public_profile');

  try {
    const result = await signInWithPopup(fireauth, provider);
    const user = result.user;
    
    const email = user.email;
    const id = user.uid;
    const picture = user.photoURL;
    
    console.log(email, id, picture);

     if(user && user.email){
      dispatch(
        login({
            email:user.email,
            id:user.uid,
            photoUrl:user.photoURL || null
        })
      )
     }

     console.log(`I am printing the user ong vercel ${JSON.stringify(user)}`);
     
  } catch (error) {
    console.log("Error signing in :",error);
  }
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




