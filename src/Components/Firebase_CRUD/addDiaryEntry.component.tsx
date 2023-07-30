import React,{useState,ChangeEvent, useEffect} from "react";
import { fireauth, firedb, storageRef } from "../../firebase"
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import Footer from "../Footer/Footer";
import {CustomSelect } from "../SelectDropDown";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import formateDate from "../timeStamp";
import defaultimg from "../../resource/download-31.jpg"
import moment from "moment";
import { DateComponent } from "../datePicker";
import { addDoc, collection } from "firebase/firestore";
import { addEntry } from "../Slices/diaryItemSlice";
import Header from "../Header/Header-Component";
import Loader from "../Loader/loader";
const AddDiaryEntry =() =>{
    const { diaryentry } = useAppSelector((state)=>state.diaryEntry)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [state, setState] = useState({
        category: "",
        description: "",
        image:"",
        status: false,
        startDate:"",
        endDate:'' ,
        timeStamps:'',
        firebaseUser:fireauth.currentUser,
        submitted: false,
    })
    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState<File | undefined>(undefined);
    const [defImage, setdefImage] = useState(defaultimg)
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)
    const [displayImage, setdisplayImage] = useState<string | undefined>(undefined)
  const CATEGORIES = ["Food", "Laundry", "Agriculture"] ;
  type Fruit = typeof CATEGORIES[number];
  const [selected, setSelected] = useState<Fruit>(CATEGORIES[0]);
  
  const [defaultImageURL, setDefaultImageURL] = useState<string | null>(null);
  const [isSubmitting, setisSubmitting] = useState(false)

  //states for timestamp
  const [startDate,setStartDate] = useState<moment.Moment | null>(null);
  const [endDate,setEndDate] = useState<moment.Moment | null>(null);

  const SelectCategory = () => {
    return (
      <div className="w-12/12 mr-3 ">
        <CustomSelect value={selected} onChange={setSelected} options={CATEGORIES} />
      </div>
    );
  };

    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setState((prevState)=>({
            ...prevState,
            category:e.target.value
        }))
        setSelected(e.target.value)
    }

   const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  const value = event.target.value;
  setState((prevState) => ({
    ...prevState,
    description: value,
    category: selected
  }));
}

    const handleCheckboxChange = (e:any) =>{
        const isChecked = e.target.checked;
        setState(prevState =>({
          ...prevState,
          status:isChecked
        }));
      }

      const handleImageAsFile  =  async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setImageAsFile(file)
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setdisplayImage(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      };

      useEffect(() => {
        const fetchDefaultImageURL = async () => {
          const url = await uploadDefaultImage();
          setDefaultImageURL(url);
        };
        fetchDefaultImageURL();
      }, []);
      
      const uploadDefaultImage = async () => {
        const imageRef = ref(storageRef, "default/diary.jpg");
        const blob = new Blob([defaultimg], { type: "image/jpeg" });
        await uploadBytes(imageRef, blob);
        const downloadURL = await getDownloadURL(imageRef);
        return downloadURL;
      };

      const handleFireBaseUpload = async (e:any) =>{
        e.preventDefault();
        setState((prev) =>({
          ...prev,category: selected
        }))

        try{ 

          if (!imageAsFile) { 

            setisSubmitting(true)
              const docRef = await addDoc(collection(firedb, "webdiary"), {
                category: state.category,
                description: state.description,
                image: defaultImageURL,
                status: state.status,
                startDate: startDate?.format("ll"),
                endDate: endDate?.format("ll"),
                firebaseUser: fireauth.currentUser?.uid,
                timeStamps: formateDate(),
              });
              
              console.log (`${docRef.id}`);
              // dispatch(addEntry(data))
              setisSubmitting(false)
              navigate("/dash");
            
              console.log("Document written with ID: ", docRef.id );
              navigate("/dash")

          }

          else{
            const fileRef = ref(storageRef, `images/${imageAsFile.name}`);
            const uploadTask = uploadBytesResumable(fileRef, imageAsFile);            
            uploadTask.on("state_changed", (snapshot) => {
              console.log(snapshot);
              
            }, (error) => {
              console.log(error);
              
            }, async () => {
              setisSubmitting(true)
              const downloadURL = await getDownloadURL(fileRef);
              setImageAsUrl((prevObject) => ({ ...prevObject, imgUrl: downloadURL }));
              const docRef = await addDoc(collection(firedb, "webdiary"), {
                category: state.category,
                description: state.description,
                image: downloadURL,
                status: state.status,
                startDate: startDate?.format("ll"),
                endDate: endDate?.format("ll"),
                firebaseUser: fireauth.currentUser?.uid,
                timeStamps: formateDate(),
              });
              
              console.log (`${docRef.id}`);
              // dispatch(addEntry(data))
              setisSubmitting(false)
              navigate("/dash");
            });
            
          }

        }catch(e){
          console.log(e);
          
        }
 
      };

      const clearField = () =>{
        setState({
            category: "",
            description: "",
            image:'',
            status: false,
            timeStamps:'',
            startDate:'',
            endDate:'',
            firebaseUser:null,
            submitted: false,
        })
    }

   
   

    return (
        <>
        <Header/>
        <div className='new-entry'>
            {isSubmitting ? (
                 <div className="relative inset-20  ">
                  <span className="text-xl font-sans font-semibold">Sending...</span>
                  <Loader/>
               </div>
            ):(
                <div className="w-12/12 mx-3  h-full">
                 <div className='create-new'>
            <span className='create-text'>Create a new diary</span>
            <div className='close'>
              <button className="float-right w-1/2" onClick={()=> navigate("/dash")}>
              <span className='x'>X</span>
              </button>
            </div>
          </div>
          <form  className="w-full mr-2">
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
              onChange={handleDescriptionChange} 
              placeholder='Enter description here'
               className='text-area align-top border-2 border-gray-500 rounded-sm '/>
          </div>
          <div  className="w-12/12 ml- ">
          <span className='text'>Upload image(Optional)</span>
          <div className=" w-12/12 ml-1  bg-gray-50 p-10 border-2  border-gray-500 rounded-sm">
          {
            !displayImage ? ( <input
              type="file"
              onChange={handleImageAsFile}
              />):
              <div className="w-12/12 ml-1 ">
                <img src={displayImage} alt=""/>
               </div>} 
         </div>
          </div>
        

          <div className='w-full'>
            <DateComponent startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} moments={moment()}/>
          </div>          <div className='entry-status'>
            <input
             name='entryStatus'
              type="Checkbox"
               className='radio'
                checked={state.status}
                 onChange={handleCheckboxChange} />
            <span className="text-xl font-sans text-gray-900">Check to Publish as Public</span>
          </div>
          <div  className='facebook-main mx-0 my-0 '>
            <button onClick={handleFireBaseUpload}  className=' text-xl text-white'>Save</button>
            </div>
          </form>
                </div>

            )}
         
            <Footer/>
            </div>
        
        </>
      )
}
export default AddDiaryEntry