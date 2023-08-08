import React, {  ChangeEvent, useCallback, useEffect, useState } from "react";
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
import { CollectionReference, DocumentData, OrderByDirection, Query, collection, doc, getDoc, getDocs,or,orderBy,query, updateDoc, where } from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CustomSelect } from "../../Components/SelectDropDown";
import formateDate from "../../Components/timeStamp";
import DeleteComponent from "../../Components/DeleteComponent";
import { ref } from "yup";
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
  const { diaryentry } = useAppSelector(state => state.diaryEntry) //get entire diary entry list
  const { currententry, curIndex,updateStatus}  = useAppSelector(state => state.currentEntry) //get the currently selected entry
    const dispatch = useAppDispatch()
  const navigate = useNavigate()

    //custom states
    const [state, setState] = useState<State>({
      diaryEntry: [],
     currentEntry: null,
     currentIndex: -1,
   });
   const sessionStorage = window.sessionStorage;
   const loginSuccessModalDisplayed = sessionStorage.getItem('LoginSuccess');
 
 //UX state 
   const [isLoggedIn, setIsLoggedIn] = useState(loginSuccessModalDisplayed === 'false'); //logged in state
  const [isdisplay, setisDisplay] = useState(false) //conditionally display search or entire result
  const [loading, setLoading] = useState(true);
  const [closeconfirm, setcloseconfirm] = useState(false)
  
    //states for datepicker
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
    const [isloading, setisloading] = useState(true)

    //current entry states
      const [imageAsFile, setImageAsFile] = useState<File | undefined>(undefined);

  const CATEGORIES = ["Food", "Laundry", "Agriculture"] ;
  const [selected, setSelected] = useState<Fruit>(CATEGORIES[0]);
  type Fruit = typeof CATEGORIES[number];
const [isDelete, setisDelete] = useState(false)
const [displayImage, setdisplayImage] = useState<string | undefined>(undefined)

//states for timestamp
const [curstartDate,setcurStartDate] = useState<moment.Moment | null>(null);
const [curendDate,setcurEndDate] = useState<moment.Moment | null>(null);
const [isUpdate, setIsUpdate] = useState(false)

const [curstate, setcurState] = useState({
  currentDiaryEntry: {
    key: currententry?.key || null,
    category: currententry?.category || "",
    description: currententry?.description || "",
    image: currententry?.image || "",
    startDate: currententry?.startDate || "",
    endDate: currententry?.endDate || " ",
    status: currententry?.status || false,
    currentIndex: curIndex
  },
  message: "",
});

const [test, settest] = useState(false)


//useEffct Hooks

//Fetch all user data from firestore using the query language
useEffect(() =>{ 

    const fetchAllEntries = async () => {   
      setLoading(true)
    try {  
      const diaryRef = collection(firedb, "webdiary");
    let  query_ = query(diaryRef, orderBy("timeStamps", "desc" as OrderByDirection));

    query_ = query(diaryRef, or(where("firebaseUser", "==", fireauth.currentUser?.uid), where("status", "==", true)));
      const querySnapshot = await getDocs(query_);
  
      
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
      
      setState((prevState) => ({ ...prevState, diaryEntry: entries })); //assign the state the newly fetch entries
      dispatch(addEntry(entries));  
      setLoading(false)
        //dispatch the newly fetch entries to firestore
    } catch (error) {
      console.error(error);
    }
  };
  setTimeout(() => {
    fetchAllEntries()
  },100)
// setLoading(false)

},[fireauth.currentUser?.uid])


//login success useEfffecr for handling successfull log in
useEffect(() => {
  if (loginSuccessModalDisplayed) {
    sessionStorage.setItem('LoginSuccess', 'false');
  }
  setTimeout(()=>{
  // Show login success modal if it has not been displayed before
  setIsLoggedIn(!loginSuccessModalDisplayed);

  },1000)
}, []);

// Loop through the documents and log the data for each one


//Event handlers
 
 
//getting the diaryEntry from the state stored from the firebase fetch and storing it in the redux store
const { diaryEntry, currentEntry, currentIndex } = state; 
console.log(JSON.stringify(currentEntry) + "plus" + currentIndex);
console.log(`the current second entry is ${JSON.stringify(currententry)} and the index is ${curIndex}`)

