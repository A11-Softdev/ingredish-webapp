import { BlogsProps } from "../types/LongCardTypes";
export const fetchBlogs = async (page:number = 1, limit:number = 5,search:string=''): Promise<BlogsProps> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer 427622c2e0ecc5226bd502ac4ea6a27274f569b33b516a2fba680bdae63f9b34371a915404a4e47e0d357f3d9242ead0c9afe1ae6838fddb62131497ef42467d`, // Add the JWT token to the Authorization header
        },
      };
      // console.log("Page changed to:", page);
      const url = new URL('http://localhost:5050/blogs');
      url.searchParams.append('page', page.toString());
      url.searchParams.append('limit', limit.toString());
      if (search === "AI" || search === "ผู้ใช้งาน" || search == "ทั้งหมด") search = '';
      if (search) {
        url.searchParams.append('search', search); // Add search parameter if present
      }

      

      const response = await fetch(url.toString(), config); // Replace with your actual API URL
  
      // Check if the response was successful
      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.statusText}`);
      }
  
      // Parse the response as JSON and cast to Blog array type
      const blogs: BlogsProps = await response.json();
      
  
      // Optionally validate the data structure
    //   if (!Array.isArray(blogs) || !blogs.every(blog => '_id' in blog && 'name' in blog && 'user_id' in blog && 'createdAt' in blog)) {
    //     throw new Error('Invalid data structure received from the API');
    //   }
  
      return blogs;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error; // Re-throw the error to be handled by the calling function
    }
  };