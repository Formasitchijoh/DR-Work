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
import { fetchSignInMethodsForEmail } from 'firebase/auth'

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

const signInWithFacebook = async (): Promise<void> => {
  const provider = new FacebookAuthProvider();
  provider.addScope('email');
  provider.addScope('public_profile');

  try {
    const result = await signInWithPopup(fireauth, provider);
    const user = result.user;

    const email: string | null = user.email;
    const id: string = user.uid;
    const picture: string | null = user.photoURL;

    console.log(email, id, picture);

    // Check if the email address is associated with an existing account
    const signInMethods: string[] = await fetchSignInMethodsForEmail(fireauth, email);
    
    if (signInMethods.length === 0) {
      // This is a new account, so create a new user record
      dispatch(
        login({
            email: user.email ?? "",
            id: user.uid,
            photoUrl: user.photoURL || null
        })
      );
      navigate("/dash")
    } else {
      // An account already exists with this email address, so prompt the user to sign in or link their accounts
      const newUser: User = {
        email: user.email ?? "",
        id: user.uid,
        photoUrl: user.photoURL || null,
      };
      dispatch(login(newUser));
      navigate('/dash');
    }

  } catch (error) {
    console.log("Error signing in :", error);
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




