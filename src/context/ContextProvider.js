import React, { createContext, useContext, useReducer, useState } from 'react';
import { faker } from '@faker-js/faker';
import { cartReducer, productReducer } from './Reducers';

// Create a context
export const AppContext = createContext();

faker.seed(30)
// Create a provider component
export const AppProvider = ({ children }) => {

  const [user, setUser] = useState(null); // User state to store both authentication and role


  const products = Array.from({ length: 20 }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    image: faker.image.url(),
    rating: parseFloat(faker.datatype.float({ min: 1, max: 5, precision: 0.1 })), // Generates a rating between 1 and 5
    quantity: faker.datatype.number({ min: 1, max: 100 }),
    fastDelivery: faker.datatype.boolean(),
  }));

  const [cartState, cartDispatch] = useReducer(cartReducer, {products, cart: [] });

  const login = (role) => {
    setUser({ role }); 
  };

  const logout = () => {
    setUser(null); 
  };


  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });


  return (
    <AppContext.Provider value={{  user, productState, productDispatch, login, logout, cartState, cartDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const CartState = () => {
  return useContext(AppContext);
};
