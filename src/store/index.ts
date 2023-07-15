import { configureStore, createSlice} from '@reduxjs/toolkit';
import { useReducer } from 'react';



export const store = configureStore({
    reducer:{},
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;


//The redux store is similar to React context and react useReducerTh
//The use Reducer takes in a state and a reducer and returns the initial state and ta dispatch function thet is used to update the state of the initial state

//Here the configure store takes in the reducer and the initial state and returns a dispatch function and the current state to the store function
