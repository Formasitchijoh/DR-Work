import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch,useAppSelector } from '../../hooks/storeHook'
import { login } from '../../Components/Slices/authSlice'
import { authClasses } from './authClasses'
import { fireauth } from '../../firebase'
import { GoogleAuthProvider,getAuth, signInWithPopup, ​​} from "firebase/auth";
​​import { getFirestore,query,getDocs,collection,where,addDoc, } from "firebase/firestore";

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
        const provider =  new GoogleAuthProvider();

        try{
         
            const {user} = await signInWithPopup(fireauth, provider);

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