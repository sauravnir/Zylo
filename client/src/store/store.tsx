import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./slices/cartSlice" 
import currencyReducer from "./slices/currencySlice"
import {loadLocalCart , storeLocalCart} from "./storage/cartStorage"

// Pre-storing the localStorage data inside the store / Persisted State storage
const preCartData = loadLocalCart();
// Creating a global store
export const store  = configureStore({
    reducer : {
        // The counter comes from the counterSlice comp 
        cart : cartReducer,
        currency : currencyReducer
     },
    //  Hydrating the data inside the Cart Slice
     preloadedState : {
        cart : preCartData
     },
});

// Saving the changes to the localStorage whenever the cart changes 
store.subscribe(()=>{
    storeLocalCart({
        items: store.getState().cart.items, 
        totalItems : store.getState().cart.totalItems,
        orderNote : store.getState().cart.orderNote
    })
})

// Creating default types from the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch