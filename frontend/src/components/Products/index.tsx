import React from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { Product } from '@/types';
import useProductAPI from '@/hooks/useProductsAPI';

interface ProductsProps {
  products: {
    products: Product[];
    totalPages: number;
    currentPage: number;
  };
  isEditing?: boolean;
}

const Products = ({ products, isEditing = false }: ProductsProps) => {
  const {
    allProducts,
    selectedProduct,
    currentPage,
    totalPages,
    fetchProducts,
    handleEditProduct,
    handleDeleteProduct,
    handleSubmit,
    sortByPrice,
  } = useProductAPI(
    products.products,
    products.totalPages,
    products.currentPage
  );

  const handlePageChange = async (page: number, sortByPrice: boolean) => {
    await fetchProducts(page, sortByPrice);
  };

  return (
    <>
      {isEditing && (
        <ProductForm
          selectedProduct={selectedProduct}
          setSelectedProduct={handleEditProduct}
          onSubmit={handleSubmit}
        />
      )}
      <ProductList
        products={allProducts}
        isEditing={isEditing}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        sortByPrice={sortByPrice}
      />
    </>
  );
};

export default Products;
