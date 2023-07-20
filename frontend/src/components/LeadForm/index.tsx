import { Product } from '@/types';
import { FC, useState } from 'react';
import styled from 'styled-components';
import Input from '@/components/Input';
import Title from '@/components/Title';

const FormContainer = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #903df7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const LeadForm: FC<{
  product: Product;
  onClose: () => void;
}> = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: product._id,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Lead submitted successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          product: product._id,
        });
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to submit lead.');
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('Failed to submit lead. Please try again.');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <CloseButton onClick={onClose}>X</CloseButton>
      <Title level={1}>Submit your information</Title>
      <Input
        type='text'
        name='name'
        value={formData.name}
        onChange={handleChange}
        required
        label='Name'
      />

      <Input
        type='email'
        label='Email'
        name='email'
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Input
        type='tel'
        label='Phone'
        name='phone'
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <Button type='submit'>Submit</Button>
    </FormContainer>
  );
};

export default LeadForm;
