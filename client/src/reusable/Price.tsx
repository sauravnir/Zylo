import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";



export const Price = ({ amount }: { amount: number }) => {
  const {symbol, rate } = useSelector((state: RootState) => state.currency);

// Calculating the amount conversion
  const convertedAmt = (amount * rate).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <span>
      {symbol} {convertedAmt}
    </span>
  );
};