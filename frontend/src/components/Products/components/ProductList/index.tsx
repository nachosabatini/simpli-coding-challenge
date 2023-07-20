import styled from 'styled-components';
import ProductCard from '../ProductCard';
import { Product } from '@/types';
import Button from '@/components/Button';

interface ProductListProps {
  products: Product[];
  isEditing?: boolean;
  onDelete: (productId: string | undefined) => void;
  onEdit: (product: Product) => void;
  totalPages: number;
  currentPage: number;
  sortByPrice: boolean;
  onPageChange: (page: number, sortByPrice: boolean) => void;
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ProductList = ({
  products,
  isEditing,
  onDelete,
  onEdit,
  totalPages,
  currentPage,
  onPageChange,
  sortByPrice,
}: ProductListProps) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1, sortByPrice);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1, sortByPrice);
    }
  };

  const handlePageChange = (page: number) => {
    onPageChange(page, sortByPrice);
  };

  const handleSortByPrice = () => {
    onPageChange(currentPage, !sortByPrice);
  };
  return (
    <>
      <Button
        variant='toggled'
        isActive={sortByPrice}
        onClick={handleSortByPrice}
      >
        Order By Price
      </Button>
      <GridContainer>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isEditing={isEditing}
            onDelete={() => onDelete(product._id)}
            onEdit={() => onEdit(product)}
          />
        ))}
      </GridContainer>
      <PaginationContainer>
        <Button
          variant='pagination'
          onClick={handlePrevPage}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            variant='pagination'
            key={index + 1}
            isActive={currentPage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          variant='pagination'
          onClick={handleNextPage}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </PaginationContainer>
    </>
  );
};

export default ProductList;
