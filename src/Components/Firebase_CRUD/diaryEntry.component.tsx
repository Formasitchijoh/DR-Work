import React,{useState,ChangeEvent,useCallback,useEffect} from 'react'
import logo from '../../resource/logo.png'
import { useForm } from 'react-hook-form'
import DiaryData from '../types/diaryentry.type'
import Footer from '../Footer/Footer'
import { SelectDropDown,CustomSelect } from "../SelectDropDown";
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import DeleteComponent from '../DeleteComponent'
import { useAppSelector } from '../../hooks/storeHook'
import { updateDoc, doc } from 'firebase/firestore'
import { firedb } from '../../firebase'
import Header from '../Header/Header-Component'
const DiaryEntryComponent = () => { 
  const { currententry,curIndex } = useAppSelector(state => state.currentEntry);
  const { diaryentry } = useAppSelector(state =>state.diaryEntry)
  const navigate = useNavigate()
  const [state, setState] = useState({
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
    const [imageAsFile, setImageAsFile] = useState<File | undefined>(undefined);

    const CATEGORIES = ["Food", "Laundry", "Agriculture"] ;
    const [selected, setSelected] = useState<Fruit>(CATEGORIES[0]);
    type Fruit = typeof CATEGORIES[number];
   

  const [isdelete, setisDelete] = useState(false)
    const SelectCategory = () => {
      return (
        <>
          <CustomSelect value={selected} onChange={setSelected} options={CATEGORIES} />
        </>
      );
    };
  
      const handleDescriptionChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const description = e.target.value
        setState((prevState) => ({
            currentDiaryEntry: {
            ...prevState.currentDiaryEntry,
            description:description,
          },
          message: prevState.message,
        }));
      }

      const handleImageChange = (e: ChangeEvent<HTMLInputElement>) =>{
        const image = e.target.files?.[0];
        setImageAsFile(image);

        if (!imageAsFile) {
            console.error(`not an image, the image file is a ${typeof (imageAsFile)}`);
            return;
          }

      };

          const handleCheckboxChange = (e:any) =>{
            const isChecked = e.target.checked;
            setState(prevState =>({
              ...prevState,
              status:isChecked
            }));
          }
          const { currentDiaryEntry } = state;

  return (
    <>
        <Header/>

        <div className='new-entry'>
      <div >
      <div className='category'>
        <span className='text'> Category </span>
        <div className='h-1/4 w-full'>
            <SelectCategory/>
        </div>
      </div>
      <div className='descript '>
        <span className='text'>Description</span>
        <input
         name='description'
          onChange={handleDescriptionChange} 
          placeholder='Enter description here'
          value={currentDiaryEntry.description}
           className='text-area xl:h-[30vh] xl:mb-5'>
        </input>
      </div>
      <div className='image-container xl:h-[10vh]'>
          <input
           type='file'
           onChange={handleImageChange}/>
        </div>
      {currentDiaryEntry.image && (<img src={currentDiaryEntry.image} alt=''/>)}
      <>
    </>
      
      <div className='entry-status'>
        <input
         name='entryStatus'
          type="Checkbox"
           className='radio'
            checked={state.currentDiaryEntry.status}
             onChange={handleCheckboxChange} />
        <span>Check to confirm if you want to continue</span>
      </div>
      </div>
      {currentDiaryEntry.status
             ? (
              <button
                className="inline-block px-2 py-1 text-sm font-semibold text-white bg-blue-500 rounded mr-2"
              > UnPublish Entry </button>) 
            : (
              <button
                className="inline-block px-2 py-1 text-sm font-semibold text-white bg-blue-500 rounded mr-2"
                >Publish Entry</button>
            )
            }

            <button
              className="inline-block px-2 py-1 text-sm font-semibold text-white bg-red-500 rounded mr-2"
              onClick={()=>navigate("/dash")}
            >
              Delete
            </button>

            <button
              type="submit"
              className="inline-block px-2 py-1 text-sm font-semibold text-white bg-green-500 rounded"
            >
              Update
            </button>
            <p>{state.message}</p>

            {
              currententry && <DeleteComponent currentDiaryEntry={currententry}  /> 
            }

     
        <Footer/>
        </div>
    </>

  )
}

export default DiaryEntryComponent