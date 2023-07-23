import React,{ChangeEvent, useEffect, useState,useCallback} from 'react'
import {BiSearch} from 'react-icons/bi'
import { CiFilter } from 'react-icons/ci'
import DiaryData from './types/diaryentry.type'
import DiaryEntry from './DiaryEntry/DiaryEntry'
import { CustomSelect } from ".././Components/SelectDropDown";
import { useAppSelector } from '../hooks/storeHook'
import DiaryEntryForm from './datePicker'
import moment from 'moment'
type Post={
    url:string,
    tags:string[],
    title:string
} 


interface Props {
  diaryEntry: DiaryData[],
  displayAll: React.Dispatch<React.SetStateAction<boolean>>

}
type handles = {
 startDate:moment.Moment | null,
  endDate: moment.Moment | null
}

const SearchFilter : React.FC<Props> = ({ diaryEntry,displayAll }) => {
 
  const { diaryentry } = useAppSelector(state=>state.diaryEntry)
  
  console.log("i am in the select category" + JSON.stringify(diaryEntry));
  const CATEGORIES = ["Food","Laundry","Agriculture","Many"];
  type Fruit = typeof CATEGORIES[number];
 const [selected, setselected] = useState<Fruit>(CATEGORIES[0])
 const [isSelect, setisSelect] = useState(false)
 const [isDatedisplay, setisDatedisplay] = useState(false)
    const [state, setstate] = useState({
        query:'',
        list:[] as DiaryData[]
    })

    const [initDate, setInitDate] = useState<moment.Moment | null>(null);
    const [dateEnd, setDateEnd] = useState<moment.Moment | null>(null);
    const [dateInput, setDateInput] = useState<"startDate" | "endDate" | null>(null);
    
    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
     displayAll(false)
        const results = diaryEntry.filter(entry=>{
            if(e.target.value === "") return entry
            return entry.description.toLowerCase().includes(e.target.value.toLocaleLowerCase())
        }) 
        
        setstate({
            query: e.target.value,
            list: results

        })
    }
    
   
    const handleDateSelect = useCallback(() => {
      displayAll(false);
    
      if (initDate && dateEnd) {
        const results = diaryEntry.filter((entry) => {
          const startDate = moment(entry.startDate, "ll");
          return startDate.isBetween(initDate, dateEnd, "day", "[]");
        });
    
        setisDatedisplay(true);
        setstate({
          query: "",
          list: results,
        });
      }
    }, [diaryEntry, initDate, dateEnd]);

    useEffect(()=>{
    if(initDate && dateEnd){
      handleDateSelect()
    }
    })
    const handleIsSelect = (option:string = CATEGORIES[0]) =>{
     displayAll(false)
      setselected(option)
      const results = diaryEntry.filter(entry=>{
        if(!option) return entry
        return entry.category.toLowerCase() === option.toLowerCase()
      })
      setisSelect(false)
      setstate({
        query:option,
        list:results
      })
    }

    const SelectedCategory = () =>{
      return(
        < div className='absolute top-10 left-1/2 w-1/4 h-1/2 bg-gray-100 '> 
          <div className='mb-5'>
       <DiaryEntryForm setDateEnd={setDateEnd} setInitDate={setInitDate} setDateInput={setDateInput} dateEnd={dateEnd} initDate={initDate} dateInput={dateInput} moments={moment()}/> 
          </div>
        <CustomSelect  value={selected} onChange={handleIsSelect} options={CATEGORIES}  />
        </div>
      )
    }
  return (
    <div className='mb-5' >
    <div className='w-full flex justify-around items-center'>
        <form className='flex  items-center border-b-2 border-gray-500 w-11/12 ml-5'>
            <input
             type='search'
              placeholder='Type here to search' 
              value={state.query}
              onChange={handleChange}
              className='text-gray-900 focus:outline-none focus:border-none font-sans font-bold'/>
            <button className='text-2xl font-bold'><BiSearch/></button>
        </form>
       
        <div className='border-b-2 border-gray-500 block items-center w-1/4 mx-5  justify-center'>
          <button onClick={()=> setisSelect(true)} ><CiFilter className=' block items-center  mx-5 text-xl justify-center'/></button>
        </div>
    </div>
        <ul>
            {
                (state.query === 'No posts match the query' ? "":state.list.map(entry=>{
                    return <li key={entry.key}>
                      <DiaryEntry diaryEntry={entry}/>
                    </li>
                }))
            }
        </ul>

        {isSelect && <SelectedCategory/>}
    </div>
    
  )
}

export default SearchFilter