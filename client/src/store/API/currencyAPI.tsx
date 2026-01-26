// Storing the API for live currency from https://app.exchangerate-api.com/dashboard
export const CURRENCY_API_KEY = "952dee586ab766b8fc325c22";
export const CURRENCY_URL = "https://v6.exchangerate-api.com/v6/";
export const BASE_CODE = "NPR";
export const BASE_SYMBOL = "Rs";
export const BASE_RATE = 1;
export const BASE_NAME = "Nepal";

// Fetching live rates from the API
export const fetchCurrencyRates = async () => {
  try {
    const apidata = await fetch(
      CURRENCY_URL + CURRENCY_API_KEY + "/latest/" + BASE_CODE,
    );
    if (!apidata.ok) throw new Error("Bad Response");
    const data = await apidata.json();
    return data.conversion_rates;
  } catch (error) {
    console.log("Currency Fetch Error:", error);
    return null;
  }
};
