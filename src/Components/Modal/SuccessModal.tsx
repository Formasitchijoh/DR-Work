import React, { useEffect, useState } from "react";
import logo from '../../resource/logo.png'
interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const Modal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Success!</h2>
          <p className="text-gray-700">Your operation was successful.</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  };
  
  const SuccessModal = ()=>{
  
      const [display, setDisplay] = useState(true)
      useEffect(()=>{
              setInterval(()=>{
                     setDisplay(false)
              },10000)
      },[])
      const [showSuccessModal, setShowSuccessModal] = useState(false);
  
    const handleButtonClick = () => {
      // Perform some operation here
      setShowSuccessModal(true);
    };
  
    return (
          <div className="w-full h-screen">
              <div className="w-full h-10 flex bg-black justify-center items-center gap-10">
                  <div className="w-1/2 h-full">
                      <img src={logo}  alt="logo"/>
                  </div>
                  <span className="text-xl text-white">Home</span>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={handleButtonClick}>
          Perform Operation
        </button>
        <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
          </div>
      
  
    );
  };
  
export default SuccessModal