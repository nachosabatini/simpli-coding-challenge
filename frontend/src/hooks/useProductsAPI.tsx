import { useState, useEffect } from "react";
import { Product } from "@/types";

interface ProductAPIResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
}

const useProductAPI = (
  initialProducts: Product[],
  initialTotalPages: number,
  initialCurrentPage: number
) => {
  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages);
  const [currentPage, setCurrentPage] = useState<number>(initialCurrentPage);
  const [sortByPrice, setSortByPrice] = useState<boolean>(false);

  const fetchProducts = async (page: number, sortByPrice: boolean) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/products?page=${page}&sortByPrice=${
          sortByPrice ? "desc" : "asc"
        }`
      );
      const data: ProductAPIResponse = await res.json();
      setAllProducts(data.products);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setSortByPrice(sortByPrice);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addProduct = async (formData: FormData) => {
    try {
      const res = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        body: formData,
      });
      const newProduct: Product = await res.json();
      setAllProducts((prevProducts) => [...prevProducts, newProduct]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleDeleteProduct = async (productId: string | undefined) => {
    try {
      await fetch(`http://localhost:4000/api/products/${productId}`, {
        method: "DELETE",
      });

      setSelectedProduct(null);
      fetchProducts(currentPage, sortByPrice);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSubmit = async (productData: any) => {
    try {
      const formData = new FormData();
      const { image, name, description, price } = productData;
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", image);

      const url = selectedProduct
        ? `http://localhost:4000/api/products/${selectedProduct._id}`
        : "http://localhost:4000/api/products";

      const method = selectedProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        body: formData,
      });

      const resdata = await res.json();

      fetchProducts(currentPage, sortByPrice);

      setSelectedProduct(null);
    } catch (error) {
      console.error("Error creating/updating product:", error);
    }
  };

  return {
    allProducts,
    selectedProduct,
    currentPage,
    totalPages,
    sortByPrice,
    fetchProducts,
    addProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleSubmit,
  };
};

export default useProductAPI;
