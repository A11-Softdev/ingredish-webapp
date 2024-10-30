import React, { useEffect, useState } from 'react';
import { X, Plus, Package, ClipboardList } from 'lucide-react';
import { AddProduct } from './addProduct';
import AllProducts from './viewProduct';

interface TabContentProps {
    shopId: string;
}

const TabContent: React.FC<TabContentProps> = ({ shopId }) => {
    const [activeTab, setActiveTab] = useState('all-products');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);

    const ViewOrders = () => {
        return (
            <div></div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto p-4">
                    <div className="flex flex-wrap gap-6 items-center">
                        <div className="flex gap-4">
                            <button
                                className={`flex items-center gap-2 px-2 py-1 font-medium ${activeTab === 'all-products'
                                    ? 'text-dark-yellow border-b-2 border-dark-yellow'
                                    : 'text-gray-600 hover:text-dark-yellow'
                                    }`}
                                onClick={() => setActiveTab('all-products')}
                            >
                                <Package size={20} />
                                สินค้าทั้งหมด
                            </button>
                            <button
                                className={`flex items-center gap-2 px-2 py-1 font-medium ${activeTab === 'add-product'
                                    ? 'text-dark-yellow border-b-2 border-dark-yellow'
                                    : 'text-gray-600 hover:text-dark-yellow'
                                    }`}
                                onClick={() => setActiveTab('add-product')}
                            >
                                <Plus size={20} />
                                เพิ่มสินค้า
                            </button>
                            <button
                                className={`flex items-center gap-2 px-2 py-1 font-medium ${activeTab === 'view-orders'
                                    ? 'text-dark-yellow border-b-2 border-dark-yellow'
                                    : 'text-gray-600 hover:text-dark-yellow'
                                    }`}
                                onClick={() => setActiveTab('view-orders')}
                            >
                                <ClipboardList size={20} />
                                ดู Order
                            </button>
                        </div>

                        {activeTab === 'all-products' && (
                            <div className="flex-1 flex gap-2 items-center">
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setPage(1);
                                    }}
                                    className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-800 text-white flex items-center gap-2"
                                >
                                    ล้างการค้นหา
                                    <X size={16} />
                                </button>

                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="พิมพ์เพื่อค้นหา..."
                                        className="w-full px-4 py-2 pr-12 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={() => setPage(1)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-white rounded"
                                    >
                                        ค้นหา
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-6">
                {activeTab === 'all-products' && <AllProducts shopId={shopId} />}
                {activeTab === 'add-product' && <AddProduct />}
                {activeTab === 'view-orders' && <ViewOrders />}
            </div>
        </div>
    );
};

export default TabContent;
