import React from 'react'

const Loader = () => {
  return (
    
          <div className="flex items-center h-full w-full ">
          <span className="w-3 h-3 rounded-full bg-blue-500 mx-1 animate-pulse"></span>
          <span className="w-3 h-3 rounded-full bg-blue-500 mx-1 animate-pulse"></span>
          <span className="w-3 h-3 rounded-full bg-blue-500 mx-1 animate-pulse"></span>
          <style>{`
            @keyframes pulse {
              0%, 100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.3);
              }
            }
            .animate-pulse {
              animation: pulse 2s infinite ease-in-out;
            }
          `}</style>
        </div>
        
      );
  
}

export default Loader

