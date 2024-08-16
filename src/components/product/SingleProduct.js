import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { CartState } from "../../context/ContextProvider";

export default function SingleProduct({ product }) {
  const {
    cartState: { cart },
    cartDispatch,
  } = CartState();

  return (
    <Card
      style={{
        width: "300px",
        height: "440px",
        backgroundColor: "#f0f0f0",
        position: "relative",
        padding: "10px",
        boxSizing: "border-box",
        marginBottom: "20px",
        overflow: 'hidden'
      }}
    >
      <Card.Img variant="top" src={product?.image} />
      <Card.Body>
        <Card.Title>{product?.name}</Card.Title>
        <Card.Text>{product?.description.slice(0, 30) + '...'}</Card.Text>
        <Card.Text style={{fontWeight: 'bold'}}>Price: BDT {product?.price}</Card.Text>
        <Card.Text style={{display:'flex', justifyContent: "space-between"}}>
          <Card.Text>Ratings: {product?.rating}</Card.Text>
          <Card.Text>{product?.instock ?'In Stock' : 'Out of Stock' }</Card.Text>
        </Card.Text>
        {cart?.some((p) => p.id === product.id) ? (
          <Button
            className="button_style"
            variant="danger"
            onClick={() => {
              cart?.some((p) => p.id === product.id);
              cartDispatch({
                type: "REMOVE_FROM_CART",
                payload: product,
              });
            }}
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
