import Button from '@/components/Button';
import Input from '@/components/Input';
import { Product } from '@/types';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const ProductForm: FC<{
  onSubmit: (product: any) => void;
  selectedProduct: Product | null;
}> = ({ onSubmit, selectedProduct }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price.toString(),
      });
    }
  }, [selectedProduct, onSubmit]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const priceAsNumber = Number(formData.price);
    const productData = {
      name: formData.name,
      description: formData.description,
      price: priceAsNumber,
      image: image || selectedProduct?.image,
    };

    onSubmit(productData);
    clearForm();
  };

  const clearForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
    });
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        type='text'
        name='name'
        value={formData.name}
        onChange={handleChange}
        placeholder='Name'
        required
      />
      <Input
        type='textarea'
        name='description'
        value={formData.description}
        onChange={handleChange}
        placeholder='Description'
        required
      />
      <Input
        type='number'
        name='price'
        value={formData.price}
        onChange={handleChange}
        placeholder='Price'
        required
      />
      <Input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        accept='image/*'
      />
      <ButtonContainer>
        <Button
          variant='primary'
          type='submit'
          isDisabled={
            !formData.description ||
            !formData.name ||
            !formData.price ||
            (!image && !selectedProduct?.image)
          }
        >
          {selectedProduct ? 'Update Product' : 'Create Product'}
        </Button>
        <Button variant='secondary' onClick={clearForm}>
          Clear
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
};

export default ProductForm;
