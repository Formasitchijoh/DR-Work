import React,{ChangeEvent, useEffect, useState} from 'react'
import {BiSearch} from 'react-icons/bi'
import { CiFilter } from 'react-icons/ci'
import DiaryData from './types/diaryentry.type'
import DiaryEntry from './DiaryEntry/DiaryEntry'
import { CustomSelect } from ".././Components/SelectDropDown";

type Post={
    url:string,
    tags:string[],
    title:string
} 


interface Props {
  diaryEntry: DiaryData[],
  displayAll: React.Dispatch<React.SetStateAction<boolean>>

}

const SearchFilter : React.FC<Props> = ({ diaryEntry,displayAll }) => {
  console.log("i am in the select category" + JSON.stringify(diaryEntry));
  const CATEGORIES = ["Food","Laundry","Agriculture","Many"];
  type Fruit = typeof CATEGORIES[number];
 const [selected, setselected] = useState<Fruit>(CATEGORIES[0])
 const [isSelect, setisSelect] = useState(false)
    const [state, setstate] = useState({
        query:'',
        list:[] as DiaryData[]
    })

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
        < div className='absolute z-50 right-5 top-10 w-1/2 h-10 '>
        <div className=" ">Value:{selected}</div>
        <CustomSelect value={selected} onChange={handleIsSelect} options={CATEGORIES}  />
        </div>
      )
    }
  return (
    <>
    {/* {
      state.list[0].category && <h2>{state.list[0].category}</h2>
    } */}
    <div className='w-full flex justify-evenly items-center'>
        <form className='flex justify-between items-center border-b-2 border-gray-500'>
            <input
             type='search'
              placeholder='Type here to search' 
              value={state.query}
              onChange={handleChange}
              className='text-gray-900 focus:outline-none focus:border-none font-sans font-bold'/>
            <button className='text-2xl font-bold'><BiSearch/></button>
        </form>
       
        <div className='border-b-2 border-gray-500'>
          <button onClick={()=> setisSelect(true)} ><CiFilter/></button>
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
    </>
    
  )
}

export default SearchFilter