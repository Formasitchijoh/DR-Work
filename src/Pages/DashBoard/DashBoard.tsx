import React, {  useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from '../../hooks/storeHook'
import Header from '../../Components/Header/Header-Component'
import { Link } from "react-router-dom";
import DiaryServices from "../../Components/services/diaentry.service";
import DiaryData from "../../Components/types/diaryentry.type";
import DiaryEntry from "../../Components/DiaryEntry/DiaryEntry";
import SearchFilter from "../../Components/Search-filter";
import { addEntry } from "../../Components/Slices/diaryItemSlice";
import DiaryEntryComponent from "../../Components/Firebase_CRUD/diaryEntry.component";
import moment from 'moment'
import Cookies from "js-cookie";
import { login } from "../../Components/Slices/authSlice";
import Loader from "../../Components/Loader/loader";
import { fireauth, firedb } from '../../firebase';
import { collection, getDocs,or,orderBy,query, where } from "firebase/firestore";
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
    const user = useAppSelector(state=>state.auth.user)
    const diaryentry = useAppSelector(state=>state.diaryEntry.diaryentry)
    const dispatch = useAppDispatch()

    //custom states
    const [state, setState] = useState<State>({
      diaryEntry: [],
     currentEntry: null,
     currentIndex: -1,
   });
   const sessionStorage = window.sessionStorage;
   const loginSuccessModalDisplayed = sessionStorage.getItem('LoginSuccess');
  const [isLoggedIn, setIsLoggedIn] = useState(loginSuccessModalDisplayed === 'false');
    const [isDisplay, setisDisplay] = useState(true)
    const [updateStatus, setUpdateStatus] = useState(false)

    //states for datepicker
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
    const [isloading, setisloading] = useState(true)



// Loop through the documents and log the data for each one


//useEffects
useEffect(() =>{

  fetchAllEntries();
},[])
  
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
const fetchAllEntries = async () => {
  try {
    const diaryRef = collection(firedb, "webdiary");
   const request = query(diaryRef, or(where("diaryEntry.firebaseUser", "==", fireauth.currentUser?.uid), where("diaryEntry.status", "==", true)));
    const querySnapshot = await getDocs(request);
    const entries: DiaryData[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      entries.push({
        key: doc.id,
        category: data.diaryEntry.category,
        description: data.diaryEntry.description,
        image: data.diaryEntry.image,
        status: data.diaryEntry.status,
        startDate: data.diaryEntry.startDate,
        endDate: data.diaryEntry.endDate,
        firebaseUser: data.diaryEntry.firebaseUser,
        timeStamps: data.diaryEntry.timeStamps,
      });
    });
    
    setState((prevState) => ({ ...prevState, diaryEntry: entries }));
    dispatch(addEntry(entries));    
  } catch (error) {
    console.error(error);
  }
};
   
  
    const refreshList = () => {
      setState(prevState => ({...prevState, currentEntry: null, currentIndex: -1}));
    };

    const setActiveDiaryEntry = (diaryEntry: DiaryData, index: number) => {
      setState(prevState => ({...prevState, currentEntry: diaryEntry, currentIndex: index}));

    };  

//getting the diaryEntry from the state stored from the firebase fetch and storing it in the redux store
const { diaryEntry, currentEntry, currentIndex } = state;
useEffect(()=>{
  dispatch(
    addEntry(diaryEntry ) )
},[diaryEntry,dispatch])

    return (
      <div className="main">
         <Header/>
         <div className="w-full my-4 mx-2 flex justify-between items-center">
          <div className="w-1/2 ">
            <span className="font-sans text-xl text-gray-900 font-bold">Welcome Back</span>
          </div>
          <div className="w-1/2  mr-5 justify-end flex ">
          <Link to="/add" >
          <button className="text-white bg-gray-900 text-sm px-3 w-30 items-center h-7 rounded-sm">New entry</button>
         </Link>
          </div>
         </div>
         <div className="w-full ">
         <SearchFilter diaryEntry={diaryEntry} setdisplayAll={setisDisplay}/>
         </div>
           {/* {isloading && <Loader size={100} color="#000" />} */}
         { !currentEntry
          ? (
              <ul className="list-group">
                
                    {  isDisplay? (diaryEntry.map((entry,index)=>(
                                <li
                                    key={entry.key} className={ "list-group-item  " + (index === currentIndex ? "active" : "")}
                                  onClick={() => setActiveDiaryEntry(entry, index)} >
                                  <DiaryEntry diaryEntry={entry}/>
                              </li>
                          ))): null
                    }

            </ul> ) 
       : ( 
        <DiaryEntryComponent
         diaryEntry={currentEntry} 
         refreshList={refreshList}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
         setUpdateStatus={setUpdateStatus}
         />
       )}
        
        
         {/* { isLoggedIn && <LoginSuccess />} */}
      </div>
       
    );
  };

export default DashBoard










    
      // const onDataChange = (snapshot: any) => {
      //   try {
      //     const entries:DiaryData[] = [];
      //     snapshot.forEach((childSnapshot: any) => {
      //       const key = childSnapshot.key;
      //       const data = childSnapshot.val();
      //       entries.push({
      //         key: key,
      //         category: data.category,
      //         description: data.description,
      //         image: data.image,
      //         status: data.status,
      //         startDate: data.startDate,
      //         endDate: data.endDate,
      //         firebaseUser: data.firebaseUser,
      //         timeStamps: data.timeStamps
      //       });
      //     });
      //     setState(prevState => ({...prevState, diaryEntry: entries}));
      //     dispatch(addEntry(entries));
      //   } catch (error) {
      //     console.error(error);
      //   }
      // };
    
    
   

  //  useEffect(() => {
  //   const snapshotPromises = [DiaryServices.getPublicEntries(),  DiaryServices.getUserEntries()]
  //   snapshotPromises.on("value", onDataChange);
  //   // DiaryServices.getUserEntries().on("value", onDataChange);
  
  //   return () => {
  //     DiaryServices.getPublicEntries().off("value", onDataChange);
  //     // DiaryServices.getUserEntries().off("value", onDataChange);
  //   };
  //   }, []);