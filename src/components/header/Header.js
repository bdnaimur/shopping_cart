import React from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  DropdownButton,
  FormControl,
  Image,
  Nav,
  Navbar,
} from "react-bootstrap";

// import logo from './shopping_logo.jpg';

import { FaCartArrowDown } from "react-icons/fa6";
import { CartState } from "../../context/ContextProvider";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
export default function Header() {
  const {
    cartState: { cart },
    cartDispatch,
    isAuthenticated,
    logout,
    productDispatch,
  } = CartState();
  
  const handleSelect = (eventKey) => {
    // alert(`Selected option: ${eventKey}`);
  };

  const handleItemSelect = (eventKey, prodId) => {
    cartDispatch({
      type: "ADD_TO_CART",
      payload: { prodId, numOfItem: eventKey },
    });
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      style={{
        height: 80,
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 1,
      }}
    >
      <Container>
        <Navbar.Brand style={{ cursor: "pointer" }}>
          <Link
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "25px",
              fontWeight: "bold",
            }}
            to="/"
          >
            <span>
              <Image
                style={{
                  clipPath: "circle(50% at 50% 50%)",
                  width: "78px",
                  height: "78px",
                  marginRight: "10px",
                }}
                src={`${process.env.PUBLIC_URL}/shopping_logo.jpg`}
                alt="Logo"
                fluid
              />
            </span>
            Shopping Cart
          </Link>
        </Navbar.Brand>

        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            type="search"
            placeholder="Search"
            onChange={(e) => {
              // if (e.target.value.length > 1) {
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
              // }
            }}
          />
        </Navbar.Text>
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <FaCartArrowDown />
            <Badge bg="transparent" style={{ color: "white" }}>
              {cart?.length}
            </Badge>
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginRight: "10px",
                      }}
                    >
                      <span>Qty {prod?.numOfItem}</span>
                      <Dropdown
                        onSelect={(eventKey) =>
                          handleItemSelect(eventKey, prod?.id)
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
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id=""> */}
          <Nav >
            <Dropdown align="end">
              <Dropdown.Toggle as="a" bsPrefix="user-dropdown">
                <Image
                style={{cursor: "pointer",
                  objectFit: "cover"}}
                  src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  roundedCircle
                  width="70"
                  height="70"
                  alt="User"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {isAuthenticated ?
                <>
                <Dropdown.Item href="/profile">Settings</Dropdown.Item>
                <Dropdown.Item href="/orders">Orders</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={()=>logout()}>Logout</Dropdown.Item>
                
                </>
                :
                <Dropdown.Item > <Link style={{textDecoration: "none", color: "black"}} to="/login">Login</Link></Dropdown.Item>
}
              </Dropdown.Menu>
              
            </Dropdown>
          </Nav>
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
}
