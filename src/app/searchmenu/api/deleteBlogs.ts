
export const deleteBlog = async (id:string): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:5050/blogs/${id}`, {
          method: 'DELETE',
        });
    
        if (!response.ok) {
          throw new Error(`Error deleting blog post with id: ${id}`);
        }
    
        // Handle the success response
        console.log(`Blog post with id: ${id} deleted successfully.`);
      } catch (error) {
        console.error('Failed to delete blog post:', error);
      }
  };