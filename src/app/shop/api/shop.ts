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

export interface Shop {
    _id: string;
    name: string;
    image_url: string;
    contact: string[];
    address: string;
    phone: string;
    product: string[];
}

export interface Product {
    _id: string;
    name: string;
    price: number;
    amount: number;
    image_url?: string;
    shopId: string;
    description: string;
    created_at: string;
    updated_at: string;
}

interface PaginatedResponse {
    items: Product[];
    total: number;
    page: number;
    totalPages: number;
}

export interface CreateProductDto {
    amount: number;
    name: string;
    price: number;
    description?: string;
    image_url?: string;
}

export interface Order {
    _id: string;
    shop_id: string;
    customer_id: string;
    products: {
        product_id: string;
        quantity: number;
        price: number;
    }[];
    total_amount: number;
    status: 'pending' | 'paid' | 'completed' | 'cancelled';
    created_at: string;
    updated_at: string;
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

export const shopApi = {
    createShop: async (shopData: CreateShopDto): Promise<Shop> => {
        try {
            const response = await apiClient.post('/shops/create', shopData);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    getMyShop: async (): Promise<Shop> => {
        try {
            const response = await apiClient.get('/shops/myshop');
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    getProducts: async (
        shopId: string,
        page: number = 1,
        limit: number = 10,
        search?: string
    ): Promise<PaginatedResponse> => {
        try {
            const response = await apiClient.get(`/products/shop/${shopId}`, {
                params: {
                    page,
                    limit,
                    search,
                },
            });
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    createProduct: async (
        productData: CreateProductDto
    ): Promise<Product> => {
        try {
            const response = await apiClient.post(
                `/products/create`,
                productData
            );
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    updateProduct: async (
        shopId: string,
        productId: string,
        productData: Partial<CreateProductDto>
    ): Promise<Product> => {
        try {
            const response = await apiClient.put(
                `/shops/${shopId}/products/${productId}`,
                productData
            );
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    deleteProduct: async (shopId: string, productId: string): Promise<void> => {
        try {
            await apiClient.delete(`/shops/${shopId}/products/${productId}`);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    getOrders: async (
        shopId: string,
        page: number = 1,
        limit: number = 10,
        status?: Order['status']
    ): Promise<Order[]> => {
        try {
            const response = await apiClient.get(`/shops/${shopId}/orders`, {
                params: {
                    page,
                    limit,
                    status,
                },
            });
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    updateOrderStatus: async (
        shopId: string,
        orderId: string,
        status: Order['status']
    ): Promise<Order> => {
        try {
            const response = await apiClient.patch(
                `/shops/${shopId}/orders/${orderId}/status`,
                { status }
            );
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },
};
