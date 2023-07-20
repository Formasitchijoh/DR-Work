import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import DiaryData from "../types/diaryentry.type";
export interface DiaryEntryState {
    diaryentry: DiaryData[];
  }
  
  const initialState: DiaryEntryState = {
    diaryentry: [],
  };

export const diaryEntrySlice = createSlice({
    name:"diaryEntry",
    initialState,
    reducers : {
        addEntry : (state, action: PayloadAction<DiaryData[]>) =>{
            alert("I am in");
                state.diaryentry = action.payload;
                console.log(`${JSON.stringify(state.diaryentry)}`);
                console.log(`${(state.diaryentry)}`);

                
        },
        
    },
});

export const { addEntry } = diaryEntrySlice.actions;
export default diaryEntrySlice.reducer;