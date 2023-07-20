import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Provider} from "react-redux"
import { GoogleLogin } from '@react-oauth/google';
import Home from './Pages/Home/Home';
import DashBoard from './Pages/DashBoard/DashBoard';
import AddDiaryItem from './Pages/AddDiaryItem/AddDiaryItem';
import AddEntry from './Components/Firebase_CRUD/addDiaryEntry.component';
import DiaryEntrys from './Components/Firebase_CRUD/diaryEntry.component';
import EntryList from './Components/Firebase_CRUD/diaryEntries-list.component';
interface Props {
  name: string;
}

function App() {
   
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/dash' element={<DashBoard/>}/>
            <Route path='/new-diary' element={<AddEntry/>}/>
            <Route path='/add' element={<AddEntry/>}/>
            <Route path='/list' element={<EntryList/>}/>
            {/* <Route path='/dias' element={<DiaryEntrys/>}/> */}

        </Routes>
       
    )
}
export default App;
