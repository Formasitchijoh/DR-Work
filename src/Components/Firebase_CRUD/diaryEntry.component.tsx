import React,{useState,ChangeEvent,useCallback,useEffect} from 'react'
import logo from '../../resource/logo.png'
import { useForm } from 'react-hook-form'
import DiaryData from '../types/diaryentry.type'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { SelectDropDown,CustomSelect } from "../SelectDropDown";
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

type Props = {
    diaryEntry:DiaryData ,
    refreshList:Function 
    startDate: string,
   endDate:string, 
   setStartDate:React.Dispatch<React.SetStateAction<string>>
   setEndDate:React.Dispatch<React.SetStateAction<string>>
    setUpdateStatus:React.Dispatch<React.SetStateAction<boolean>>
 
}

const DiaryEntryComponent = (props:Props) => { 
  const navigate = useNavigate()
    const [state, setState] = useState({
        currentDiaryEntry:{
            key: props.diaryEntry.key ?? null,
            category: props.diaryEntry.category || "",
            description: props.diaryEntry.description || "",
            image: props.diaryEntry.image || "" ,
            startDate:props.diaryEntry.startDate || "" ,
            endDate:props.diaryEntry.endDate || " ",
            status: props.diaryEntry.status || false,

        },
        message:"",

    });

    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState<File | undefined>(undefined);
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)

    const CATEGORIES = ["Food", "Laundry", "Agriculture"] ;
    const [selected, setSelected] = useState<Fruit>(CATEGORIES[0]);
    type Fruit = typeof CATEGORIES[number];
    
  ;
   
   
    const SelectCategory = () => {
      return (
        <>
          <CustomSelect value={selected} onChange={setSelected} options={CATEGORIES} />
        </>
      );
    };
  
  
    // const handleDateSelect = useCallback(()=>{
    //   if(props.startDate && props.endDate){
    //     setState((prevState) => ({
    //       currentDiaryEntry: {
    //       ...prevState.currentDiaryEntry,
    //       startDate:props.startDate,
    //       endDate:props.endDate,
    //     },
    //     message: prevState.message,
    //   }));
    //   }

    // },[props.startDate, props.endDate])

    // useEffect(()=>{
    //   if(props.startDate && props.endDate){
    //     handleDateSelect()
    //   }
    //   })
  
   
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

      // const updatePublished = (status:boolean) =>{
      //   if(state.currentDiaryEntry.key){
      //       DiaryServices.update(state.currentDiaryEntry.key,{status:status})
      //       .then(()=>{
      //           setState((prevState) => ({
      //               currentDiaryEntry:{
      //                   ...prevState.currentDiaryEntry,
      //                   status:status,
      //               },
      //               message:"The status was updated successfully"
      //           }));
      //       })
      //       .catch((e:Error)=>{
      //           console.log(e);
                
      //       })
      //   }
      // }

      const updateDiaryEntry =()=>{
        if(state.currentDiaryEntry.key){
            const data = { 
                category:state.currentDiaryEntry.category,
                description:state.currentDiaryEntry.description,
                image:state.currentDiaryEntry.image,
                startDate:state.currentDiaryEntry.startDate,
                endDate:state.currentDiaryEntry.endDate,
                status:state.currentDiaryEntry.status
            } 
            // DiaryServices.update(state.currentDiaryEntry.key, data)
            // .then(()=>{
            //     setState((prev)=>({
            //       currentDiaryEntry: prev.currentDiaryEntry,
            //       message: "The diaryEntry was updated successfully",
            //     }));
            //     props.setUpdateStatus(true)
            //     // alert(props.setUpdateStatus(true))
            //   })
            //   .catch((e:Error)=>{
            //     console.log(e);
                
            //   })
            }
            navigate("/dash")
          }

          const deleteDiaryEntry = () => {
            if (state.currentDiaryEntry.key) {
              // alert(state.currentDiaryEntry.key)
              // DiaryServices.deleteDiaryEntry(state.currentDiaryEntry.key)
              //   .then(() => {
              //     props.refreshList();
              //   })
              //   .catch((e: Error) => {
              //     console.log(e);
              //   });
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
           className='text-area'>
        </input>
      </div>
      <div>
          <input
           type='file'
           onChange={handleImageChange}/>
        </div>
      {currentDiaryEntry.image && (<img src={currentDiaryEntry.image} alt=''/>)}
      <>
    {/* <DiaryEntryForm setDateEnd={props.setDateEnd} setInitDate={props.setInitDate} setDateInput={props.setDateInput} initDate={props.initDate} dateEnd={props.dateEnd} dateInput={props.dateInput} moments={props.moments} /> */}
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
      {/* <div  className='facebook-main '>
        <button  className=' text-xl text-white'>Save</button>
        </div> */}
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
              onClick={deleteDiaryEntry}
            >
              Delete
            </button>

            <button
              type="submit"
              className="inline-block px-2 py-1 text-sm font-semibold text-white bg-green-500 rounded"
              onClick={updateDiaryEntry}
            >
              Update
            </button>
            <p>{state.message}</p>

     
        <Footer/>
        </div>
  )
}

export default DiaryEntryComponent