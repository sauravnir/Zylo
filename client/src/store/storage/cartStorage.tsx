const LOCAL_KEY_ITEM = "cart"

// Loading the cart items from the localStorage
export const loadLocalCart = () => {
    try {
        const fetchData = localStorage.getItem(LOCAL_KEY_ITEM);
        if (fetchData === null) return undefined;
        return JSON.parse(fetchData);
    } catch (error) {
        console.log("Could not load cart", error)
        return undefined; 
    }
};

// Storing the cart data to localStorage
export const storeLocalCart = (state : any) => {
    try {
    const loadData = JSON.stringify(state);
    localStorage.setItem(LOCAL_KEY_ITEM , loadData);
    } catch (error) {
        console.log("Err: Type" , error);
    }
}