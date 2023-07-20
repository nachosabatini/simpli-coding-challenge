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

const ManagementPage = ({ products }: any) => {
  return (
    <>
      <Title level={1}>Create, Edit & Delete</Title>
      <Products products={products} isEditing={true} />
    </>
  );
};

export default ManagementPage;
