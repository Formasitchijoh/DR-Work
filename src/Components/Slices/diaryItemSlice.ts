import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import DiaryData from "../types/diaryentry.type";
import { title } from "process";

//interface and types define how the element will look like in this case the element of this type will be a single entry of type DiaryData Array
//every element of this type has to define just a single element diaryEntry of type DiaryData[]
export interface DiaryEntryState {
    diaryentry: DiaryData[];
  }
  
  //The initial state isType '{ diaryentry: never[]; summit: string; }' is not assignable to type 'DiaryEntryState'.
 // Object literal may only specify known properties, and 'summit' does not exist in type 'DiaryEntryState'
  const initialState: DiaryEntryState = {
    diaryentry: [],
  };

export const diaryEntrySlice = createSlice({
    name:"diaryEntry",
    initialState,
    reducers : {
        addEntry : (state, action: PayloadAction<DiaryData[]>) =>{
                state.diaryentry = action.payload;                
        },
        updatentry:(state,action) =>{
          const { key, status } = action.payload
          const existingentry = state.diaryentry.find(entry => entry.key === key)
          if(existingentry){
            existingentry.status = status
          }

          alert(`the status is currently ${status}`)
        }
        
    },
});

export const { addEntry,updatentry } = diaryEntrySlice.actions;
export default diaryEntrySlice.reducer;