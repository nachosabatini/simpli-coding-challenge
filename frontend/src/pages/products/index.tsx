import Products from '@/components/Products';
import Title from '@/components/Title';
import { GetServerSideProps, NextPage } from 'next';
import { ProductAPIProps, fetchProducts } from '@/utils/product-api';

export const getServerSideProps: GetServerSideProps<
  ProductAPIProps
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
