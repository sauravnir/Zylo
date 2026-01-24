import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductCardProps } from "@/reusable/CardComponent";

// Type casting the payload
export interface CartProps extends ProductCardProps{
  quantity : number
  productSize : string;
}

export interface CartState {
    items : CartProps[],
    totalItems : number
}
// Setting the initial state null for an empty cart
const initialState: CartState = {
  items : [],
  totalItems : 0 
};
export const cartSlice = createSlice({
  name: "cart",
  // Specifying the initial state value in the slice
  initialState,
  reducers: {
    // Loading the array asynchr.. and adding to the slice
    addItem: (state, action: PayloadAction<{product : ProductCardProps ; size : string}>) => {
    //   Destructing the payloads from the user
      const {product , size} = action.payload;
        // Checking if the item is already present in the cart
      const existingItem = state.items.find((item)=>item.slug === product.slug && item.productSize === size)
        // if the items exists then increasing the product quantity else createing a new row of product an appending the props 
      if (existingItem){
        existingItem.quantity += 1; 
      } else { 
        state.items.push({
        ...product , 
        quantity:1 ,
        productSize : size ,
        })
      }
    // Increasing the global items number 
    state.totalItems += 1; 
    },
    removeItem: (state , action : PayloadAction<{slug : string }>) => {
        const {slug } = action.payload;

        const existingItem = state.items.find((item)=>item.slug === slug );

        if (existingItem){
            state.totalItems -=1 ; 

            if (existingItem.quantity > 1) {
                existingItem.quantity -=1 
            } else {
                state.items = state.items.filter((item) =>!(item.slug === slug))
            }
        }
    }
  },
});


// Creating Action Creators for each reducer actions
// Think this as the method for the reducers 
export const {addItem , removeItem} = cartSlice.actions
// Exporting the main reducer object from the slice
export default cartSlice.reducer