import React, { createContext, useReducer, useContext, useEffect } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Get initial cart state from localStorage
const getInitialCartState = () => {
  try {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

const reducer = (state, action) => {
    let newState;
    switch(action.type){
        case "ADD":
            newState = [...state, {id:action.id, name:action.name, qty:action.qty, size:action.size, price:action.price, img:action.img}];
            break;
        case "REMOVE":
            newState = state.filter((item, idx) => idx !== action.index);
            break;
        case "DROP":
            newState = [];
            break;
        case "CLEAR_CART":
            newState = [];
            break;
        default:
            console.log("Error in Reducer");
            return state;
    }
    
    // Save to localStorage if user is authenticated
    try {
        const authToken = localStorage.getItem("authToken");
        if (authToken) {
            localStorage.setItem("cart", JSON.stringify(newState));
        } else {
            localStorage.removeItem("cart");
        }
    } catch (error) {
        console.error("Error saving cart to localStorage:", error);
    }
    
    return newState;
}

export const CartProvider = ({children}) => {
   const [state, dispatch] = useReducer(reducer, getInitialCartState());
   
   // Clear cart when authToken changes (login/logout)
   useEffect(() => {
     const handleStorageChange = () => {
       const authToken = localStorage.getItem("authToken");
       if (!authToken) {
         dispatch({ type: "CLEAR_CART" });
       }
     };
     
     window.addEventListener('storage', handleStorageChange);
     return () => window.removeEventListener('storage', handleStorageChange);
   }, []);
   
   return(
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider> 
    </CartDispatchContext.Provider>
   )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);