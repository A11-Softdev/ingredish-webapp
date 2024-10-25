export const registerUser = async (data: {
    email: string;
    password: string;
    username: string;
  }) => {
    const response = await fetch('http://localhost:5050/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Failed to register user');
    }
  
    return response.json();
  };
  