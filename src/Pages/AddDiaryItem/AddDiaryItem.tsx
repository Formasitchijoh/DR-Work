import Header from '../../Components/Header/Header-Component'
import Footer from '../../Components/Footer/Footer'
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch,useAppSelector } from '../../hooks/storeHook'
import { addEntry } from '../../Components/Slices/diaryItemSlice'
import { fireauth,firedb } from '../../firebase'
import { SelectDropDown,CustomSelect } from '../../Components/SelectDropDown'
import DiaryData from '../../Components/types/diaryentry.type'
import moment from 'moment'
const AddDiaryItem = () => {

  const { diaryentry} = useAppSelector((state)=>state.diaryEntry);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [diaryEntry, setDiaryEntry] = useState<DiaryData>({
    category: '',
    description: '',
    image: "",
    status: false,
    startDate:'',
    endDate:'',
    firebaseUser:fireauth.currentUser?.uid,
    timeStamps:''
  });
  const [selectedOption, setSelectedOption] = useState<DiaryData | null>(null);
  const CATEGORIES = ["Food", "Laundry", "Agriculture"] ;
  const [selected, setSelected] = useState<Fruit>(CATEGORIES[0]);
  type Fruit = typeof CATEGORIES[number];
  
  const SelectCategory = () => {
    return (
      <>
        {/* <div className='w-full h-10'>Value: {selected}</div> */}
        <CustomSelect value={selected} onChange={setSelected} options={CATEGORIES} />
      </>
    );
  };

  
  useEffect(()=>{
    if(Boolean(diaryentry)){
      navigate("/dash")
      
    }
  },[diaryentry,navigate])

  //get cateeogry and description
const handleEntry = (e:any) =>{
setDiaryEntry({...diaryEntry, [e.target.name] : e.target.value})
}

const handleCheckboxChange = (e:any) =>{
  const isChecked = e.target.checked;
  setDiaryEntry(prevState =>({
    ...prevState,
    entryStatus:isChecked
  }));
}
const handleImageChange = (e:String | any) =>{  
  const selectedImage = e.target.files[0];
  setDiaryEntry(prevState =>({
    ...prevState,
    image:URL.createObjectURL(selectedImage)
  })  
  );
}

const onSubmitHandle = (e:any) =>{
  e.preventDefault()
  // dispatch(
  //   addEntry({
  //     category:selected,
  //     description:diaryEntry.description,
  //     image:diaryEntry.image,
  //     status:diaryEntry.status 
  //   })
  // )
  console.log(`This is the ${diaryentry}`);
  
}

  return (
    <div className='new-entry'>
      <Header/>
      <div className='create-new'>
        <span className='create-text'>Create a New diary</span>
        <div className='close'>
          <span className='x'>X</span>
        </div>
      </div>
      <form onSubmit={onSubmitHandle} >
      <div className='category'>
        <span className='text'> Category </span>
        <div className='h-1/4 w-full'>
            <SelectCategory/>
        </div>
      </div>

      <div className='descript '>
        <span className='text'>Description</span>
        <textarea
         name='description'
          onChange={handleEntry} 
          placeholder='Enter description here'
           className='text-area'>
        </textarea>
      </div>
      <div className='image-container'>
       <span className='text'>Upload Image from Device(Optional)</span>
        <div className='image'>
          {
            diaryEntry.image ? (<img src={diaryEntry.image} alt='selected'/>):(<span>Select an Image</span>)
          }
        </div>
        <div className="mt-4">
        <input type="file" onChange={handleImageChange} accept="image/*" className="hidden" id="image-upload" />
        <label htmlFor="image-upload" className="w-full px-4 py-2 text-sm text-white bg-purple-200 rounded-lg cursor-pointer hover:bg-green-600 transition duration-200 ease-in-out">
          Select Image
        </label>
      </div>
      </div>
      <div className='entry-status'>
        <input
         name='entryStatus'
          type="Checkbox"
           className='radio'
            checked={diaryEntry.status}
             onChange={handleCheckboxChange} />
        <span>Check to confirm if you want to continue</span>
      </div>
      <div  className='facebook-main '>
        <button  className=' text-xl text-white'>Save</button>
        </div>
      </form>
     
        <Footer/>
        </div>
  )
}

export default AddDiaryItem