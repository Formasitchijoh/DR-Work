import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Provider} from "react-redux"
import { GoogleLogin } from '@react-oauth/google';
import Home from './Pages/Home/Home';
import Auth from './Pages/Auth/Auth';
import Login from './Pages/Login/Login';

interface Props {
  name: string;
}

function App() {
    const responseMessage = (response:string) => {
        console.log(response);
    };
    const errorMessage = (error:string) => {
        console.log(error);
    };
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
       
    )
}
export default App;

// function App() {
//   return (
//     <Provider store={store}>

//     <div>
//       <h1>Hello Diary App</h1>
//     </div>

//     </Provider>
//   );
// }

// export default App;
 // <div>
        //     <h2>React Google Login</h2>
        //     <br />
        //     <br />
        //     <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        // </div>