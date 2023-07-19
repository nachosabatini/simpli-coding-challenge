import { Request, Response } from 'express';
import Product from '../models/Product';

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, sortByPrice = 'asc' } = req.query;
    const count = await Product.countDocuments();

    const products = await Product.find()
      .sort({ price: sortByPrice === 'asc' ? 1 : -1 }) // Sort products by price
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    // Convert the image buffers to Base64 data URLs
    const productsWithImages = products.map((product) => {
      const imageBuffer = product.image;
      const base64Image = Buffer.from(imageBuffer).toString('base64');
      const dataURL = `data:image/jpeg;base64,${base64Image}`;

      return {
        ...product.toObject(),
        image: dataURL,
      };
    });

    res.json({
      totalProducts: count,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
      products: productsWithImages,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a specific product by ID
export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Convert the image buffer to a Base64 data URL
    const imageBuffer = product.image;
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const dataURL = `data:image/jpeg;base64,${base64Image}`;

    // Add the dataURL to the product object
    const productWithImage = {
      ...product.toObject(),
      image: dataURL,
    };
    res.json(productWithImage);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  const { buffer: imageBuffer } = req.file as Express.Multer.File;

  try {
    const product = new Product({
      name,
      image: imageBuffer,
      description,
      price,
    });
    const savedProduct = await product.save();
    const newimageBuffer = product.image;
    const base64Image = Buffer.from(newimageBuffer).toString('base64');
    const dataURL = `data:image/jpeg;base64,${base64Image}`;
    const productWithImage = {
      ...savedProduct.toObject(),
      image: dataURL,
    };

    res.status(201).json(productWithImage);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a specific product by ID
export const updateProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const { name, description, price } = req.body;
  const imageBuffer = req.file?.buffer;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name;
    product.description = description;
    product.price = price;

    if (imageBuffer) {
      product.image = imageBuffer;
    }

    const updatedProduct = await product.save();
    const newimageBuffer = product.image;
    const base64Image = Buffer.from(newimageBuffer).toString('base64');
    const dataURL = `data:image/jpeg;base64,${base64Image}`;
    const productWithImage = {
      ...updatedProduct.toObject(),
      image: dataURL,
    };
    res.json(productWithImage);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a specific product by ID
export const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
