import React from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  DropdownButton,
  FormControl,
  Navbar,
} from "react-bootstrap";

import { FaCartArrowDown } from "react-icons/fa6";
import { CartState } from "../../context/ContextProvider";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
export default function Header() {
  const {cartState: {cart}, cartDispatch} = CartState()
  console.log("cart from header", cart);
  
  const handleSelect = (eventKey) => {
    // alert(`Selected option: ${eventKey}`);
  };

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80, position: 'fixed', width: '100%', top:0, zIndex:1 }}>
      <Container>
        <Navbar.Brand style={{cursor:"pointer"}} Link="/home">Shopping Cart</Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            type="search"
            placeholder="Search"
          />
        </Navbar.Text>
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <FaCartArrowDown />
            <Badge bg="transparent" style={{ color: 'white' }}>{cart?.length}</Badge>
          </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
                    <span className="cartitem" key={prod.id}>
                      <img
                      width={50}
                      height={50}
                        src={prod.image}
                        className="cartItemImg"
                        alt={prod.name}
                      />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        <span>BDT {prod.price}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          cartDispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
            </Dropdown.Menu>
        </Dropdown>
      </Container>
      {/* <Container> */}
      {/* <Navbar.Brand href="#home">Home</Navbar.Brand> */}
      {/* </Container> */}
    </Navbar>
  );
}
