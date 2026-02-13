import { createSlice , createAsyncThunk ,type PayloadAction} from "@reduxjs/toolkit"
import  { BASE_RATE , BASE_SYMBOL  , BASE_CODE , BASE_NAME , fetchCurrencyRates } from "../API/currencyAPI";


// Creating the local storage key
const LOCAL_CURRENCY = 'currency'

// Loading the initial localStorage item and setting in the default state
const getStorageCurrency = () => {
    if (typeof window === "undefined") return null;
    const savedCurrency = localStorage.getItem(LOCAL_CURRENCY);
    if (!savedCurrency) return null;
    try {
        const decodedString = decodeURIComponent(atob(savedCurrency));
        return JSON.parse(decodedString);
    } catch (error) {
        console.error("Error restoration currency from storage:", error);
        return null;
    }
}
const storageCurrency = getStorageCurrency(); 

// Typecasting based on the Currency Object in NAVBAR
interface CurrencyItem{
    title: string,
    code :string, 
    symbol :string,
    
}
// Creating the currency types
interface CurrencyState {
    currencyName : string ,
    activeCurrency : string ,
    symbol : string , 
    rate : number , 
    allRates : Record <string , number> ,
    status : "idle" | 'loading' | 'fulfilled' | 'failed',
}
// Setting the initial state value
const initialState : CurrencyState = {
    currencyName : storageCurrency?.title || BASE_NAME,
    activeCurrency : storageCurrency?.code || BASE_CODE,
    symbol : storageCurrency?.symbol || BASE_SYMBOL ,
    rate :storageCurrency?.rate || BASE_RATE,
    allRates : {},
    status:'idle', 
}


// Creating an AsyncThunk method that handles the API. It uses createAsyncThunk logic
//When creating a thunk, it automatically creates three states : Pending , Fulfilled and Rejected
// We need to handle these states separately inside the extraReducers inside the slice
export const fetchLiveRates = createAsyncThunk('fetchLiveRates', async ()=>{
    const liveRates = await fetchCurrencyRates();
    return liveRates ;
})


// Creating a Currency Slice 
export const currencySlice = createSlice({
    name : "currency",
    initialState ,
    reducers : {
        // Setting the currency by reading the user action from the navbar 
        setCurrency : (state , action : PayloadAction<CurrencyItem>)=>{
            const {title , code , symbol} = action.payload;
            const upperCaseCode = code.toUpperCase()
            // Setting the activeCurrency
            state.activeCurrency = upperCaseCode; 
            state.symbol = symbol;
            state.currencyName = title ; 
            // Checking if the selected currency is present in our api or not 
            if (state.allRates[upperCaseCode]){
                state.rate = state.allRates[upperCaseCode]; 
            } else {
                state.rate = upperCaseCode ===  BASE_CODE ? BASE_RATE : state.rate ;
            }
            // Saving the data to LocalStorage after the user selects
            const jsonString = JSON.stringify(action.payload)
            const encoded = btoa(encodeURIComponent(jsonString))
            localStorage.setItem(LOCAL_CURRENCY, encoded)
        } 
    },
    // Handling the pending , fulfilled and rejected states from the creatAsyncThunk
    extraReducers : (builder) => {
        builder.addCase(fetchLiveRates.pending , (state)=>{
            state.status = "loading";
        })
        // Fetching the data from the API on fulfilled status
        .addCase(fetchLiveRates.fulfilled , (state , action)=>{
            state.status = "fulfilled";
            // Populating the allRates states from the API data 
            // i.e liveRates is getting append in this array;
            state.allRates = action.payload
            // Updating the base rate for multiplier
            if (action.payload && action.payload[state.activeCurrency]){
                state.rate = action.payload[state.activeCurrency];
            }
        })
        // If the fetch gets rejected. 
        .addCase(fetchLiveRates.rejected , (state)=>{
            state.status = "failed";
        })
    }
})


export const {setCurrency } = currencySlice.actions
export default currencySlice.reducer