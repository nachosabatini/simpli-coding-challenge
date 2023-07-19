import { Request, Response } from 'express';
import Product from '../models/Product';

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, filter = '' } = req.query;
    const regex = new RegExp(filter.toString(), 'i');

    const count = await Product.countDocuments({ name: regex });

    const products = await Product.find({ name: regex })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json({
      totalProducts: count,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
      products,
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
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  const { name, image, description, price } = req.body;

  try {
    const product = new Product({
      name,
      image,
      description,
      price,
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a specific product by ID
export const updateProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const { name, image, description, price } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      { name, image, description, price },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
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
