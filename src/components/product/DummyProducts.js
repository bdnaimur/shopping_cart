import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 1000, available: true, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Shoes', category: 'Clothing', price: 50, available: false, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Phone', category: 'Electronics', price: 500, available: true, image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Jacket', category: 'Clothing', price: 100, available: true, image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Headphones', category: 'Electronics', price: 150, available: false, image: 'https://via.placeholder.com/150' },
];

function ProductList() {
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: [0, 1000],
    available: 'All',
  });

  const handleCategoryChange = (event) => {
    setFilters({
      ...filters,
      category: event.target.value,
    });
  };

  const handlePriceChange = (event) => {
    const value = event.target.value.split('-').map(Number);
    setFilters({
      ...filters,
      priceRange: value,
    });
  };

  const handleAvailabilityChange = (event) => {
    setFilters({
      ...filters,
      available: event.target.value,
    });
  };

  const applyFilters = (products) => {
    return products.filter((product) => {
      // Category Filter
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }
      // Price Filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      // Availability Filter
      
      if (filters.available !== 'All') {
        if (filters.available === 'Available' && !product.available) {
            return false;
          }
          if (filters.available === 'Unavailable' && product.available) {
            return false;
          }
      }
      return true;
    });
  };

  const filteredProducts = applyFilters(products);

  console.log("filteredProducts", filteredProducts);
  
  return (
    <div className="container mt-4">
      <h1>Product List</h1>
      
      <div className="mb-4">
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control as="select" value={filters.category} onChange={handleCategoryChange}>
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="priceRange" className="mt-2">
          <Form.Label>Price Range</Form.Label>
          <Form.Control as="select" onChange={handlePriceChange}>
            <option value="0-1000">All</option>
            <option value="0-100">0 - 100</option>
            <option value="100-500">100 - 500</option>
            <option value="500-1000">500 - 1000</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="availability" className="mt-2">
          <Form.Label>Availability</Form.Label>
          <Form.Control as="select" value={filters.available} onChange={handleAvailabilityChange}>
            <option value="All">All</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </Form.Control>
        </Form.Group>
      </div>

      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  Category: {product.category}<br />
                  Price: ${product.price}<br />
                  Availability: {product.available ? 'In Stock' : 'Out of Stock'}
                </Card.Text>
                <Button variant="primary">Add to Cart</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
