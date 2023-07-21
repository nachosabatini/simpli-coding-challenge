import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { Product } from '@/types';
import { useState } from 'react';
import useProductMutations from '@/hooks/useProductsMutation';
import useFetchProducts from '@/hooks/useFetchProducts';

interface ProductsProps {
  products: Product[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  isEditing?: boolean;
}

const Products = ({
  products,
  totalPages,
  totalItems,
  isEditing = false,
}: ProductsProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProductsQuery = useFetchProducts(currentPage, sortByPrice, {
    products,
    totalPages,
    currentPage,
    totalItems,
  });

  const { data: allProducts } = fetchProductsQuery;

  const { deleteProduct, updateProduct, addProduct } = useProductMutations(
    fetchProductsQuery.refetch
  );

  const handleAddProduct = (newProduct: Product) => {
    addProduct.mutate(newProduct);
  };

  const handleDeleteProduct = (productId: string | undefined) => {
    deleteProduct.mutate(productId);
  };

  const handleUpdate = (productData: Product) => {
    updateProduct.mutate(productData);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleSubmit = (productData: any) => {
    if (selectedProduct?._id) {
      setSelectedProduct(null);
      handleUpdate({ ...productData, _id: selectedProduct._id });
    } else {
      handleAddProduct(productData);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortByPrice = () => {
    setSortByPrice((prevSort) => !prevSort);
    fetchProductsQuery.refetch();
  };

  return (
    <>
      {isEditing && (
        <ProductForm
          selectedProduct={selectedProduct}
          onSubmit={handleSubmit}
        />
      )}
      <ProductList
        products={allProducts.products}
        isEditing={isEditing}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        totalPages={allProducts.totalPages}
        currentPage={allProducts.currentPage}
        onPageChange={handlePageChange}
        sortByPrice={sortByPrice}
        handleSortByPrice={handleSortByPrice}
      />
    </>
  );
};

export default Products;
