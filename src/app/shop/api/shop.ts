import axios from 'axios';
import Cookies from 'js-cookie';

interface CreateShopDto {
    name: string;
    image_url?: string;
    contact: string[];
    address: string;
    phone: string;
    product?: string[];
}

export const createShop = async (shopData: CreateShopDto): Promise<any> => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axios.post('http://localhost:5050/shops/create', shopData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                throw new Error('Authentication failed. Please log in again.');
            }
            throw new Error(error.response?.data?.message || 'Failed to create shop');
        }
        throw error;
    }
};

// For image upload (separate function)
export const uploadShopImage = async (file: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append('image', file);

        const token = Cookies.get('token');

        const response = await axios.post('/api/upload', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data.imageUrl;
    } catch (error) {
        throw new Error('Failed to upload image');
    }
};