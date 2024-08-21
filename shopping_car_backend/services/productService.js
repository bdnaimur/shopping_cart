// const Product = require('../models/Product');
import Product from '../models/Product.js';
// const ProductDetails = require('../models/ProductDetails');
import ProductDetails from '../models/ProductDetails.js';

// const PriceHistory = require('../models/PriceHistory');
import PriceHistory from '../models/PriceHistory.js';

// Function to create a new product
const createProduct = async (productData) => {
  try {
    // Create a new product using the provided data
    const product = new Product(productData);
    await product.save();
    return product;
  } catch (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }
};

// Function to get a product by SKU
const getProductBySKU = async (sku) => {
  try {
    // Find the product by SKU and populate related details
    const product = await Product.findOne({ sku }).populate('productDetails').exec();
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error(`Error fetching product: ${error.message}`);
  }
};

// Function to update a product by SKU
const updateProductBySKU = async (sku, updateData) => {
  try {
    // Find and update the product by SKU
    const product = await Product.findOneAndUpdate({ sku }, updateData, { new: true }).exec();
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};

// Function to delete a product by SKU
const deleteProductBySKU = async (sku) => {
  try {
    // Find and delete the product by SKU
    const result = await Product.findOneAndDelete({ sku }).exec();
    if (!result) {
      throw new Error('Product not found');
    }
    return result;
  } catch (error) {
    throw new Error(`Error deleting product: ${error.message}`);
  }
};

// Function to get all products
const getAllProducts = async () => {
  try {
    // Find all products and populate related details
    const products = await Product.find().populate('productDetails').exec();
    return products;
  } catch (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
};

// Function to update the stock of a product
const updateStock = async (sku, quantity) => {
  try {
    // Find the product by SKU and update its stock
    const product = await Product.findOne({ sku }).exec();
    if (!product) {
      throw new Error('Product not found');
    }
    product.stock += quantity; // Increase stock, can be adjusted for other scenarios
    await product.save();
    return product;
  } catch (error) {
    throw new Error(`Error updating stock: ${error.message}`);
  }
};

// Function to track price history
const addPriceHistory = async (productDetailsId, price) => {
  try {
    // Create a new price history entry
    const priceHistory = new PriceHistory({
      productDetails: productDetailsId,
      price,
    });
    await priceHistory.save();
    return priceHistory;
  } catch (error) {
    throw new Error(`Error adding price history: ${error.message}`);
  }
};

// Function to get price history for a product
const getPriceHistory = async (productDetailsId) => {
  try {
    // Find price history entries for the product
    const priceHistory = await PriceHistory.find({ productDetails: productDetailsId }).exec();
    return priceHistory;
  } catch (error) {
    throw new Error(`Error fetching price history: ${error.message}`);
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
