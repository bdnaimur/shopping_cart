import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { CartState } from "../../context/ContextProvider";

export default function SingleProduct({ product }) {
  const {
    cartState: { cart },
    handleCartClick,
    cartDispatch,
  } = CartState();

  return (
    <Card
      style={{
        width: "300px",
        height: "400px",
        backgroundColor: "#f0f0f0",
        position: "relative",
        padding: "10px",
        boxSizing: "border-box",
        marginBottom: "20px",
      }}
    >
      <Card.Img variant="top" src={product?.image} />
      <Card.Body>
        <Card.Title>{product?.name}</Card.Title>
        <Card.Text>{product?.description}</Card.Text>
        {/* <Button
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "10px",
            cursor: "pointer",
            color: "white",
            fontWeight: "bold",
          }}
          variant={isSelected ? `warning` : `primary`}
          onClick={() =>{
             handleCartClick(product)
             setIsselected(!isSelected)
            }}
        >
          {isSelected ? "Remove from Cart" : "Add To Cart"}
        </Button> */}
        {cart?.some((p) => p.id === product.id) ? (
          <Button
            className="button_style"
            variant="danger"
            onClick={() =>{
              cart?.some((p) => p.id === product.id) 
              cartDispatch({
                type: "REMOVE_FROM_CART",
                payload: product,
              })
            }
            }
          >
            Remove from Cart
          </Button>
        ) : (
          <Button
            className="button_style"
            onClick={() =>
              cartDispatch({
                type: "ADD_TO_CART",
                payload: product,
              })
            }
          >
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
