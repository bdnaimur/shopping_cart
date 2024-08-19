import React, { createContext, useContext, useReducer, useState } from 'react';
import { faker } from '@faker-js/faker';
import { cartReducer, productReducer } from './Reducers';

// Create a context
export const AppContext = createContext();

faker.seed(30)
// Create a provider component
export const AppProvider = ({ children }) => {

  const [user, setUser] = useState(null); // User state to store both authentication and role

  const [isAuthenticated, setAuthenticated] = useState(false)
  const products = Array.from({ length: 20 }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    image: faker.image.url(),
    rating: parseFloat(faker.datatype.float({ min: 1, max: 5, precision: 0.1 })), // Generates a rating between 1 and 5
    quantity: faker.datatype.number({ min: 1, max: 100 }),
    fastDelivery: faker.datatype.boolean(),
    instock: faker.datatype.boolean(),
    numOfItem: 0
  }));

  
  const login = (role) => {
    setUser({ role }); 
    setAuthenticated(true)
  };
  
  const logout = () => {
    setUser(null); 
    setAuthenticated(false)
  };
  
  
  const [productState, productDispatch] = useReducer(productReducer, {
    sortByPrice: null,
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });
  
  // const applyFilters = (products) => {
  //   return products.filter((product) => {
  //     if (productState.byStock && !product.inStock) return false;
  //     if (productState.byFastDelivery && !product.fastDelivery) return false;
  //     if (productState.byRating && product.rating < productState.byRating) return false;
  //     if (productState.searchQuery && !product.name.toLowerCase().includes(productState.searchQuery.toLowerCase())) return false;
  //     return true;
  //   });
  // };
  
  // const filteredProducts = applyFilters(products);
  
  const [cartState, cartDispatch] = useReducer(cartReducer, {products, cart: [] });


  // console.log("productState", productState, "filteredProducts", filteredProducts);
  
  return (
    <AppContext.Provider value={{ isAuthenticated, user, productState, productDispatch, login, logout, cartState, cartDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const CartState = () => {
  return useContext(AppContext);
};
