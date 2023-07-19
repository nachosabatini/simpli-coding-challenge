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
  console.log(products);

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}

      <GridContainer>
        {Products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </GridContainer>
    </>
  );
};

export default ProductList;

const Products = [
  {
    _id: "1",
    name: "Product 1",
    price: 100,
    image: "http://placekitten.com/200/300",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    _id: "2",
    name: "Product 2",
    price: 200,
    image: "http://placekitten.com/200/300",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    _id: "3",
    name: "Product 3",
    price: 300,
    image: "http://placekitten.com/400/300",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    _id: "4",
    name: "Product 4",
    price: 400,
    image: "http://placekitten.com/300/300",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    _id: "5",
    name: "Product 5",
    price: 500,
    image: "http://placekitten.com/300/300",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];
