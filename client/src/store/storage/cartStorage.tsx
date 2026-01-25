const CART = "cart"

// Loading the cart items from the localStorage
export const loadLocalCart = () => {
    try {
        const fetchData = localStorage.getItem(CART);
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
    localStorage.setItem(CART , loadData);
    } catch (error) {
        
    }
}