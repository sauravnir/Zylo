import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./slices/cartSlice"
// Creating a global store
export const store  = configureStore({
    reducer : {
        // The counter comes from the counterSlice comp 
        cart : cartReducer,
     }
})

// Creating default types from the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch