import productService from '../services/productService.js'

// console.log("productService", productService);

// Create a new product
const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const product = await productService.createProduct(productData);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a product by SKU
const getProductBySKU = async (req, res) => {
  try {
    const { sku } = req.params;
    const product = await productService.getProductBySKU(sku);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a product by SKU
const updateProductBySKU = async (req, res) => {
  try {
    const { sku } = req.params;
    const updateData = req.body;
    const updatedProduct = await productService.updateProductBySKU(sku, updateData);
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a product by SKU
const deleteProductBySKU = async (req, res) => {
  try {
    const { sku } = req.params;
    const result = await productService.deleteProductBySKU(sku);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update stock of a product
const updateStock = async (req, res) => {
  try {
    const { sku } = req.params;
    const { quantity } = req.body;
    const updatedProduct = await productService.updateStock(sku, quantity);
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add price history for a product
const addPriceHistory = async (req, res) => {
  try {
    const { productDetailsId } = req.params;
    const { price } = req.body;
    const priceHistory = await productService.addPriceHistory(productDetailsId, price);
    res.status(201).json({ success: true, priceHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get price history for a product
const getPriceHistory = async (req, res) => {
  try {
    const { productDetailsId } = req.params;
    const priceHistory = await productService.getPriceHistory(productDetailsId);
    res.status(200).json({ success: true, priceHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  createProduct,
  getProductBySKU,
  updateProductBySKU,
  deleteProductBySKU,
  getAllProducts,
  updateStock,
  addPriceHistory,
  getPriceHistory,
};
