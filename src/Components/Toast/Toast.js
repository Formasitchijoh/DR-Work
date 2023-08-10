import { useState, useEffect } from 'react';
import error from '../../resource/error.svg'
import './Toast.css';

const Toast = props => {
    const { position } = props;
    // const [list, setList] = useState(toastList);

    // useEffect(() => {
    //     setList(toastList);
    // }, [toastList]);

    return (
        <>
            <div className={`notification-container ${position} `}>
               
                        <div className={`notification toast ${position} h-30 `}>
                            <button>
                                X
                            </button>
                            <div className="notification-image rounded-full bg-gray-500 ">
                                <img src={error} alt="" className='' />
                            </div>
                            <div className='h-20 '>
                                <p className="notification-title text-gray-950">Login Successfull</p>
                                {/* <p className="notification-message text-gray-950 ">Error Loggin in </p> */}
                            </div>
                        </div>
            </div>
        </>
    );
}

export default Toast