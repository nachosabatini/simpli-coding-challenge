import React from "react";
import styled from "styled-components";
import ProductCard from "../ProductCard";
import { Product } from "@/types";

interface ProductListProps {
  products: Product[];
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

const ProductList = ({ products }: ProductListProps) => {
  return (
    <>
      <GridContainer>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </GridContainer>
    </>
  );
};

export default ProductList;
