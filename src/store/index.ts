import { configureStore, createSlice} from '@reduxjs/toolkit';
import { create } from 'domain';

//Define a slice using createSlice
const counterSlice = createSlice({
    name:'counter',
    initialState:{value:0},
    reducers: {
        increment:state => {
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1;
        }
    }
});

//create a store using configureStore
const store = configureStore({
    reducer: {
        counter : counterSlice.reducer
    }
});
export const { increment, decrement} = counterSlice.actions;
export default store;