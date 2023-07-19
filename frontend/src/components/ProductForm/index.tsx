import { Product } from "@/types";
import { useEffect, useState } from "react";
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  input,
  textarea {
    margin-bottom: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  input[type="file"] {
    margin-bottom: 10px;
  }

  button {
    padding: 8px 12px;
    background-color: #903df7;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const ProductForm = ({
  onSubmit,
  selectedProduct,
}: {
  onSubmit?: () => void;
  selectedProduct?: Product;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      // Autocomplete form fields with selected product data
      setName(selectedProduct.name);
      setDescription(selectedProduct.description);
      setPrice(selectedProduct.price.toString());
    } else {
      // Reset form fields
      setName("");
      setDescription("");
      setPrice("");
      setImage(null);
    }
  }, [selectedProduct]);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const priceAsNumber = Number(price);
    const productData = {
      name,
      description,
      price: priceAsNumber,
      image,
    };

    console.log(productData);

    submitData(productData);
  };

  const submitData = async (productData: any) => {
    const formData = new FormData();
    const { image, name, description, price } = productData;
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    const res = await fetch("http://localhost:4000/api/products", {
      method: "POST",
      body: formData,
    });
    const resdata = await res.json();
    console.log(resdata);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <input type="file" name="image" onChange={handleFileChange} />
      <button type="submit">
        {selectedProduct ? "Update Product" : "Create Product"}
      </button>
    </FormContainer>
  );
};

export default ProductForm;
