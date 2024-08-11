import React, { createContext, useReducer, useState } from 'react';
import { faker } from '@faker-js/faker';
import { cartReducer } from './Reducers';

// Create a context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // User state to store both authentication and role


  const products = Array.from({ length: 30 }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    image: faker.image.url(),
    rating: parseFloat(faker.datatype.float({ min: 1, max: 5, precision: 0.1 })), // Generates a rating between 1 and 5
    quantity: faker.datatype.number({ min: 1, max: 100 }),
    fastDelivery: faker.datatype.boolean(),
  }));

  const [state, dispatch] = useReducer(cartReducer, {products, cart: [] });


  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
  };

  const login = (role) => {
    setUser({ role }); // Set the user's role (user or admin)
  };

  const logout = () => {
    setUser(null); // Clear the user state
  };

  return (
    <AppContext.Provider value={{ cart, user, addToCart, removeFromCart, login, logout, state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
