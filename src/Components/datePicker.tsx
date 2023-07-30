

import moment from "moment";
import React, { useState } from "react";

interface Props {
  startDate:  moment.Moment | null,
  endDate: moment.Moment | null, 
  setStartDate: React.Dispatch<React.SetStateAction<moment.Moment | null>>
  setEndDate: React.Dispatch<React.SetStateAction<moment.Moment | null>>
  moments:moment.Moment 

}


export const DateComponent: React.FC<Props> = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = new Date(event.target.value);
    setStartDate(moment(newEndDate));
    
  }

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = new Date(event.target.value);
    setEndDate(moment(newEndDate));
     
         
  }

  return (
    <div className="w-full gap-5 ">
      <div className="w-full my-2">
      <span className="text-2xl font-semibold text-gray-900">Start date</span>
      <input
        type="date"
        value={startDate ? startDate.format("YYYY-MM-DD") : ""}
        onChange={handleStartDateChange}
        className="w-full h-5 rounded-sm p-5 text-xl font-bold border-2 border-gray-500"
      />
      </div>
      
      <div className="w-full mt-3">
      <span className="text-2xl  text-gray-900">End Date</span>
      <input
        type="date"
        value={endDate ? endDate.format("YYYY-MM-DD") : ""}
        onChange={handleEndDateChange}
        className="w-full h-5 rounded-sm p-5 text-xl font-bold border-2 border-gray-500"
      />
      </div>
      {/* {
        startDate && endDate ? (
          <div>
            <span>Start Date: {moment(startDate).format("DD MMMM YYYY")}</span><br/>
            <span>End Date: {moment(endDate).format("DD MMMM YYYY")}</span>
          </div>
        ) : null
      } */}
    </div>
  );
}
 
