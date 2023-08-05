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

// <div classNameName='h-fulclassName=''w-fulclassName=''flex items-center'>
//         <svg width={size} height={size} viewBox='0 0 38 38' xmlns='http://www.w3.org/2000/svg' stroke={color} classNameName='mx-auto'>
//             <g fill='none' fillRule='evenodd'>
//                 <g transform='translate(1 1)' strokeWidth="2">
//                     <circle strokeOpacity=".5"  cx="18" cy="18" r="18">
//                     <circle strokeOpacity=".5" cx="18" cy="18" r="18">
//     <animateTransform attributeName="transform" type="rotate" from="0 18 18" to ="360 18 18" dur="1s" repeatCount="indefinite"/>
// </circle>
//                     </circle>
//                 </g>
//             </g>
//         </svg>

//     </div>