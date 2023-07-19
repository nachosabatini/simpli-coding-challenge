import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import fileUploader from '../middleware/fileUploader';

const productRouter: Router = Router();
const upload = fileUploader();

productRouter.get('/products', getAllProducts);
productRouter.get('/products/:id', getProductById);
productRouter.post('/products', upload.single('image'), createProduct);
productRouter.put('/products/:id', upload.single('image'), updateProduct);
productRouter.delete('/products/:id', deleteProduct);

export default productRouter;
