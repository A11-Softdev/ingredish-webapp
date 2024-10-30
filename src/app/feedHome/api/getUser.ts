import { UsersProps } from "../types/Users";

export const fetchUser = async (id: string): Promise<UsersProps> => {
  try {
    // Use backticks for template literals
    const response = await fetch(`http://localhost:5050/users/${id}`); // Corrected string interpolation

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    // Parse the response as JSON and cast to UsersProps type
    const user: UsersProps = await response.json();

    // Return the username from the fetched user
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; 
  }
};
