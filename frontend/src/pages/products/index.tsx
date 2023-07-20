import Products from '@/components/Products';
import Title from '@/components/Title';
import { Product } from '@/types';
import { GetServerSideProps, NextPage } from 'next';

interface ProductProps {
  products: Product[];
  totalPages: number;
  currentPage: number;
}

export const getServerSideProps: GetServerSideProps<
  ProductProps
> = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/products`);

  const products = await res.json();
  return {
    props: {
      products: products.products,
      totalPages: products.totalPages,
      currentPage: products.currentPage,
    },
  };
};

const ProductsPage: NextPage<ProductProps> = ({
  products,
  totalPages,
  currentPage,
}) => {
  return (
    <>
      <Title level={1}>Products</Title>
      <Products
        products={products}
        initialCurrentPage={currentPage}
        initialTotalPages={totalPages}
      />
    </>
  );
};

export default ProductsPage;
