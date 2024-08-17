import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CartState } from "../../context/ContextProvider";
import { Dropdown } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate()
  const {
    cartState: { cart },
    cartDispatch,
  } = CartState();
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.numOfItem,
    0
  );

  const handleItemSelect = (eventKey, prodId) => {
    cartDispatch({
      type: "ADD_TO_CART",
      payload: { prodId, numOfItem: eventKey },
    });
  };

  return (
    <div className="cart-style">
      <h2 style={{textAlign: "center"}}>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <Card className="mb-2" key={item.id}>
              <Card.Body>
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}
                >
                   <img
                      width={100}
                      height={100}
                      src={item.image}
                      className="cartItemImg"
                      alt={item.name}
                    />
                    <div>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text> Price: ${item.price} </Card.Text>
                    </div>
                  <Card.Text>
                    <div style={{ display: "flex", marginRight: "10px" }}>
                      <span>Num of Items: {item.numOfItem}</span>

                      <Dropdown
                        onSelect={(eventKey) =>
                          handleItemSelect(eventKey, item?.id)
                        }
                        style={{ marginLeft: "5px" }}
                      >
                        <Dropdown.Toggle
                          variant="secondary"
                          id="dropdown-basic"
                        ></Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="1">1</Dropdown.Item>
                          <Dropdown.Item eventKey="2">2</Dropdown.Item>
                          <Dropdown.Item eventKey="4">4</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </Card.Text>
                  <AiFillDelete
                    fontSize="20px"
                    style={{ cursor: "pointer", color:"#565656" }}
                    onClick={() =>
                      cartDispatch({
                        type: "REMOVE_FROM_CART",
                        payload: item,
                      })
                    }
                  />
                </div>
              </Card.Body>
            </Card>
          ))}
          <div style={{display:"flex", justifyContent: 'space-between'}}>
          <h3>Total: ${totalPrice}</h3>
          <Button onClick={()=>navigate("/checkout")} variant="success">Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
