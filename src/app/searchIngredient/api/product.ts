import { ProductProps } from "../types/product";
export const fetchProducts = async (): Promise<ProductProps> => {
    try {
      const response = await fetch('http://localhost:5050/products'); // Replace with your actual API URL
  
      // Check if the response was successful
      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.statusText}`);
      }
  
      // Parse the response as JSON and cast to Blog array type
      const products: ProductProps = await response.json();
      
      console.log(products);
      // Optionally validate the data structure
    //   if (!Array.isArray(blogs) || !blogs.every(blog => '_id' in blog && 'name' in blog && 'user_id' in blog && 'createdAt' in blog)) {
    //     throw new Error('Invalid data structure received from the API');
    //   }
  
      return products;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error; // Re-throw the error to be handled by the calling function
    }
  };