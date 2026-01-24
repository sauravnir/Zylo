import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


// Defininf state
export interface CounterState {
    value : number 
}  

// Redux requires initial State 
const initialState : CounterState={
    value:0,
}

export const counterSlice = createSlice({
    name: 'counter',
    
    initialState, 
    
    reducers:{
        // It is an increment function 
        increment:(x)=>{
            x.value +=1
        },
        decrement : (y)=>{
            y.value -= 1; 
        },
        // PayloadAction is safeguarding the data type 
         incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    }
})

// We should generate action creators for each reducer func
export const {increment , decrement, incrementByAmount} = counterSlice.actions
export default counterSlice.reducer