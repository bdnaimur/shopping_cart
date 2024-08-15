import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { CartState } from "../context/ContextProvider";

const Rating = ({ style }) => {
  const {productDispatch, productState: {byRating}} = CartState()
    const handleClick= (i) => {
        productDispatch({
          type: "FILTER_BY_RATING",
          payload: i + 1,
        })
    }
    
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <span value={i} key={i} onClick={() => handleClick(i)} style={style}>
          {byRating > i ? (
            <AiFillStar fontSize="15px" />
          ) : (
            <AiOutlineStar isFilled={true} fontSize="15px" />
          )}
        </span>
      ))}
    </>
  );
};

export default Rating;