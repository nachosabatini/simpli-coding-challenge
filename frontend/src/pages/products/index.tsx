import Products from '@/components/Products';
import Title from '@/components/Title';
import { GetServerSideProps, NextPage } from 'next';
import { ProductAPIProps, fetchProducts } from '@/utils/product-api';

export const getServerSideProps: GetServerSideProps<
  ProductAPIProps
> = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/products`);

  const { products, totalPages, currentPage, totalProducts } = await res.json();
  return {
    props: {
      products: products,
      totalPages: totalPages,
      currentPage: currentPage,
      totalItems: totalProducts,
    },
  };
};

const ProductsPage: NextPage<ProductAPIProps> = ({
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
