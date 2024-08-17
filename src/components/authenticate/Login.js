import React, { useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { CartState } from "../../context/ContextProvider";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, login } = CartState();

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
      const isSuccess = await mockApiLogin(email, password);

      if (isSuccess) {
        toast.success("Login successful!");
        login()
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
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Form className="login-form" onSubmit={handleLogin} style={{ width: "300px" }}>
        <h3 className="text-center">Login</h3>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4" disabled={loading} block>
          {loading ? <Spinner animation="border" size="sm" /> : "Login"}
        </Button>
      </Form>
      <Toaster /> {/* Add Toaster component here */}
    </div>
  );
}

export default LoginPage;
