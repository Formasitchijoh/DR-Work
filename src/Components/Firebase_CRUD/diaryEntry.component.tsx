import React,{useState,ChangeEvent} from 'react'
import logo from '../../resource/logo.png'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import DiaryData from '../types/diaryentry.type'
import { storage } from '../../firebase'
import DiaryServices from '../services/diaentry.service'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { SelectDropDown,CustomSelect } from "../SelectDropDown";

type Props = {
    diaryEntry:DiaryData ,
    refreshList:Function
}

type State = {
    currentDiaryEntry: DiaryData ;
    message:string
}
const DiaryEntrys = (props:Props) => {
    const [state, setState] = useState({
        currentDiaryEntry:{
            key: props.diaryEntry.key ?? null,
            category: props.diaryEntry.category || "",
            description: props.diaryEntry.description || "",
            image: props.diaryEntry.image || "" ,
            startDate:props.diaryEntry.startDate || "",
            endDate:props.diaryEntry.endDate || "",
            status: props.diaryEntry.status || false,
        },
        message:"",

    });

    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState<File | undefined>(undefined);
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)

    const [selectedOption, setSelectedOption] = useState<DiaryData | null>(null);
    const CATEGORIES = ["Food", "Laundry", "Agriculture"] ;
    const [selected, setSelected] = useState<Fruit>(CATEGORIES[0]);
    type Fruit = typeof CATEGORIES[number];
    
    const SelectCategory = () => {
      return (
        <>
          <div className='w-full h-10'>Value: {selected}</div>
          <CustomSelect value={selected} onChange={setSelected} options={CATEGORIES} />
        </>
      );
    };
  
    const handleChange = (option: DiaryData | null) => {
      setSelectedOption(option );
    };

    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
        const category = e.target.value;
        setState((prevState) => ({
            currentDiaryEntry: {
            ...prevState.currentDiaryEntry,
            category:category,
          },
          message: prevState.message,
        }));
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

        const uploadEntry = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);
        uploadEntry.on(
            'state_changed',
            (snapShot: any) => {
                console.log(snapShot);
                
            },
            (err: any) =>{
                console.log(err)
            },
            () =>{
                storage
                .ref('images')
                .child(imageAsFile.name)
                .getDownloadURL()
                .then((firebaseURL: any) =>{
                    setState((prevState) =>({
                        currentDiaryEntry: {
                            ...prevState.currentDiaryEntry,
                            image: firebaseURL
                        },
                        message: prevState.message
                    }));
                    setImageAsUrl((prevObject)=>({...prevObject,imgUrl:firebaseURL}))
                });
            }
            
        );
      };
      const updatePublished = (status:boolean) =>{
        if(state.currentDiaryEntry.key){
            DiaryServices.update(state.currentDiaryEntry.key,{status:status})
            .then(()=>{
                setState((prevState) => ({
                    currentDiaryEntry:{
                        ...prevState.currentDiaryEntry,
                        status:status,
                    },
                    message:"The status was updated successfully"
                }));
            })
            .catch((e:Error)=>{
                console.log(e);
                
            })
        }
      }

      const updateDiaryEntry =()=>{
        if(state.currentDiaryEntry.key){
            const data ={
                category:state.currentDiaryEntry.category,
                description:state.currentDiaryEntry.description,
                image:state.currentDiaryEntry.image,
                startDate:state.currentDiaryEntry.startDate,
                endDate:state.currentDiaryEntry.endDate,
                status:state.currentDiaryEntry.status
            }
            DiaryServices.update(state.currentDiaryEntry.key,data)
            .then(()=>{
                setState((prev)=>({
                  currentDiaryEntry:prev.currentDiaryEntry,
                  message: "The tutorial was updated successfully",
                }));
              })
              .catch((e:Error)=>{
                console.log(e);
                
              })
            }
          }

          const deleteTutorial = () => {
            if (state.currentDiaryEntry.key) {
              DiaryServices.deleteTutorial(state.currentDiaryEntry.key)
                .then(() => {
                  props.refreshList();
                })
                .catch((e: Error) => {
                  console.log(e);
                });
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
      <div className='create-new'>
        <span className='create-text'>Create a New diary</span>
        <div className='close'>
          <span className='x'>X</span>
        </div>
      </div>
      <form  >
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
                onChange={handleImageChange}
                />
              </div>
              {currentDiaryEntry.image && (<img src={currentDiaryEntry.image} alt=''/>)}
      
      <div className='entry-status'>
        <input
         name='entryStatus'
          type="Checkbox"
           className='radio'
            checked={state.currentDiaryEntry.status}
             onChange={handleCheckboxChange} />
        <span>Check to confirm if you want to continue</span>
      </div>
      <div  className='facebook-main '>
        <button  className=' text-xl text-white'>Sign in with Google</button>
        </div>
      </form>
     
        <Footer/>
        </div>
  )
}

export default DiaryEntrys