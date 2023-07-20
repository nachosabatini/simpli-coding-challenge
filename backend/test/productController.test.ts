import request from "supertest";
import app from "../src/server"; // Assuming you have created and exported the Express app in `app.ts`

describe("Product Controller", () => {
  let productId: string; // To store the ID of a created product for further testing

  describe("POST /api/products", () => {
    it("should create a new product", async () => {
      const newProduct = {
        name: "Test Product",
        description: "This is a test product",
        price: 9.99,
      };

      const response = await request(app)
        .post("/api/products")
        .field("name", newProduct.name)
        .field("description", newProduct.description)
        .field("price", newProduct.price)
        .attach("image", Buffer.from("fake-image-content"), "test-image.jpg");

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("name", newProduct.name);
      expect(response.body).toHaveProperty(
        "description",
        newProduct.description
      );
      expect(response.body).toHaveProperty("price", newProduct.price);
      expect(response.body).toHaveProperty("image");

      // Save the ID of the created product for further testing
      productId = response.body._id;
    });
  });

  describe("GET /api/products", () => {
    it("should get all products", async () => {
      const response = await request(app).get("/api/products");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("totalProducts");
      expect(response.body).toHaveProperty("totalPages");
      expect(response.body).toHaveProperty("currentPage");
      expect(response.body).toHaveProperty("products");

      // Check if the product we created earlier is included in the response
      expect(
        response.body.products.some((product: any) => product._id === productId)
      ).toBeTruthy();
    });
  });

  describe("GET /api/products/:id", () => {
    it("should get a specific product by ID", async () => {
      const response = await request(app).get(`/api/products/${productId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("description");
      expect(response.body).toHaveProperty("price");
      expect(response.body).toHaveProperty("image");
    });

    it("should return 404 if the product ID is not found", async () => {
      const nonExistingProductId = "non-existing-id"; // Replace this with a valid MongoDB ObjectID or a random string
      const response = await request(app).get(
        `/api/products/${nonExistingProductId}`
      );

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Product not found");
    });
  });

  describe("PUT /api/products/:id", () => {
    it("should update a specific product by ID", async () => {
      const updatedProduct = {
        name: "Updated Test Product",
        description: "This is an updated test product",
        price: 19.99,
      };

      const response = await request(app)
        .put(`/api/products/${productId}`)
        .field("name", updatedProduct.name)
        .field("description", updatedProduct.description)
        .field("price", updatedProduct.price)
        .attach(
          "image",
          Buffer.from("fake-updated-image-content"),
          "test-updated-image.jpg"
        );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", updatedProduct.name);
      expect(response.body).toHaveProperty(
        "description",
        updatedProduct.description
      );
      expect(response.body).toHaveProperty("price", updatedProduct.price);
      expect(response.body).toHaveProperty("image");
    });

    it("should return 404 if the product ID is not found", async () => {
      const nonExistingProductId = "non-existing-id"; // Replace this with a valid MongoDB ObjectID or a random string
      const response = await request(app)
        .put(`/api/products/${nonExistingProductId}`)
        .field("name", "Updated Test Product")
        .field("description", "This is an updated test product")
        .field("price", 19.99)
        .attach(
          "image",
          Buffer.from("fake-updated-image-content"),
          "test-updated-image.jpg"
        );

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Product not found");
    });
  });

  describe("DELETE /api/products/:id", () => {
    it("should delete a specific product by ID", async () => {
      const response = await request(app).delete(`/api/products/${productId}`);

      expect(response.status).toBe(204);
    });

    it("should return 404 if the product ID is not found", async () => {
      const nonExistingProductId = "non-existing-id"; // Replace this with a valid MongoDB ObjectID or a random string
      const response = await request(app).delete(
        `/api/products/${nonExistingProductId}`
      );

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Product not found");
    });
  });
});
