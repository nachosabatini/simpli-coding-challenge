import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { Product } from '@/types';
import useProductAPI from '@/hooks/useProductsAPI';

interface ProductsProps {
  products: Product[];
  initialTotalPages: number;
  initialCurrentPage: number;
  isEditing?: boolean;
}

const Products = ({
  products,
  initialTotalPages,
  initialCurrentPage,
  isEditing = false,
}: ProductsProps) => {
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
  } = useProductAPI(products, initialTotalPages, initialCurrentPage);

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
