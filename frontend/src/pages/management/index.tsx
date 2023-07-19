import React from "react";
import ProductList from "@/components/ProductList";
import ProductForm from "@/components/ProductForm";

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:4000/api/products");
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
};

const Products = ({ products }: any) => {
  return (
    <div>
      <h1>Create, Edit & Delete</h1>
      <ProductForm />
      <ProductList products={products.products} />
    </div>
  );
};

export default Products;
