import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
`;

const Price = styled.p`
  font-size: 16px;
  margin-top: 5px;
`;

const Button = styled.button`
  background-color: #903df7;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #7a32e8;
    transition: background-color 0.3s;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card>
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        style={{ objectFit: "contain" }}
      />
      <Title>{product.name}</Title>
      <Price>{`$ ${product.price}`}</Price>
      <ButtonContainer>
        <Button>Learn More</Button>
        <Button>Learn More</Button>
      </ButtonContainer>
    </Card>
  );
};

export default ProductCard;
