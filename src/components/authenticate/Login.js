import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { CartState } from "../../context/ContextProvider";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoginPage() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, login } = CartState();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    // If user is already authenticated, redirect to the checkout page
    if (isAuthenticated) {
      navigate("/checkout");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    try {
      // Replace with your actual API call
      const isSuccess = await mockApiLogin(formData.email, formData.password);

      if (isSuccess) {
        toast.success("Login successful!");
        login();
        setTimeout(() => {
          //   navigate("/home"); // Redirect to the home page or wherever you want
          navigate("/checkout");
        }, 2000); // Delay for the success message
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const mockApiLogin = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === "fake@example.com" && password === "test@123") {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1500);
    });
  };

  return (
    // <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
    //   <Form className="login-form" onSubmit={handleLogin} style={{ width: "300px" }}>
    //     <h3 className="text-center">Login</h3>

    //     <Form.Group controlId="formBasicEmail">
    //       <Form.Label>Email address</Form.Label>
    //       <Form.Control
    //         type="email"
    //         placeholder="Enter email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //     </Form.Group>

    //     <Form.Group controlId="formBasicPassword" className="mt-3">
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control
    //         type="password"
    //         placeholder="Password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     </Form.Group>

    //     <Button variant="primary" type="submit" className="mt-4" disabled={loading} block>
    //       {loading ? <Spinner animation="border" size="sm" /> : "Login"}
    //     </Button>
    //   </Form>
    //   <Toaster /> {/* Add Toaster component here */}
    // </div>

    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row className="justify-content-md-center">
        <Col>
          <h2 className="text-center">Login</h2>
          <Form
            style={{ minWidth: "500px", padding: "30px 30px" }}
            className="login-form"
            noValidate
            validated={validated}
            onSubmit={handleLogin}
          >
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a password.
              </Form.Control.Feedback>
            </Form.Group>

            {/* <Button variant="primary" type="submit" className="mt-3">
            Login
          </Button> */}

            <Button
              variant="primary"
              type="submit"
              className="mt-4"
              disabled={loading}
              block
              style={{minWidth: '65px'}}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>

            <div className="mt-3">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
