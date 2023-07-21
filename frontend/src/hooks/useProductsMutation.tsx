import { useMutation } from 'react-query';
import { deleteProduct, updateProduct, addProduct } from '@/utils/product-api';

const useProductMutations = (refetchQuery: () => void) => {
  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: refetchQuery,
  });

  const updateProductMutation = useMutation(updateProduct, {
    onSuccess: refetchQuery,
  });

  const addProductMutation = useMutation(addProduct, {
    onSuccess: refetchQuery,
  });

  return {
    deleteProduct: deleteProductMutation,
    updateProduct: updateProductMutation,
    addProduct: addProductMutation,
  };
};

export default useProductMutations;
