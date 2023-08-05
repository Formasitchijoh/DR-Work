import React, {  useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from '../../hooks/storeHook'
import Header from '../../Components/Header/Header-Component'
import { Link } from "react-router-dom";
import DiaryData from "../../Components/types/diaryentry.type";
import DiaryEntry from "../../Components/DiaryEntry/DiaryEntry";
import SearchFilter from "../../Components/Search-filter";
import { addEntry } from "../../Components/Slices/diaryItemSlice";
import { selectedEntry } from "../../Components/Slices/currentEntrySlice";
import DiaryEntryComponent from "../../Components/Firebase_CRUD/diaryEntry.component";
import moment from 'moment'
import Loader from "../../Components/Loader/loader";
import { fireauth, firedb } from '../../firebase';
import { useNavigate } from "react-router-dom";
import { CollectionReference, DocumentData, OrderByDirection, Query, collection, getDocs,or,orderBy,query, where } from "firebase/firestore";
type State = {
  diaryEntry: Array<DiaryData>,
  currentEntry: DiaryData | null,
  currentIndex: number
};

const LoginSuccess: React.FC = () => {
    const user = useAppSelector(state=>state.auth.user);
    return (
        <div className="success-modal">
            <div className="user-main">
                { user?.photoUrl !== null ? <img src={user?.photoUrl} alt="" className="photo "/>:<span className="photo">{ user.email && user.email.charAt(0).toUpperCase()}</span>}
            </div>
          <h2 className="user-name">{user?.email}</h2>
          <h2 className="user-name">SuccessFull Login</h2>
        </div>
    );
  };


const DashBoard = ()=>{

  //redux states
  const { diaryentry } = useAppSelector(state => state.diaryEntry)
  const { currententry, curIndex,updateStatus}  = useAppSelector(state => state.currentEntry)
    const dispatch = useAppDispatch()
  const navigate = useNavigate()
    console.log( JSON.stringify(currententry));
    
    //custom states
    const [state, setState] = useState<State>({
      diaryEntry: [],
     currentEntry: null,
     currentIndex: -1,
   });
   const sessionStorage = window.sessionStorage;
   const loginSuccessModalDisplayed = sessionStorage.getItem('LoginSuccess');
  const [isLoggedIn, setIsLoggedIn] = useState(loginSuccessModalDisplayed === 'false');
    const [isdisplay, setisDisplay] = useState(false) //conditionally display search or entire result

    const [loading, setLoading] = useState(true);

    //states for closing diary component, and warning modal
    const [closeconfirm, setcloseconfirm] = useState(false)

  
    //states for datepicker
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
    const [isloading, setisloading] = useState(true)



// Loop through the documents and log the data for each one


//useEffects
useEffect(() =>{
  const fetchAllEntries = async () => {  
   
    try {  
      const diaryRef = collection(firedb, "webdiary");
     let q = query(diaryRef, or(where("firebaseUser", "==", fireauth.currentUser?.uid), where("status", "==", true)));
     q = query(diaryRef, orderBy("timeStamps", "desc" as OrderByDirection));
      const querySnapshot = await getDocs(q);
  
      
      const entries: DiaryData[] = [];
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        entries.push({
          key: doc.id,
          category: data.category,
          description: data.description,
          image: data.image,
          status: data.status,
          startDate: data.startDate,
          endDate: data.endDate,
          firebaseUser: data.firebaseUser,
          timeStamps: data.timeStamps,
        } as DiaryData);
      });
      
      setState((prevState) => ({ ...prevState, diaryEntry: entries }));
      dispatch(addEntry(entries));    
    } catch (error) {
      console.error(error);
    }
  };

  fetchAllEntries();

},[fireauth.currentUser?.uid])
  
useEffect(() => {
  if (loginSuccessModalDisplayed) {
    sessionStorage.setItem('LoginSuccess', 'false');
  }
  setTimeout(()=>{
  // Show login success modal if it has not been displayed before
  setIsLoggedIn(!loginSuccessModalDisplayed);

  },1000)
}, []);

//Event handlers

   
  
    const refreshList = () => {
      setState(prevState => ({...prevState, currentEntry: null, currentIndex: -1}));
    };

    const setActiveDiaryEntry = (diaryEntry: DiaryData, index: number) => { 
      setState(prevState => ({...prevState, currentEntry: diaryEntry, currentIndex: index}));
      
      dispatch(selectedEntry({
        currententry: diaryEntry,
        curIndex: index,
        updateStatus: true
      }));
      navigate("/entry")
    }; 
   
    
//getting the diaryEntry from the state stored from the firebase fetch and storing it in the redux store
const { diaryEntry, currentEntry, currentIndex } = state;
useEffect(()=>{
  dispatch(
    addEntry(diaryEntry))  
},[diaryEntry,dispatch])


  useEffect(() => {
    // Simulate data loading delay for demonstration purposes
    // const timer = setTimeout(() => {
    //   setLoading(false);
    // }, 3000);
    setLoading(false);

    // return () => clearTimeout(timer);
  }, [diaryentry]);

    return (
      <>
      <Header/>
      <>
      <div className="w-full my-4 mx-2 flex justify-between items-center">
          <div className="w-1/2 ">
            <span className="font-sans xl:text-3xl text-2xl text-gray-900 font-bold">Welcome Back</span>
          </div>
          <div className="w-1/2  mr-5 justify-end flex ">
          <Link to="/add" >
          <button className="text-white bg-gray-900 text-sm px-3 w-30 items-center h-7 rounded-md">New entry</button>
         </Link>
          </div>
         </div>
      </>
      <div className="main xl:pt-5">
        
         <div className="w-full py-5 ">
         <SearchFilter diaryEntry={diaryentry} setdisplayAll={setisDisplay}/>
         </div>
         {loading && <Loader/>}
              <ul >
                    {  !isdisplay? (diaryentry.map((entry,index)=>(
                                <li
                                    key={entry.key} className={ "font-sans" + (index === curIndex ? "active" : "")}
                                  onClick={() => setActiveDiaryEntry(entry, index)} >
                                  <DiaryEntry diaryEntry={entry}/>
                              </li>
                          ))): null
                    }

            </ul> 
          

         
         
        
         {/* { isLoggedIn && <LoginSuccess />} */}
      </div>
       

      </>
      
    );
  };

export default DashBoard


