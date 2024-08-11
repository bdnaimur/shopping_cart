import React from "react";
import {
  Badge,
  Container,
  Dropdown,
  DropdownButton,
  FormControl,
  Navbar,
} from "react-bootstrap";

import { FaCartArrowDown } from "react-icons/fa6";
export default function Header() {
  const handleSelect = (eventKey) => {
    alert(`Selected option: ${eventKey}`);
  };

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
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
            <Badge bg="transparent" style={{ color: 'white' }}>{10}</Badge>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="option1">Option 1</Dropdown.Item>
            <Dropdown.Item eventKey="option2">Option 2</Dropdown.Item>
            <Dropdown.Item eventKey="option3">Option 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
      {/* <Container> */}
      {/* <Navbar.Brand href="#home">Home</Navbar.Brand> */}
      {/* </Container> */}
    </Navbar>
  );
}
