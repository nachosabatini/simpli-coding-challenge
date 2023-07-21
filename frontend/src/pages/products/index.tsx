import Products from '@/components/Products';
import Title from '@/components/Title';
import { Product } from '@/types';
import { GetServerSideProps, NextPage } from 'next';
import { fetchProducts } from '@/utils/product-api';

interface ProductProps {
  products: Product[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export const getServerSideProps: GetServerSideProps<
  ProductProps
> = async () => {
  const data = await fetchProducts(1, false);
  return {
    props: {
      products: data.products,
      totalPages: data.totalPages,
      currentPage: data.currentPage,
      totalItems: data.totalProducts,
    },
  };
};

const ProductsPage: NextPage<ProductProps> = ({
  products,
  totalPages,
  currentPage,
  totalItems,
}) => {
  return (
    <>
      <Title level={1}>Products</Title>
      <Products
        products={products}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
      />
    </>
  );
};

export default ProductsPage;
