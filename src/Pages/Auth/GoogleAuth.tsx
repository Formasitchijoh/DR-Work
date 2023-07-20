import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch,useAppSelector } from '../../hooks/storeHook'
import { fireauth,firedb } from '../../firebase'
import { login } from '../../Components/Slices/authSlice'
import { authClasses } from './authClasses'
import firebase from '../../firebase'

const GoogleAuth = () => {

    const {user} = useAppSelector((state)=>state.auth);
    const dispatch = useAppDispatch();
    const navigate  = useNavigate();

    useEffect(()=>{
        if(Boolean(user)){
            navigate("/")
        }
    },[user,navigate]);

    const signInWithGoogle = async () =>{
        const provider = new firebase.auth.GoogleAuthProvider();

        try{
         
            const {user} = await fireauth.signInWithPopup( provider);

            if(user && user.email)
            dispatch(
                login({
                email:user.email,
                id:user.uid,
                photoUrl:user.photoURL || null
            }));
        }catch(err){
            console.log("Error signing in :",err);
            
        }
    }

    const { button} = authClasses
  return (
    <div className="grid gap-y-3">
    <button
      onClick={signInWithGoogle}
      className={button}
      type="button"
    >
      Google
    </button>
  </div>

  )
}

export default GoogleAuth