import Products from '@/components/Products';
import Title from '@/components/Title';
import { ProductAPIProps, fetchProducts } from '@/utils/product-api';
import { GetServerSideProps, NextPage } from 'next';

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

const ManagementPage: NextPage<ProductAPIProps> = ({
  products,
  totalPages,
  currentPage,
  totalItems,
}) => {
  return (
    <>
      <Title level={1}>Create, Edit & Delete</Title>
      <Products
        products={products}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        isEditing={true}
      />
    </>
  );
};

export default ManagementPage;
