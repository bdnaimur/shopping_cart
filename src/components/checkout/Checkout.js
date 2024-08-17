import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { CartState } from "../../context/ContextProvider";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { jsPDF } from 'jspdf';

const Checkout = () => {
  const {
    cartState: { cart },
    cartDispatch,
  } = CartState();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.numOfItem,
    0
  );
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [pdfBlob, setPdfBlob] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock payment processing
    console.log("Payment Details:", formData);
    // alert("Payment Successful!");
    toast.success("Payment successful!");

    cartDispatch({
        type: "CLEAR_CART",
      });
      generatePDF();
    setTimeout(() => {
      //   navigate("/home"); // Redirect to the home page or wherever you want
    //   navigate("/");
    }, 2000);

  };



  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 10; // Start position for text

    // Add a title with larger font size
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 255); // Blue color
    doc.text('Order Summary', 10, y);
    y += 10;

    // Add a horizontal line
    doc.setDrawColor(0, 0, 255);
    doc.setLineWidth(1);
    doc.line(10, y, 200, y);
    y += 10;

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Black color
    cart.forEach((item, index) => {
      doc.text(`${index+1}. ${item.name} - $${item.price.toFixed(2)}`, 10, y);
      y += 10; // Increment y position for the next item
    });

    y += 10; // Add some space before the total
    doc.setFontSize(16);
    doc.setTextColor(255, 0, 0); // Red color
    doc.text(`Total: $${totalPrice.toFixed(2)}`, 10, y);

    // Add some space before Payment Details
    y += 20;

    // Add Payment Details title with a larger font size
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 255); // Blue color
    doc.text('Payment Details', 10, y);
    y += 10;

    // Add another horizontal line
    doc.setDrawColor(0, 0, 255);
    doc.setLineWidth(1);
    doc.line(10, y, 200, y);
    y += 10;

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text(`Name on Card: ${formData.name}`, 10, y);
    y += 10;
    doc.text(`Card Number: ${formData.cardNumber}`, 10, y);
    y += 10;
    doc.text(`Expiry Date: ${formData.expiryDate}`, 10, y);
    y += 10;

    const pdfBlob = doc.output('blob');
    setPdfBlob(pdfBlob);

    doc.save('order-summary.pdf');
  };
  const handleDownloadLater = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'order-summary.pdf';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  console.log("pdfBlob", pdfBlob);
  
  return (
    <Container style={{ marginTop: "100px" }}>
      <Toaster position="top-right" />
      <Row className="justify-content-md-center mt-5">
        <Col md={8}>
          <Card>
            <Card.Header as="h5">Order Summary</Card.Header>
            <Card.Body>
              <Row style={{ fontWeight: "bold" }}>
                <Col>{"Name"}</Col>
                <Col>{"No of Items"}</Col>
                <Col className="text-end">Price</Col>
              </Row>
              <hr />
              {cart?.map((item, index) => (
                <div key={index}>
                  <Row>
                    <Col>{item.name}</Col>
                    <Col>{item.numOfItem}</Col>
                    <Col className="text-end">${item?.price?.toFixed(2)}</Col>
                  </Row>
                </div>
              ))}
              <hr />
              <Row>
                <Col>
                  <strong>Total</strong>
                </Col>
                <Col className="text-end">
                  <strong>${totalPrice?.toFixed(2)}</strong>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Header as="h5">Payment Details</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Name on Card</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name on card"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formCardNumber" className="mt-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="Enter card number"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formExpiryDate" className="mt-3">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formCVV" className="mt-3">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="Enter CVV"
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-4">
                  Pay Now
                </Button>
              </Form>
            </Card.Body>
          </Card>
          {pdfBlob && (
            <Button variant="secondary" className="mt-4" onClick={handleDownloadLater}>
              Download PDF Later
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
