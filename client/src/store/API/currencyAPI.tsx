// export const CURRENCY_API_KEY = "952dee586ab766b8fc325c22";
export const CURRENCY_URL = "https://open.er-api.com/v6/latest/";
export const BASE_CODE = "NPR";
export const BASE_SYMBOL = "Rs";
export const BASE_RATE = 1;
export const BASE_NAME = "Nepal";


// Fetching live rates from the API
export const fetchCurrencyRates = async () => {
  try {
    const apidata = await fetch(
      CURRENCY_URL+ BASE_CODE,
    );
    if (!apidata.ok) throw new Error("Bad Response");
    const data = await apidata.json();
    return data.rates;
  } catch (error) {
    console.log("Currency Fetch Error:", error);
    return null;
  }
};
