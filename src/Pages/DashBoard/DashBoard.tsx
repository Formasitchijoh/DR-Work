import React, { useEffect, useState } from "react";
import logo from '../../resource/logo.png'
const DashBoard = ()=>{

    const [display, setDisplay] = useState(true)
    useEffect(()=>{
            setInterval(()=>{
                   setDisplay(false)
            },1000)
    },[])

    const LoginSucess = () =>{
        return(
           
            <div className="max-w-screen-xl h-screen absolute bg-gray-400 opacity-5">
                <div className="w-full h-full bg-purple-200">
                    <span className="text-2xl font-sans text-gray-900">Welcome</span>
                    <span className="text-2xl font-sans text-gray-900">Formasit chijoh</span>
                </div>
            </div>
            
        )
    }
    return (
        <>
       

      <div className="max-w-full max-h-screen ">
            <div className="w-1/4 h-1/4 bg-black flex justify-center items-center gap-20">
                <div className="w-1/2 h-full">
                    <img src={logo} />
                </div>
                <span className="text-xl text-white">Home</span>
            </div>
            { display && <LoginSucess/>}

        </div>


        </>
       
    )
}

export default DashBoard