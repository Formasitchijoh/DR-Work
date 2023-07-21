import React, { ChangeEvent, useEffect, useState } from "react";
import logo from '../../resource/logo.png'
import { useAppSelector, useAppDispatch } from '../../hooks/storeHook'
import Header from '../../Components/Header/Header-Component'
import DiaryItem from "../../Components/DiaryEntry/DiaryEntry";
import { Link } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import DiaryServices from "../../Components/services/diaentry.service";
import DiaryData from "../../Components/types/diaryentry.type";
import DiaryEntry from "../../Components/DiaryEntry/DiaryEntry";
import SearchFilter from "../../Components/Search-filter";
import { addEntry } from "../../Components/Slices/diaryItemSlice";

type State = {
  diaryEntry: Array<DiaryData>,
  currentEntry: DiaryData | null,
  currentIndex: number
};

const LoginSuccess: React.FC = () => {
    const user = useAppSelector(state=>state.auth.user);
   
    return (
      // <div className="success-modal-main">
        <div className="success-modal">
            <div className="user-main">
                { user?.photoUrl !== null ? <img src={user?.photoUrl} alt="" className="photo "/>:<span className="photo">{user.email.charAt(0).toUpperCase()}</span>}
            </div>
          <h2 className="user-name">{user?.email}</h2>
          <h2 className="user-name">SuccessFull Login</h2>
        </div>
      // </div>
    );
  };


const DashBoard = ()=>{

    const user = useAppSelector(state=>state.auth.user)
    const diaryentry = useAppSelector(state=>state.diaryEntry.diaryentry)
    const dispatch = useAppDispatch()

    const [state, setState] = useState<State>({
      diaryEntry: [],
     currentEntry: null,
     currentIndex: -1,
   });

 
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [entrySummit, setEntrySummit] = useState(false)
    const [isDisplay, setisDisplay] = useState(true)

    let diaryentries = new Array<DiaryData>();
    const onDataChange = (items: any) => {
      items.forEach((item: any) => {
        let key = item.key;
        let data = item.val();
        diaryentries.push({
          key: key,
          category: data.category,
          description: data.description,
          image: data.image,
          status: data.status,
          timeStamps:data.timeStamps
        });
      });
      setState(prevState => ({...prevState, diaryEntry: diaryentries}));
      dispatch(
        addEntry(diaryentries))
    };

   console.log(`${JSON.stringify(diaryentry)}`);
   

    const setActiveDiaryEntry = (diaryEntry: DiaryData, index: number) => {
      setState(prevState => ({...prevState, currentEntry: diaryEntry, currentIndex: index}));
    };
    useEffect(() => {
      DiaryServices.getAll().on("value", onDataChange);
      return () => {
       DiaryServices.getAll().off("value", onDataChange);
      }
    }, []);
   
   useEffect(()=>{
      if(user){
        setInterval(()=>{
          setEntrySummit(false);
   },1000)}
},[])

const { diaryEntry, currentEntry, currentIndex } = state;
useEffect(()=>{
  dispatch(
    addEntry(
      diaryEntry ) )
},[diaryEntry,dispatch])

    return (
      <>
         <Header/>
         <div className="w-full my-4 mx-2 flex justify-between items-center">
          <div className="w-1/2 ">
            <span className="font-sans text-xl text-gray-900 font-bold">Welcome Back</span>
          </div>
          <div className="w-1/2  mr-5 justify-end flex ">
          <Link to="/add" >
          <button className="text-white bg-gray-900 text-xl px-2 w-15 rounded-sm">Add</button>
         </Link>
          </div>
         </div>
         <SearchFilter diaryEntry={diaryEntry} displayAll={setisDisplay}/>
        
         <ul className="list-group">

            {isDisplay? (diaryEntry.map((entry,index)=>(
            <li  key={entry.key}
            className={
              " w-11/12 my-5  ml-4 text-xl  bg-teal-100 border-2 border-gray-100 flex justify-center items-center" +
            (index === currentIndex ? "active" : "")
              }
            onClick={() => setActiveDiaryEntry(entry, index)}
              >
                <DiaryEntry diaryEntry={entry}/>
                </li>
            ))): null }

</ul>
         { !isLoggedIn && <LoginSuccess />}
         {/* { !entrySummit && <LoginSuccess />} */}

      </>
       
    );
  };

export default DashBoard