useEffect(()=>{
  dispatch(
    addEntry(diaryEntry))  
},[diaryEntry,dispatch])



  const SelectCategory = () => {
    return (
      <>
        <CustomSelect value={selected} onChange={setSelected} options={CATEGORIES} />
      </>
    );
  };

    const handleDescriptionChange = (e:ChangeEvent<HTMLInputElement>) =>{
      const description = e.target.value
      setcurState((prevState) => ({
          currentDiaryEntry: {
          ...prevState.currentDiaryEntry,
          description:description,
        },
        message: prevState.message,
      }));
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) =>{
      const file = e.target.files?.[0];
      setImageAsFile(file)
      imageAsFile && console.log("fffffffffffffffff");
      
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setdisplayImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }

    };
    

    const updateDiaryEntry = async (docRef:any, entries:any) => {
      await updateDoc(docRef, { ...entries });
      console.log('Document successfully updated!');
    };


        const handleCheckboxChange = (e:any) =>{
          const isChecked = e.target.checked;
          setState(prevState =>({
            ...prevState,
            status:isChecked
          }));
        }

        const updateEntry = useCallback((diaryEntry: DiaryData) =>{
           // Get a reference to the document you want to update
           const docRef = diaryEntry?.key ? doc(firedb, 'webdiary', diaryEntry.key) : undefined;
            if(docRef){
              getDoc(docRef)
            .then((docSnap) => {
              if (docSnap.exists()) {
                const entries = {
                  key: diaryEntry.key,
                  category: diaryEntry.category,
                  description: diaryEntry.description,
                  image: diaryEntry.image,
                  startDate: diaryEntry.startDate,
                  endDate: diaryEntry.endDate,
                  status: !diaryEntry.status,
                  firebaseUser: fireauth.currentUser?.uid,
                  timeStamps: formateDate()
                } 
                updateDoc(docRef, {...entries})
                .then(()=>{
                dispatch(selectedEntry(
                  {
                    currententry:entries,
                    curIndex:curIndex,
                    updateStatus:updateStatus
                  }
                ))
                alert("done")
                setcurState((prevState) => ({
                  currentDiaryEntry: {
                  ...prevState.currentDiaryEntry,
                  status:!diaryEntry.status,
                },
                message: prevState.message,
              }));
                })
                

              } else {
                throw new Error('Document does not exist!');
              }
            })
            .then(() => {
              console.log('Document successfully updated!');
            })
            .catch((error) => {
              console.error('Error updating document: ', error);
            });

            }

            else {
              console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");  
            }

        },[curIndex, dispatch, updateStatus]) 

            const setActiveDiaryEntry = (diaryEntry: DiaryData, index: number) => { 
              setState(prevState => ({...prevState, currentEntry: diaryEntry, currentIndex: index}));
           dispatch(selectedEntry({
                currententry: diaryEntry,
                curIndex: index,
                updateStatus: true
              }));

              updateEntry(diaryEntry)
              // navigate("/entry") 
            };

            const setActiveEntry = (diaryEntry: DiaryData, index: number) => { 
              setState(prevState => ({...prevState, currentEntry: diaryEntry, currentIndex: index}));
           dispatch(selectedEntry({
                currententry: diaryEntry,
                curIndex: index,
                updateStatus: true
              }));

              // navigate("/entry") 
            };

        const { currentDiaryEntry } = curstate;


    return (
      <>
      <Header/>
      <>
      <div className="w-full xl:w-10/12 my-8 mx-2 flex justify-evenly   items-center">
          <div className="w-1/2 xl:w-1/4 ">
            <span className="font-sans xl:hidden  xl:text-3xl text-2xl text-gray-900 font-bold">Welcome Back</span>
          </div>
          <div className="w-1/2  mr-5 justify-end xl:justify-end flex ">
          <Link to="/add" >
          <button className="text-white bg-gray-900 text-sm px-3 w-30 items-center h-7 rounded-md">New entry</button>
         </Link>
          </div>
         </div>
      </>
      <div className="main xl:pt-5">
        
         <div className="w-full py-5 ">
         <SearchFilter diaryEntry={diaryentry} setdisplayAll={setisDisplay} setActiveDiaryEntry={setActiveDiaryEntry} setActiveEntry={setActiveEntry} index={curIndex} setisDelete={setisDelete}/>
         </div>
         {loading && <div className="w-1/2 block h-20 mb-10">
          <div className="float-right justify-center items-end px-20 py-5 bg-purple-50 border-gray-200   w-1/3 h-20 shadow-md">
          <div>Loading...</div>
         <div> <Loader/></div>
          </div>

          </div>}
              <ul className=" xl:grid xl:grid-cols-2 xl:ml-20 " >
                    {  !isdisplay  ? (diaryentry.map((entry,index)=>(
                                <li
                                    key={entry.key} className={ "font-sans " + (index === curIndex ? "active" : "")}
                                   >
                                  <DiaryEntry entry={entry} setIsUpdate={setIsUpdate} isUpdate={isUpdate} setActiveDiaryEntry={setActiveDiaryEntry} index={index} setisDelete={setisDelete} setActiveEntry={setActiveEntry} />

                              </li>
                          ))): null
                    }

            </ul> 
      
         {
          isDelete && <DeleteComponent setisDelete={setisDelete}/>
         }
         
        
         {/* { isLoggedIn && <LoginSuccess />} */}
      </div>
      
       

      </>
      
    );
  };

export default DashBoard


