import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';

const productRouter: Router = Router();

productRouter.get('/products', getAllProducts);
productRouter.get('/products/:id', getProductById);
productRouter.post('/products', createProduct);
productRouter.put('/products/:id', updateProduct);
productRouter.delete('/products/:id', deleteProduct);

export default productRouter;
