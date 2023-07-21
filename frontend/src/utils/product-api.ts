import { Product } from '@/types';

const deleteProduct = async (productId: string | undefined) => {
  try {
    await fetch(`http://localhost:4000/api/products/${productId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

const updateProduct = async (product: Product) => {
  try {
    const formData = new FormData();
    const { image, name, description, price } = product;
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('image', image);

    await fetch(`http://localhost:4000/api/products/${product._id}`, {
      method: 'PUT',
      body: formData,
    });
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

const addProduct = async (product: Product) => {
  try {
    const formData = new FormData();
    const { image, name, description, price } = product;
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('image', image);

    await fetch(`http://localhost:4000/api/products`, {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    console.error('Error adding product:', error);
  }
};

const fetchProducts = async (page: number, sortByPrice: boolean) => {
  try {
    const res = await fetch(
      `http://localhost:4000/api/products?page=${page}&sortByPrice=${
        sortByPrice ? 'desc' : 'asc'
      }`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const fetchOneProduct = async (productId: string | undefined | string[]) => {
  try {
    const res = await fetch(`http://localhost:4000/api/products/${productId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching one product:', error);
  }
};

export {
  deleteProduct,
  updateProduct,
  addProduct,
  fetchProducts,
  fetchOneProduct,
};
