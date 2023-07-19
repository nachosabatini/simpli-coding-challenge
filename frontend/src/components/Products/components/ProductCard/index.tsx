import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Product } from "@/types";
import { useRouter } from "next/router";
import Button from "@/components/Button";

interface ProductCardProps {
  product: Product;
  isEditing?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  padding-top: calc(100% * 2 / 3);
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ProductCard = ({
  product,
  isEditing,
  onDelete,
  onEdit,
}: ProductCardProps) => {
  const router = useRouter();
  const handleLearnMore = () => {
    router.push(`/products/${product._id}`);
  };
  return (
    <Card>
      <ImageContainer>
        <Image src={product.image} alt={product.name} layout="fill" />
      </ImageContainer>
      <div style={{ flex: 1 }}>
        <Title>{product.name}</Title>
        <Price>{`$ ${product.price}`}</Price>
        {isEditing ? (
          <ButtonContainer>
            <Button onClick={onEdit} variant="secondary">
              Edit
            </Button>
            <Button onClick={onDelete} variant="danger">
              Delete
            </Button>
          </ButtonContainer>
        ) : (
          <Button onClick={handleLearnMore} variant="primary">
            Learn More
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
