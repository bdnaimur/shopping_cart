import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { CartState } from "../../context/ContextProvider";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Checkout = () => {
  const {
    cartState: { cart },
    cartDispatch,
  } = CartState();
  const navigate = useNavigate();
  const [step, setStep] = useState(1)

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.numOfItem,
    0
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    cardHolderName: "",
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

  // Get current date and time
  const currentDate = new Date().toLocaleString();
  // Add header with margins
  const addHeader = () => {
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Add logo image
    const logoWidth = 30;
    const logoHeight = 30;
    const margin = 10;
    doc.addImage('/shopping_logo.jpg', 'JPG', margin, margin, logoWidth, logoHeight);
    
    // Add title next to the logo
    const titleX = margin + logoWidth + 10; // Position title after logo with a gap
    const titleY = margin + logoHeight / 2 + 5; // Vertically center the title with logo
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 255); // Blue color
    doc.text('Shopping App Invoice', titleX, titleY);

    // Add current date and time at the top right with margin
    doc.setFontSize(12);
    doc.setTextColor(128, 128, 128); // Gray color
    const dateX = pageWidth - margin;
    const dateY = titleY;
    doc.text(currentDate, dateX, dateY, { align: 'right' });

    doc.setDrawColor(0, 0, 255);
    doc.setLineWidth(1);
    doc.line(margin, margin + logoHeight + 10, pageWidth - margin, margin + logoHeight + 10); // Horizontal line with margin
  };

  // Add footer
  const addFooter = (pageNumber) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    doc.setDrawColor(0, 0, 255);
    doc.setLineWidth(1);
    doc.line(margin, pageHeight - margin, pageWidth - margin, pageHeight - margin); // Horizontal line with margin
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128); // Gray color
    doc.text('This is system generated Invoice', margin, pageHeight - margin / 2, { align: 'center' });
    doc.text(`Page ${pageNumber}`, pageWidth / 2, pageHeight - margin / 2, { align: 'center' }); // Page number in the footer
  };

  // Start generating content with margin
  let y = 60; // Start position for content after header with margin

  addHeader();

  // Table datacc
  const tableColumns = ['No.', 'Item Name', 'Price'];
  const tableRows = cart.map((item, index) => [index+1, item.name, `$${item.price.toFixed(2)}`]);

  // Add item table with margins
  doc.autoTable({
    head: [tableColumns],
    body: tableRows,
    startY: y,
    margin: { top: 10, left: 20, right: 20, bottom: 10 },
    styles: { overflow: 'linebreak' },
    headStyles: { fillColor: [0, 0, 255] }, // Blue header background
    didDrawPage: (data) => {
      y = data.cursor.y; // Get the end position of the table
    }
  });

  // Add total price row
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0); // Black color
  const totalLabel = 'Total Price:';
  const totalValue = `$${totalPrice.toFixed(2)}`;
  doc.text(totalLabel, 20, y + 10); // Position total label
  doc.text(totalValue, doc.internal.pageSize.getWidth() - 20, y + 10, { align: 'right' }); // Position total value on the right

  y += 20; // Move down for the next section

  // User information data
  const userColumns = ['Field', 'Value'];
  const userRows =  Object.keys(formData).map(item => [item, `${formData[item]}`])
  // Add user information table with margins
  doc.autoTable({
    head: [userColumns],
    body: userRows,
    startY: y,
    margin: { top: 10, left: 20, right: 20, bottom: 20 },
    styles: { overflow: 'linebreak' },
    headStyles: { fillColor: [0, 0, 255] }, // Blue header background
  });

  // Add footer
  addFooter(1);

  // Save the PDF as a Blob
  const pdfBlob = doc.output('blob');
  setPdfBlob(pdfBlob);

  // Automatically download the PDF
  // doc.save('order-summary.pdf');
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
          {step === 1 && (
            <>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3} // 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                  required
                />
              </Form.Group>
              <Button variant="secondary"
                onClick={() => setStep(2)}
                className="mt-4 ms-2">
                Next
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Form.Group controlId="formCardHolderName">
                <Form.Label>Card Holder Name</Form.Label>
                <Form.Control
                  type="text" 
                  name="cardHolderName"
                  value={formData.cardHolderName}
                  onChange={handleChange}
                  placeholder="Enter card holder name"
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
              <Button
                variant="secondary"
                onClick={() => setStep(1)}
                className="mt-4 ms-2"
              >
                Back
              </Button>
            </>
          )}
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
