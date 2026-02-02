import { useState , useEffect } from "react";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";

export const Price = ({ amount }: { amount: number }) => {

  const [priceMounted , setPriceMounted] = useState(false);
  const {symbol, rate , status ,activeCurrency} = useSelector((state: RootState) => state.currency);

  // Mounting the price in the global component
  useEffect(()=> {
    const initPrice = async () => {
      await new Promise((resolve)=> setTimeout(resolve , 700))
      setPriceMounted(true);
    };
    initPrice();
  },[])

  // Calculating the amount conversion
  const convertedAmt = (amount * rate).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // If the price is not mounted then creating a small loading spinner for better ux
if (!priceMounted || status === "idle" || status==="loading") {
    return <CircularProgress size={14} color="inherit" sx={{ opacity: 0.5 }} />
  }
  return (
    <span>
     {symbol} {convertedAmt} 
    </span>
  );
};