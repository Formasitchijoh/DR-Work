import { configureStore, createSlice} from '@reduxjs/toolkit';
import { useReducer } from 'react';
import authSlice from './Components/authSlice';
import diaryItemSlice from './Components/diaryItemSlice';

export const store = configureStore({
    reducer:{
        auth:authSlice,
        diaryEntry:diaryItemSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


//The redux store is similar to React context and react useReducerTh
//The use Reducer takes in a state and a reducer and returns the initial state and ta dispatch function thet is used to update the state of the initial state

//Here the configure store takes in the reducer and the initial state and returns a dispatch function and the current state to the store function


// const counterSlice = createSlice({
//     name:'counter',
//     initialState:{value:0},
//     reducers: {
//         increment:state => {
//             state.value += 1;
//         },
//         decrement: state => {
//             state.value -= 1;
//         }
//     }
// });

// //create a store using configureStore
// const store = configureStore({
//     reducer: {
//         counter : counterSlice.reducer
//     }
// });
// export const { increment, decrement} = counterSlice.actions;
// export default store;