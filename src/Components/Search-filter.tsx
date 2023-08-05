import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { CiFilter } from 'react-icons/ci';
import DiaryData from './types/diaryentry.type';
import DiaryEntry from './DiaryEntry/DiaryEntry';
import { CustomSelect } from '../Components/SelectDropDown';
import { DateComponent } from './datePicker';
import moment from 'moment';

interface Props {
  diaryEntry: DiaryData[];
  setdisplayAll: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveDiaryEntry: (diaryEntry: DiaryData, index: number) => void,
 index: number,
 setisDelete: React.Dispatch<React.SetStateAction<boolean>>,
 setActiveEntry: (diaryEntry: DiaryData, index: number) => void
}

const SearchFilter: React.FC<Props> = ({ diaryEntry, setdisplayAll,setActiveDiaryEntry,setActiveEntry,index,setisDelete }) => {

  const CATEGORIES = ['Food', 'Laundry', 'Agriculture', 'Many'];
  type Fruit = typeof CATEGORIES[number];
  const [selected, setselected] = useState<Fruit>(CATEGORIES[0]);
  const [isSelect, setisSelect] = useState(false);
  const [isDatedisplay, setisDatedisplay] = useState(false);
  const [state, setstate] = useState({
    query: '',
    list: [] as DiaryData[],
  });

  const [startDate, setStartDate] = useState<moment.Moment | null>(null);
  const [endDate, setEndDate] = useState<moment.Moment | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setdisplayAll(true);
    const results = diaryEntry.filter((entry) => {
      if (e.target.value === '') return entry;
      return entry.description.toLowerCase().includes(e.target.value.toLocaleLowerCase());
    });

    setstate({
      query: e.target.value,
      list: results,
    });
  };

  const handleDateSelect = useCallback(() => { 
    setisSelect(true)
    setdisplayAll(true);
    alert("hoala")
    if (startDate && endDate) {
      const results = diaryEntry.filter((entry) => {
        const selectedStartDate = moment(entry.startDate, 'll');
        return selectedStartDate.isBetween(startDate, endDate, 'day', '[]');
      });

      alert(JSON.stringify(results))
      setisDatedisplay(true);
      setstate({
        query: '',
        list: results,
      });
      setisSelect(false)
    }   }, [diaryEntry, setdisplayAll, endDate, startDate]);


  const handleIsSelect = (option:any) => {
    setdisplayAll(true);
    setselected(option);
    const results = diaryEntry.filter((entry) => {
      if (option) {
        return entry.category.toLowerCase() === option.toLowerCase();
      }
      return entry;
    });
    setisSelect(false);
    setstate({
      query: option,
      list: results,
    });
  };
  // sm:absolute xl:max-w-sm  justify-center items-center pl-5 sm:inset-10 w-3/4 ml-12 h-full bg-gray-100
    const SelectedCategory = () =>{
      return(
        <div className='fixed flex-col justify-center items-center inset-0 z-50  w-screen h-screen mb-10 mt-5'> 
        <div className='bg-purple-100 xl:w-1/4 w-3/5 mx-auto  p-10 h-full flex-col justify-center items-center xl:mr-10 mr-2 '>
        {/* <h1 className='text-3xl mb-5 mt-10 w-full font-bold bg-gray-950 h-20 text-white  items-center'>Filter </h1> */}
        < div className=''> 
        <h1 className='text-2xl text-gray-900 my-5 mt-10 font-bold'>Filter your diary entries</h1>
        <div className='w-full p-1'>
        <div className='w-full mb-5'>
          <span className='text-2xl  text-gray-900'>Category</span>
        <CustomSelect  value={selected} onChange={handleIsSelect} options={CATEGORIES}  />
        </div>
          <div className='w-full '>
            <DateComponent startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} moments={moment()}/>
          </div>
          <div  className='facebook-main w-3/4  mx-0  ml-5 my-10'>
            <button onClick={handleDateSelect} className=' text-xl text-white justify-center items-center '>filter</button>
            </div>
        </div>
        </div>


        </div>
           
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
       
        <div className='border-b-2 w-full border-gray-500 block items-center  mx-5  justify-center'>
          <button onClick={()=> setisSelect(true)} ><CiFilter className=' block items-center  mx-5 text-xl justify-center'/></button>
        </div>
    </div>
        <ul>
            {
                (state.query === 'No posts match the query' ? "":state.list.map(entry=>{
                    return <li key={entry.key}>
                      <DiaryEntry entry={entry} setActiveDiaryEntry={setActiveDiaryEntry} index={index} setisDelete={setisDelete} setActiveEntry={setActiveEntry}/>
                    </li>
                }))
            }
        </ul>

        {isSelect && <SelectedCategory/>}
    </div>
    
  )
}

export default SearchFilter