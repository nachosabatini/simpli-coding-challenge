import { Schema, model, Document } from 'mongoose';

interface ProductDocument extends Document {
  name: string;
  image: string;
  description: string;
  price: number;
}

const productSchema = new Schema<ProductDocument>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = model<ProductDocument>('Product', productSchema);

export default Product;
