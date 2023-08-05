import React,{useState,ChangeEvent,useCallback,useEffect} from 'react'
import logo from '../../resource/logo.png'
import { useForm } from 'react-hook-form'
import DiaryData from '../types/diaryentry.type'
import Footer from '../Footer/Footer'
import { SelectDropDown,CustomSelect } from "../SelectDropDown";
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import DeleteComponent from '../DeleteComponent'
import { useAppSelector,useAppDispatch } from '../../hooks/storeHook'
import { updateDoc,doc,setDoc, getDoc } from 'firebase/firestore'
import Header from '../Header/Header-Component'
import { fireauth, firedb } from '../../firebase'
import { selectedEntry } from '../Slices/currentEntrySlice'
import { storageRef } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { DateComponent } from '../datePicker'
import formateDate from '../timeStamp'
import Loader from '../Loader/loader'

const DiaryEntryComponent = () => {  

  const { currententry,curIndex,updateStatus } = useAppSelector(state => state.currentEntry);

  const { diaryentry } = useAppSelector(state =>state.diaryEntry)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

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
const [displayImage, setdisplayImage] = useState<string | undefined>(undefined)

//states for timestamp
const [startDate,setStartDate] = useState<moment.Moment | null>(null);
const [endDate,setEndDate] = useState<moment.Moment | null>(null);
const [isSubmiting, setisSubmiting] = useState(false)
const [enable, setEnable] = useState(false)


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

      const uploadEntries = async () => {
         setisSubmiting(true)
        try {
          const imageRef = ref(storageRef, `images/${imageAsFile?.name}`);
          if (!imageAsFile) {
            return;
          }
      
          const snapshot = await uploadBytesResumable(imageRef, imageAsFile);
          const downloadURL = await getDownloadURL(snapshot.ref);
      
          const docRef = currententry?.key
            ? doc(firedb, 'webdiary', currententry.key)
            : undefined;
      
          if (!docRef) {
            return;
          }
      
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            throw new Error('Document does not exist!');
          }
      
          const entries = {
            key: state.currentDiaryEntry.key,
            category: selected,
            description: state.currentDiaryEntry.description,
            image: downloadURL,
            startDate: startDate?.format("ll"),
            endDate: endDate?.format("ll"),
            firebaseUser: fireauth.currentUser?.uid,
            status: !state.currentDiaryEntry.status,
            timeStamps: formateDate(),

          };
      
          await updateDiaryEntry(docRef, entries);
      
          const newEntries = {
            currententry: entries as unknown as DiaryData,
            curIndex: curIndex,
            updateStatus: updateStatus,
          };
      
          setState((prevState) => ({
            currentDiaryEntry: {
              ...prevState.currentDiaryEntry,
              status: !state.currentDiaryEntry.status,
            },
            message: prevState.message,
          }));
      
          dispatch(selectedEntry(newEntries));
          setisSubmiting(false)
          navigate('/dash');
        } catch (error) {
          console.error('Error updating document: ', error);
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


          const updateEntry = () =>{
         // Get a reference to the document you want to update
            console.log(JSON.stringify(currententry));
             const docRef = currententry?.key ? doc(firedb, 'webdiary', currententry.key) : undefined;
              if(docRef){
                getDoc(docRef)
              .then((docSnap) => {
                if (docSnap.exists()) {
                  const entries = {
                    key: state.currentDiaryEntry.key,
                    category: state.currentDiaryEntry.category ,
                    description: state.currentDiaryEntry.description ,
                    image: state.currentDiaryEntry.image ,
                    startDate: state.currentDiaryEntry.startDate ,
                    endDate: state.currentDiaryEntry.endDate ,
                    status: !state.currentDiaryEntry.status ,
                  }
                  updateDoc(docRef, {...entries});
                  const newEntries = {
                    currententry:entries as DiaryData,
                    curIndex:curIndex,
                    updateStatus:updateStatus
                    
                  }
                  setState((prevState) => ({
                    currentDiaryEntry: {
                    ...prevState.currentDiaryEntry,
                    status:!state.currentDiaryEntry.status,
                  },
                  message: prevState.message,
                }));
                dispatch(selectedEntry(newEntries))
                  alert(state.currentDiaryEntry.status)
                  navigate("/dash")

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
              }}

          const { currentDiaryEntry } = state;

  return (
    <div className='h-full'>
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
          value={ currentDiaryEntry?.description}
           className='text-area xl:h-[30vh] xl:mb-5'>
        </input>
      </div>
      <div className='image-container xl:h-[10vh]'>
          <input
           type='file'
           onChange={handleImageChange}/>
        </div>
      { currentDiaryEntry?.image ? (<img src={ currentDiaryEntry.image} alt=''/>):null}
      <>
    </>
    <div className='w-full'>
    <DateComponent startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} moments={moment()}/>
    </div> 
    {
          isSubmiting  && <div className='fixed flex justify-center items-center inset-0 z-50  w-screen h-screen '>
           <div className='bg-purple-100 w-30 mx-auto p-10 h-50 flex-col justify-center items-center '>
           <span>Submitting ....</span>
            <Loader/>
           </div>
          </div>
        }
      
      <div className='entry-status'>
        <input
         name='entryStatus'
          type="Checkbox"
           className='radio'
            checked={ currentDiaryEntry?.status}
             onChange={handleCheckboxChange} />
        <span>Check to confirm if you want to continue</span>
      </div>
      </div>

      <div className='mb-20  flex justify-center items-center gap-5'>
      { currentDiaryEntry?.status
             ? (
              <button
                className="inline-block px-2 py-1 text-sm font-semibold text-white bg-blue-500 rounded mr-2"
                onClick={updateEntry}
              > UnPublish Entry </button>) 
            : (
              <button
                className="inline-block px-2 py-1 text-sm font-semibold text-white bg-blue-500 rounded mr-2"
                onClick={updateEntry}
                >Publish Entry</button>
            )
            }

            <button
              className="inline-block px-2 py-1 text-sm font-semibold text-white bg-red-500 rounded mr-2"
              onClick={()=>setisDelete(true)}
            >
              Delete
            </button>

            <button
              type="submit"
              className={`inline-block px-2 py-1 text-sm font-semibold text-white ${enable && 'bg-blue-400'} bg-green-500 rounded`}
              onClick={uploadEntries}
            >
              Update
            </button>

      </div>
      

            {/* {
              isdelete && <DeleteComponent currentDiaryEntry={currententry}  setisdelete={setisDelete} /> 
            } */}

     
        <Footer/>
        
        </div>

       
    </div>

  )
}

export default DiaryEntryComponent