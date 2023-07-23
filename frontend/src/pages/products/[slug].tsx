import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { Product } from '@/types';
import styled from 'styled-components';
import Modal from '@/components/Modal';
import LeadForm from '@/components/LeadForm';
import Title from '@/components/Title';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import { fetchOneProduct } from '@/utils/product-api';

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const slug = params?.slug;

  const productData = await fetch(
    `${process.env.BACKEND_URL}/api/products/${slug}`
  );
  const product = await productData.json();

  return {
    props: {
      product: product,
    },
  };
};

type Props = {
  product: Product;
};

const ProductDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  padding-top: 80px;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProductImage = styled.img`
  max-width: 400px;
  height: auto;
  margin-right: 20px;
  border: 1px solid #ccc;

  @media (max-width: 700px) {
    max-width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProductPrice = styled.span`
  margin-bottom: 10px;
  font-size: 18px;
`;

const ProductDescription = styled.p`
  margin-bottom: 20px;
  line-height: 1.5rem;
`;

const ProductPage: NextPage<Props> = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleBuyNow = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGoBack = () => {
    router.push('/products');
  };

  return (
    <>
      <Button onClick={handleGoBack} variant='secondary'>
        Back to Products
      </Button>
      <ProductDetailsContainer>
        <ProductImage src={product.image} alt={product.name} />
        <ProductDetails>
          <Title level={1}>{product.name}</Title>
          <ProductPrice>USD {product.price.toFixed(2)}</ProductPrice>
          <Title level={3}>Description</Title>
          <ProductDescription>{product.description}</ProductDescription>
          <Button onClick={handleBuyNow}>I want it!</Button>
        </ProductDetails>
      </ProductDetailsContainer>
      {showModal && (
        <Modal>
          <LeadForm product={product} onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};

export default ProductPage;
