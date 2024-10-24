import axios from 'axios';
import Cookies from 'js-cookie';

interface UserProfile {
    _id: string;
    username: string;
    email: string;
    image_url: string;
    role: 'customer' | 'admin' | 'shop';
}

export const getProfile = async (): Promise<UserProfile> => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axios.get('http://localhost:5050/users/profile', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.data) {
            throw new Error('No data received from profile endpoint');
        }

        return response.data as UserProfile;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                Cookies.remove('token');
                throw new Error('Authentication failed. Please log in again.');
            }
            throw new Error(`Failed to fetch profile: ${error.response?.data?.message || error.message}`);
        }
        throw error;
    }
}
