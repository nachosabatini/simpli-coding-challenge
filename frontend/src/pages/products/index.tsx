import Products from '@/components/Products';
import Title from '@/components/Title';

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/products`);

  const products = await res.json();
  return {
    props: {
      products,
    },
  };
};

const ProductsPage = ({ products }: any) => {
  return (
    <>
      <Title level={1}>Products</Title>
      <Products products={products} />
    </>
  );
};

export default ProductsPage;
