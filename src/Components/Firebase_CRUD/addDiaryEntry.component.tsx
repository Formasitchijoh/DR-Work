import React,{useState,ChangeEvent, useEffect, ChangeEventHandler} from "react";
import DiaryData from "../types/diaryentry.type";
import { storage } from "../../firebase";
import firebase from "../../firebase";
import DiaryServices from "../services/diaentry.service";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { SelectDropDown,CustomSelect } from "../SelectDropDown";
import { useAppDispatch,useAppSelector } from "../../hooks/storeHook";
import { addEntry } from "../Slices/diaryItemSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import formateDate from "../timeStamp";
import defaultImg from "../../resource/logo.png"
import defaultimage1 from "../../resource/default.jpg"
import defaultimage2 from "../../resource/diary.jpg"
import { URL } from "url";
type Props = {};

type State = DiaryData & {
  submitted: boolean
};

const AddDiaryEntry =() =>{
    const { diaryentry } = useAppSelector((state)=>state.diaryEntry)
    const navigate = useNavigate()
    const [state, setState] = useState({
        category: "",
        description: "",
        image:"",
        status: false,
        timeStamps:'',
        submitted: false,
    })
    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState<File | undefined>(undefined);
    const [defImage, setdefImage] = useState(defaultimage2)
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)
    const [displayImage, setdisplayImage] = useState<string | undefined>(undefined)
    const [selectedOption, setSelectedOption] = useState<DiaryData | null>(null);
  const CATEGORIES = ["Food", "Laundry", "Agriculture"] ;
  type Fruit = typeof CATEGORIES[number];
  const [selected, setSelected] = useState<Fruit>(CATEGORIES[0]);
  
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

      const handleImageAsFile  = (event: React.ChangeEvent<HTMLInputElement>) => {
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

      const handleFireBaseUpload = (e:any) =>{
        e.preventDefault();
        setState((prev) =>({
          ...prev,category: selected
        }))

        if (!imageAsFile) {
            // console.error(`not an image, the image file is a ${typeof (imageAsFile)}`);
            const data = {
              category:state.category,
              description:state.description,
              image: defImage,
              status:state.status,
              timeStamps:formateDate()
            }
            DiaryServices.create(data)
            .then(() =>{
              setImageAsUrl((prev) =>({...prev,imgUrl:defImage}));
              setState((prevState)=>({
                  ...prevState,submitted:true
              })) 
             

                
              console.log(`The status of the entry  ${state.status}`);
              
          })
              setImageAsUrl((prevObject)=>({...prevObject,imgUrl:defImage}))
              navigate("/dash")

          }
          
          else{
            const uploadEntry = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);
            uploadEntry.on(
                'state_changed',
                (snapShot: any) => {
                    console.log(snapShot);
                    
                },
                (err: any) =>{
                    console.log(`The error ${err}`)
                },
                () =>{
                    storage
                    .ref('images')
                    .child(imageAsFile.name)
                    .getDownloadURL()
                    .then((firebaseURL: any) =>{
                      const data = {
                        category:state.category,
                        description:state.description,
                        image: firebaseURL,
                        status:state.status,
                        timeStamps:formateDate()
                      }
                      DiaryServices.create(data)
                      .then(() =>{
                        setImageAsUrl((prev) =>({...prev,imgUrl:firebaseURL}));
                        setState((prevState)=>({
                            ...prevState,submitted:true
                        })) 
                       
    
                          
                        console.log(`The status of the entry  ${state.status}`);
                        
                    })
                        setImageAsUrl((prevObject)=>({...prevObject,imgUrl:firebaseURL}))
                        navigate("/dash")
    
                    })
                    
                    .catch((e: Error) => {
                        console.log(e);
                      });
                }
                
            );
            
          }
       
      };

      const clearField = () =>{
        setState({
            category: "",
            description: "",
            image:'',
            status: false,
            timeStamps:'',
            submitted: false,
        })
    }

   
    useEffect(()=>{
      console.log(`${typeof defaultimage1}`);
      
    })

    return (
        <div className='new-entry'>
            {state.submitted ? (
                 <div>
                 <h4>You submitted successfully!</h4>
                 <Link to="/list">
                 <button className="w-20 h-20 bg-teal-100 m-10">List</button>
                 </Link>
                 
                 <button  className="w-20 h-20 bg-teal-100 m-10"  onClick={clearField}>
                   Add
                 </button>
                 <img src={imageAsUrl.imgUrl} alt="tag" />
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
          <form  className="w-12/12 mr-2">
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
         <div className="w-12/12 ml-1  bg-gray-50 p-10 border-2 border-gray-500 rounded-sm">
         <span className='text'>Upload image(Optional)</span>
          {
            !displayImage ? ( <input
              type="file"
              onChange={handleImageAsFile}
              />):
              <div className="w-12/12 ml-1 ">
                <img src={displayImage} alt=""/>
               </div>} 
         </div>
          <div className='entry-status'>
            <input
             name='entryStatus'
              type="Checkbox"
               className='radio'
                checked={state.status}
                 onChange={handleCheckboxChange} />
            <span>Check to confirm if you want to continue</span>
          </div>
          <div  className='facebook-main mx-0 my-0 '>
            <button onClick={handleFireBaseUpload}  className=' text-xl text-white'>Save</button>
            </div>
          </form>
                </div>

            )}
         
            <Footer/>
            </div>
      )
}
export default AddDiaryEntry