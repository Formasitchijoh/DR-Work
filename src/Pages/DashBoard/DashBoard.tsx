import React, { useEffect, useState } from "react";
import logo from '../../resource/logo.png'
import { useAppSelector, useAppDispatch } from '../../hooks/storeHook'
import Header from '../../Components/Header/Header-Component'
import DiaryItem from "../../Components/DiaryItem";
import { Link } from "react-router-dom";
const LoginSuccess: React.FC = () => {
    const user = useAppSelector(state=>state.auth.user);
    
    return (
      // <div className="success-modal-main">
        <div className="success-modal">
            <div className="user-main">
                { user?.photoUrl !== null ? <img src={user?.photoUrl} alt="" className="photo "/>:<span className="photo">{user.email.charAt(0).toUpperCase()}</span>}
            </div>
          <h2 className="user-name">{user?.email}</h2>
          <h2 className="user-name">SuccessFull Login</h2>
        </div>
      // </div>
    );
  };


const DashBoard = ()=>{

    const user = useAppSelector(state=>state.auth.user)
  console.log(`Loggin the user in the Dashbord ${user}`);
  
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(()=>{
            setInterval(()=>{
                   setIsLoggedIn(true);
            },1000)
    },[])
    return (
      <>
         <Header/>
         <Link to="/new-diary">
         <DiaryItem/>
         </Link>
         <DiaryItem/>
         <DiaryItem/>
         { !isLoggedIn && <LoginSuccess />}
      </>
       
    );
  };

export default DashBoard

//    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={handleLogin}>
//       Log In
//     </button> 