import Products from '@/components/Products';

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:4000/api/products');
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
      <h1>Products</h1>
      <Products products={products} />
    </>
  );
};

export default ProductsPage;
