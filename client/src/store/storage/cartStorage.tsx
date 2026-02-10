const LOCAL_KEY_ITEM = "cart"

// Loading the cart items from the localStorage
export const loadLocalCart = () => {
    try {
        const fetchData = localStorage.getItem(LOCAL_KEY_ITEM);
        if (fetchData === null) return undefined;
        const decodedData = JSON.parse(atob(fetchData))
        return decodedData;
    } catch (error) {
        console.log("Could not load cart", error)
        return undefined; 
    }
};

// Storing the cart data to localStorage
export const storeLocalCart = (state : any) => {
    try {
    const loadData = JSON.stringify(state);
    const encodedData = btoa(loadData)
    localStorage.setItem(LOCAL_KEY_ITEM , encodedData); //Base64 encrypting the cart items
    } catch (error) {
        console.log("Err: Type" , error);
    }
}