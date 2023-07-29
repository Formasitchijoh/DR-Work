import React, { useState } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from 'react-dates';
import moment from "moment";

interface Preset {
  text: string;
  start: moment.Moment;
  end: moment.Moment;
}

interface DatePresetsProps {
  moments:moment.Moment 
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  showDateFormat: string;
  initPresets: (start: moment.Moment, end: moment.Moment) => void;
}

interface DateProps {
   setInitDate: React.Dispatch<React.SetStateAction<moment.Moment | null>>
   setDateEnd:React.Dispatch<React.SetStateAction<moment.Moment | null>>
   setDateInput: React.Dispatch<React.SetStateAction<"startDate" | "endDate" | null>>
   initDate: moment.Moment | null
   dateEnd: moment.Moment | null
   dateInput: "startDate" | "endDate" | null
   moments:moment.Moment 


  }
const DatePresets: React.FC<DatePresetsProps> = (props) => {
  const { startDate, endDate, showDateFormat, initPresets, moments } = props;
  const today = moment();
  const presets: Preset[] = [
    {
      text: "Next Week",
      start: moments,
      end: moment().add(1, "week"),
    },
    {
      text: "Next Month",
      start: moments,
      end: moment().add(1, "month"),
    },
    {
      text: "Next 3 Months",
      start: moments,
      end: moment().add(3, "month"),
    },
  ];

  return (
    <div className="p-3">
      {
      presets.map(({ text, start, end }) => {
        const isChosen =
          moment(start).format(showDateFormat) ===
            moment(startDate).format(showDateFormat) &&
          moment(end).format(showDateFormat) ===
            moment(endDate).format(showDateFormat);
        return (
          <button
            key={text}
            type="button"
            className={` ${
              isChosen ? "btn-success" : "btn-danger"
            }`}
            style={{ marginRight: 12 }}
            onClick={() => initPresets(start, end)}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
};


 const DiaryEntryForm:React.FC<DateProps>=({setInitDate,setDateInput,setDateEnd,initDate,dateEnd,dateInput,moments}) => {
    const dateFormat = "DD/MM/YYYY";
   
  
    return (
      <div className=" mt-2 ml-1 pt-3 ">
        <strong className="mb-2 text-lg text-gray-500">Select Date</strong>
        <DateRangePicker
          startDate={initDate}
          startDateId="s_id"
          endDate={dateEnd}
          endDateId="e_id"
          onDatesChange={({ startDate, endDate }) => {
            setInitDate(startDate);
            setDateEnd(endDate);
          }}
          focusedInput={dateInput}
          onFocusChange={(focusedInput) => setDateInput(focusedInput)}
          displayFormat={dateFormat}
          isOutsideRange={() => false}
          withFullScreenPortal={false}
          numberOfMonths={1} // Show only one month in the calendar
          verticalHeight={200} // Reduce the height of the calendar
          renderCalendarInfo={() => (
            <DatePresets
              startDate={initDate}
              endDate={dateEnd}
              moments={moments}
              showDateFormat={dateFormat}
              initPresets={(start, end) => {
                setInitDate(start);
                setDateEnd(end);
                setDateInput(null);
              }}
            />
          )}
        />
        <div className="mt-3">
          <div>
            <strong>Start date: </strong>
            {initDate && initDate.format("ll")}
          </div>
          <div>
            <strong>End date: </strong>
            {dateEnd && dateEnd.format("ll")}
          </div>
        </div>
      </div>
    );
  }

  export default DiaryEntryForm
  
