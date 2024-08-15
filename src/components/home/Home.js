import React, { useContext } from "react";
import { AppContext } from "../../context/ContextProvider";
import SingleProduct from "../product/SingleProduct";
import "../product/style.css";
import Filters from "../Filter";

export default function Home() {

  const { cartState } = useContext(AppContext);

  const {
    productState: 
   { byStock,
    byFastDelivery,
    byRating,
    searchQuery,}
  } = useContext(AppContext);

  console.log("cartState?.filteredProducts", cartState?.products, byStock,
    byFastDelivery,
    byRating,
    searchQuery,);

  const transformProducts = () => {
    let products = cartState?.products || [];
    if (byStock) {
      products = products.filter((product) => product.inStock);
    }
    if (byFastDelivery) {
      products = products.filter((product) => product.fastDelivery);
    }
    if (byRating) {
      products = products.filter((product) => product.rating >= byRating);
    }
    if (searchQuery){
      products = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    } 
    
    return products;
  };
  console.log("transformProducts", transformProducts());
  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((product) => {
          return <SingleProduct key={product?.id} product={product} />;
        })}
      </div>
    </div>
  );
}
