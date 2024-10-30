"use client"

import React, { useEffect, useState } from 'react';
import { Shop, shopApi } from '../api/shop';
import TabContent from '../components/tabContent';

const Page = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const shopData = await shopApi.getMyShop();
        setShop(shopData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load shop data');
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-700">No shop found. Please create a shop first.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-4">
            {shop.image_url && (
              <img
                src={shop.image_url}
                alt={shop.name}
                className="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
              />
            )}
            <h1 className="text-2xl font-bold text-gray-900">{shop.name}</h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-2 text-gray-700">
            <span>{shop.phone}</span>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Contact Channels:</h3>
            {shop.contact.map((contact, index) => (
              <div key={index} className="flex items-center space-x-2 text-gray-700">
                <span>{contact}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Address:</h3>
            <p className="text-gray-700">{shop.address}</p>
          </div>

          <TabContent shopId={shop._id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
