import { createSlice, type PayloadAction  , createSelector } from "@reduxjs/toolkit";
import type { ProductCardProps } from "@/reusable/CardComponent";
import type { RootState } from "../store";

// Type casting the payload
export interface CartProps extends ProductCardProps{
  // Quantity of each product
  itemCartQuantity : number
  // Size of each product
  productSize : string;
}
export interface CartState {
    items : CartProps[],
    // total items in the cart
    totalItems : number,
    // State for cart open property
    cartOpen : boolean,
    isUploading : boolean , 
    orderNote : string,
}
// Setting the initial state null for an empty cart
const initialState: CartState = {
  items : [],
  totalItems : 0, 
  cartOpen : false,
  isUploading : false , 
  orderNote : "",
};

//createSelector is a redux library that lets us acess that data inside the redux store 
const selectCartItems = (state:RootState) => state.cart.items;
// Calculating the total checkout amount and exporting it 
export const totalCheckoutAmount = createSelector(
  [selectCartItems],  // initial value 
  (items) => items.reduce((acc , item )=> acc + (item.price * item.itemCartQuantity), 0) //logic implementation
) 

export const cartSlice = createSlice({
  name: "cart",
  // Specifying the initial state value in the slice
  initialState,
  reducers: {
    // Loading the array asynchr.. and adding to the slice
    addItem: (state, action: PayloadAction<{product : ProductCardProps ; size : string , itemQuantity : number }>) => {
    //   Destructing the payloads from the user
      const {product , size , itemQuantity} = action.payload;
        // Checking if the item is already present in the cart
      const existingItem = state.items.find((item)=>item.slug === product.slug && item.productSize === size)
        // if the items exists then increasing the product quantity else creating a new row of product an appending the props 
      if (existingItem){
        existingItem.itemCartQuantity += itemQuantity; 
        
      } else { 
        state.items.push({
        ...product , 
        itemCartQuantity:itemQuantity ,
        productSize : size
        })
        
      }
    // Increasing the global items number 
    state.totalItems += itemQuantity; 
    // Setting the global cart open state
    state.cartOpen = true ;
    },
    removeItem: (state , action : PayloadAction<{slug : string , size: string}>) => {
      // Destructuring the payloads from the user 
        const {slug , size} = action.payload;
        // Checking if the items exists in the store or not
        const existingItem = state.items.find((item)=>item.slug === slug && item.productSize === size);
        if (existingItem){
            // Reducing the item by 1 
          state.totalItems -=1 ;
          // If the items is more than 1 then removing the item  by 1  
            if (existingItem.itemCartQuantity > 1) {
                existingItem.itemCartQuantity -=1 
            } else {
              // If no items exists then removeing the whole cart
                state.items = state.items.filter((item) =>!(item.slug === slug && item.productSize === size))
              }
        }
        // Removing the OrderNote if the cart is empty and setting the totalItems value to 0 for safety 
        if(state.items.length === 0){
          state.orderNote = "";
          state.totalItems = 0;
        }

    },
    // Handling the global cart open function
    setCartOpen : (state , action :PayloadAction<boolean>)=>{
      state.cartOpen = action.payload;
    },
    setIsUploading : (state , action : PayloadAction<boolean>)=>{
      state.isUploading = action.payload ; 
    },
    // Storing the user note 
    addNote : (state , action : PayloadAction<{note :string}>) => {
      const {note} = action.payload
      state.orderNote = note 
    }
  },
});

// Creating Action Creators for each reducer actions
// Think this as the method for the reducers 
export const {addItem , removeItem , setCartOpen , setIsUploading , addNote} = cartSlice.actions
// Exporting the main reducer object from the slice
export default cartSlice.reducer