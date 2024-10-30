import axios from 'axios';
import Cookies from 'js-cookie';

interface CreateBlogDto {
    image_url?: string;
    name: string;
    description: string;
    serve: number;
    time: string;
    ingredient: string[];
    kitchentools: string[];
    recipe: string[];
    IsGenerated: boolean;
}

interface Blog {
    image_url?: string;
    name: string;
    description: string;
    serve: number;
    time: string;
    ingredient: string[];
    kitchentools: string[];
    recipe: string[];
    IsGenerated: boolean;
}

const API_URL = 'http://localhost:5050';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const handleApiError = (error: any) => {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
            throw new Error('Authentication failed. Please log in again.');
        }
        throw new Error(error.response?.data?.message || 'An error occurred');
    }
    throw error;
};

export const createBlogApi = {
    createBlog: async (blogData: CreateBlogDto): Promise<Blog> => {
        try {
            const response = await apiClient.post('/blogs/create', blogData);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    }
}