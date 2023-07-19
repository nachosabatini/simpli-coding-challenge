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

const ManagementPage = ({ products }: any) => {
  return (
    <>
      <h1>Create, Edit & Delete</h1>
      <Products products={products} isEditing={true} />
    </>
  );
};

export default ManagementPage;
