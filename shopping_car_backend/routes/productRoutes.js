import express from 'express'
import auth from '../middleware/auth.js';
import productController from '../controllers/productController.js';


const router = express.Router();

// router.get('/', getProducts);
// router.get('/:id', getProduct);
// router.post('/', auth, createProduct);
// router.put('/:id', auth, updateProduct);
// router.delete('/:id', auth, deleteProduct);



// Define routes
router.post('/products',auth, productController.createProduct);
router.get('/products/:sku', auth, productController.getProductBySKU);
router.put('/products/:sku', auth, productController.updateProductBySKU);
router.delete('/products/:sku', auth, productController.deleteProductBySKU);
router.get('/products', auth, productController.getAllProducts);
router.put('/products/:sku/stock', auth, productController.updateStock);
router.post('/products/:productDetailsId/price-history', auth, productController.addPriceHistory);
router.get('/products/:productDetailsId/price-history', auth, productController.getPriceHistory);

export default router;

