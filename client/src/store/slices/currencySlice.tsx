import { createSlice } from "@reduxjs/toolkit";

interface CurrencyProps{
    current : {code : string , symbol : string , rate :number},
    allRates : Record <string, number>,
    
}