import { useQuery } from 'react-query';
import { Product } from '@/types';
import { fetchProducts } from '@/utils/product-api';

const useFetchProducts = (
  currentPage: number,
  sortByPrice: boolean,
  initialData: {
    products: Product[];
    totalPages: number;
    currentPage: number;
    totalItems: number;
  }
) => {
  return useQuery(
    ['products', currentPage, sortByPrice],
    () => fetchProducts(currentPage, sortByPrice),
    {
      initialData,
      keepPreviousData: true,
    }
  );
};

export default useFetchProducts;
