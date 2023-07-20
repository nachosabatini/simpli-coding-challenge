import Products from '@/components/Products';
import Title from '@/components/Title';
import { Product } from '@/types';
import { GetServerSideProps, NextPage } from 'next';

interface ProductProps {
  products: Product[];
  totalProducts: number;
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
      totalProducts: products.totalProducts,
      currentPage: products.currentPage,
    },
  };
};

const ManagementPage: NextPage<ProductProps> = ({
  products,
  totalProducts,
  currentPage,
}) => {
  return (
    <>
      <Title level={1}>Create, Edit & Delete</Title>
      <Products
        products={products}
        initialCurrentPage={currentPage}
        initialTotalPages={totalProducts}
        isEditing={true}
      />
    </>
  );
};

export default ManagementPage;
