import React from "react";
import { GetServerSideProps } from "next";
import ProductList from "@/components/ProductList";

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
      <h1>Products</h1>
      <ProductList products={products.products} />
    </div>
  );
};

export default Products;
