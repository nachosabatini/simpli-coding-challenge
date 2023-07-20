import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Product } from '@/types';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Modal from '@/components/Modal';
import LeadForm from '@/components/LeadForm';
import Title from '@/components/Title';

//THIS CODE IS COMMENT FOR A REASON
//THIS WAS THE FIRST APPROACH THAT I WANTED TO USE BUT WHEN I WAS TRYING TO RUN THE APP WITH DOCKER
//I WAS GETTING AN ERROR THAT I COULD NOT SOLVE BECAUSE IT WAS TRYING TO PREFETCH THE DATA
//WHEN RUNNING THE BUILD AND THE BACKEND WAS NOT RUNNING YET
//SO FOR PREVENTING THIS ERROR I DECIDED TO USE THE GETSERVERSIDEPROPS INSTEAD OF GETSTATICPROPS

// export const getStaticPaths: GetStaticPaths = async () => {
//   const productsData = await fetch('http://localhost:4000/api/products');
//   const products = await productsData.json();

//   const paths = products.products.map((product: Product) => ({
//     params: { slug: product._id },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps: GetStaticProps<Props> = async ({
//   params,
// }) => {
//   const slug = params?.slug;

//   const productData = await fetch(`http://localhost:4000/api/products/${slug}`);
//   const product = await productData.json();

//   return {
//     props: {
//       product,
//     },
//     revalidate: 1,
//   };
// };

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
      product,
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

  @media (max-width: 390px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProductImage = styled.img`
  max-width: 400px;
  height: auto;
  margin-right: 20px;
  border: 1px solid #ccc;

  @media (max-width: 390px) {
    max-width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h1`
  margin-bottom: 10px;
`;

const ProductPrice = styled.span`
  margin-bottom: 10px;
  font-size: 18px;
`;

const ProductDescription = styled.p`
  margin-bottom: 20px;
`;

const CTAButton = styled.button`
  padding: 8px 16px;
  background-color: #903df7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ProductPage: React.FC<Props> = ({ product }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleBuyNow = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <ProductDetailsContainer>
        <ProductImage src={product.image} alt={product.name} />
        <ProductDetails>
          <ProductTitle>{product.name}</ProductTitle>
          <ProductPrice>USD {product.price.toFixed(2)}</ProductPrice>
          <Title level={3}>Description</Title>
          <ProductDescription>{product.description}</ProductDescription>
          <CTAButton onClick={handleBuyNow} style={{ width: '40%' }}>
            Subscribe
          </CTAButton>
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
