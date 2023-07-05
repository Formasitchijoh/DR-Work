import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Provider} from "react-redux"
import { GoogleLogin } from '@react-oauth/google';
import Home from './Pages/Home/Home';
import Auth from './Pages/Auth/Auth';
import DashBoard from './Pages/DashBoard/DashBoard';

interface Props {
  name: string;
}

function App() {
   
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/dash' element={<DashBoard/>}/>
        </Routes>
       
    )
}
export default App;

// export default App;
 // <div>
        //     <h2>React Google Login</h2>
        //     <br />
        //     <br />
        //     <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        // </div>