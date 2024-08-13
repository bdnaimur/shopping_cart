import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ style }) => {

    const [rating, setRating] = useState(0)
    const handleClick= (i) => {
        // productDispatch({
        //   type: "FILTER_BY_RATING",
        //   payload: i + 1,
        // })
        setRating(i+1)
    }
    console.log("rating", rating);
    
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <span value={i} key={i} onClick={() => handleClick(i)} style={style}>
          {rating > i ? (
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