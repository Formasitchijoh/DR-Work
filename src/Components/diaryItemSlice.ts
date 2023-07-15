import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DiaryItem } from ".././Models/DiaryItem"

export interface DiaryEntryState {
    DiaryEntry:null | DiaryItem;
}

const initialState: DiaryEntryState = {
    DiaryEntry: null,
}

export const diaryEntrySlice = createSlice({
    name:"diaryEntry",
    initialState,
    reducers : {
        addEntry : (state, action: PayloadAction<DiaryItem>) =>{
                state.DiaryEntry = action.payload;
        },
    },
});

export const { addEntry } = diaryEntrySlice.actions;
export default diaryEntrySlice.reducer;