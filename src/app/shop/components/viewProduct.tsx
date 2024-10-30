import React, { useEffect, useState } from 'react';
import { Product, shopApi } from "../api/shop";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AllProductsProps {
    shopId: string;
}

const AllProducts: React.FC<AllProductsProps> = ({ shopId }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const itemsPerPage = 20;

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage, shopId]);

    const fetchProducts = async (page: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await shopApi.getProducts(shopId, page, itemsPerPage);
            setProducts(response.items);
            setTotalPages(response.totalPages);
        } catch (err) {
            setError("Failed to load products. Please try again later.");
            console.error("Error fetching products:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const maxButtons = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (endPage - startPage + 1 < maxButtons) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-4 py-2 mx-1 rounded ${currentPage === i
                        ? "bg-dark-yellow text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                >
                    {i}
                </button>
            );
        }

        return buttons;
    };

    if (isLoading) {
        return <div className="flex justify-center p-8">Loading products...</div>;
    }

    if (error) {
        return (
            <div className="text-red-600 p-4 text-center bg-red-50 rounded">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 p-9">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="border-2 rounded-lg p-4 hover:shadow-lg transition-shadow flex gap-4"
                    >
                        <div className="flex-shrink-0">
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-20 h-20 object-cover rounded"
                            />
                        </div>
                        <div className="flex-grow space-y-2">
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-600 font-medium">฿{product.price}</p>
                                <p className="text-sm text-gray-500">เหลือ: {product.amount}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center space-x-2 py-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {renderPaginationButtons()}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default AllProducts;
