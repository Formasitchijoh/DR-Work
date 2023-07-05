import Header from "../../Components/Header/Header";
import { homeClasses } from "./homeClasses";
import GoogleAuth from "../Auth/GoogleAuth";
import { Link } from "react-router-dom";
import logo from '../../resource/logo.png'
import Login from "../Login/Login";
const Home = () => {
  const { container, cardContainer, title, description } = homeClasses;
   

  return (
    
    <>
     {/* <Header /> */}
     <Login/>
     
    </>
  
  );
};

export default Home;
  
  // <div className={container}>
  //       <div className={cardContainer}>
  //         <h5 className={title}>Firebase Auth</h5>
  //         <p className={description}>Master complete auth in firebase</p>
  //       </div>
  //     </div>  