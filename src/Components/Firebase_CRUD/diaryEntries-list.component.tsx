import React,{useState,ChangeEvent,useEffect} from "react";
import DiaryData from "../types/diaryentry.type";
import { storage } from "../../firebase";
import firebase from "../../firebase";
import DiaryServices from "../services/diaentry.service";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { SelectDropDown,CustomSelect } from "../SelectDropDown";
import { useAppDispatch,useAppSelector } from "../../hooks/storeHook";
import { addEntry } from "../Slices/diaryItemSlice";
import DiaryEntrys from "./diaryEntry.component";
import DiaryEntry from "../DiaryEntry/DiaryEntry";
import { date } from "yup";

type Props = {};

type State = {
  diaryEntry: Array<DiaryData>,
  currentEntry: DiaryData | null,
  currentIndex: number
};

const EntryList = () => {

  const { diaryentry } = useAppSelector(state=>state.diaryEntry)
  const dispatch = useAppDispatch()

    const [state, setState] = useState<State>({
         diaryEntry: [],
        currentEntry: null,
        currentIndex: -1,
      });

      const onDataChange = (items: any) => {
        let diaryentrys = new Array<DiaryData>();
        items.forEach((item: any) => {
          let key = item.key;
          let data = item.val();
          diaryentrys.push({
            key: key,
            category: data.category,
            description: data.description,
            image: data.image,
            status: data.status,
            timeStamps:data.timeStamps
          });
        });
        setState(prevState => ({...prevState, diaryEntry: diaryentrys}));
        dispatch(
          addEntry(diaryentrys)
        )
      };
      useEffect(() => {
        DiaryServices.getAll().on("value", onDataChange);
        return () => {
         DiaryServices.getAll().off("value", onDataChange);
        }
      }, []);

      const refreshList = () => {
        setState(prevState => ({...prevState, currentEntry: null, currentIndex: -1}));
      };
      const setActiveDiaryEntry = (diaryEntry: DiaryData, index: number) => {
        setState(prevState => ({...prevState, currentEntry: diaryEntry, currentIndex: index}));
      };
      const removeAllEntries = () => {
       DiaryServices.deleteAll()
          .then(() => {
            refreshList();
          })
          .catch((e: Error) => {
            console.log(e);
          });
      };
      const { diaryEntry, currentEntry, currentIndex } = state;
useEffect(()=>{
  dispatch(
    addEntry(
      diaryEntry ) )
},[])

       
      

  return (
   
    <div className="flex-col gap-10">
      <div className="col-md-6">
        <h4>Tutorials List</h4>
        <ul className="list-group">

            {diaryEntry.map((entry,index)=>(
         <li  key={entry.key}
         className={
               " w-full m-10 text-xl  bg-teal-100 border-2 border-gray-100 flex justify-center items-center" +
           (index === currentIndex ? "active" : "")
               }
            onClick={() => setActiveDiaryEntry(entry, index)}
              >
                <DiaryEntry diaryEntry={entry}/>
                 </li>
            ))}
          
        </ul>
        <button
          className="m-3 bg-blue-900 text-white text-xl p-5"
          onClick={removeAllEntries}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentEntry ? (
          <DiaryEntrys
            diaryEntry={currentEntry}
            refreshList={refreshList}
          />
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EntryList