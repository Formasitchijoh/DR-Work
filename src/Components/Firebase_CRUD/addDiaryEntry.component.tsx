import React,{useState,ChangeEvent, useEffect} from "react";
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
type Props = {};

type State = DiaryData & {
  submitted: boolean
};

const AddDiaryEntry =() =>{
    const { diaryentry } = useAppSelector((state)=>state.diaryEntry)
    const dispatch = useAppDispatch()
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
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)
    const [selectedOption, setSelectedOption] = useState<DiaryData | null>(null);
  const CATEGORIES = ["Food", "Laundry", "Agriculture"] ;
  type Fruit = typeof CATEGORIES[number];
  const [selected, setSelected] = useState<Fruit>(CATEGORIES[0]);
  
  const SelectCategory = () => {
    return (
      <>
        <div className='w-full h-10'>Value: {selected}</div>
        <CustomSelect value={selected} onChange={setSelected} options={CATEGORIES} />
      </>
    );
  };

    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setState((prevState)=>({
            ...prevState,
            category:e.target.value
        }))
        setSelected(e.target.value)
    }
    const handleDescriptionChange =(e: ChangeEvent<HTMLInputElement>) =>{
        setState((prevState) =>({
            ...prevState,description: e.target.value,category: selected
        }))

    }

  // useEffect(()=>{
  //     navigate("/dash")
  // },[state.submitted])
    const handleCheckboxChange = (e:any) =>{
        const isChecked = e.target.checked;
        setState(prevState =>({
          ...prevState,
          status:isChecked
        }));
      }
      const handleImageAsFile = (e: ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files?.[0];
        setImageAsFile(image);
      };
      const handleFireBaseUpload = (e:any) =>{
        e.preventDefault();
        setState((prev) =>({
          ...prev,category: selected
        }))

        alert(state.category)
       
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
                <>
                 <div className='create-new'>
            <span className='create-text'>Create a New diary</span>
            <div className='close'>
              <span className='x'>X</span>
            </div>
          </div>
          <form >
          <div className='category mb-8'>
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
               className='text-area'>
            </input>
          </div>
         <div>
            <input
            type="file"
            onChange={handleImageAsFile}
            />
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
          <div  className='facebook-main '>
            <button onClick={handleFireBaseUpload}  className=' text-xl text-white'>Sign in with Google</button>
            </div>
          </form>
                </>

            )}
         
            <Footer/>
            </div>
      )
}
export default AddDiaryEntry