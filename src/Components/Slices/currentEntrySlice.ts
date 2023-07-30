import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import DiaryData from "../types/diaryentry.type";

//interface and types define how the element will look like in this case the element of this type will be a single entry of type DiaryData Array
//every element of this type has to define just a single element diaryEntry of type DiaryData[]
export interface CurrentEntryState  {
    currententry:DiaryData | null,
    curIndex:number,
   updateStatus:boolean  
  }
  
  //The initial state isType '{ diaryentry: never[]; summit: string; }' is not assignable to type 'DiaryEntryState'.
 // Object literal may only specify known properties, and 'summit' does not exist in type 'DiaryEntryState'
  const initialState: CurrentEntryState = {
    currententry:null,
    curIndex:0,
   updateStatus:false
  };

export const currentEntrySlice = createSlice({
    name:"currentEntry",
    initialState,
    reducers : {
        selectedEntry: (state, action: PayloadAction<CurrentEntryState>) => {
            const { currententry, curIndex, updateStatus } = action.payload;
            return {
              currententry,
              curIndex,
              updateStatus
            };
          },
          resetEntry: (state) => {
              state.currententry = null
            
          }
    },
});

export const { selectedEntry,resetEntry } = currentEntrySlice.actions;
export default currentEntrySlice.reducer;