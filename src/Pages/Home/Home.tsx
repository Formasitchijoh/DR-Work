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
     <Login/>
     
    </>
  
  );
};

export default Home;
    