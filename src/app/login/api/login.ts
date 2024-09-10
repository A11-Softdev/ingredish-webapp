export const login = async (data: {
    username: string;
    password: string;
}) => {
    const response = await fetch ('http://localhost:5050/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to login');
    }

    return response.json();
}