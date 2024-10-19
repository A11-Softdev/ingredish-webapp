import React, { useState } from 'react';

interface Order {
  dateCreated: string;
  shopName: string;
  email: string;
  orderLink: string;
}

const ordersData: Order[] = [
  { dateCreated: '9:30:31 14/08/2024', shopName: 'John Doe', email: 'john@example.com', orderLink: '/orderDetail' },
  { dateCreated: '9:30:31 14/08/2024', shopName: 'John Doe', email: 'john@example.com', orderLink: '/orderDetail' },
  { dateCreated: '9:30:31 14/08/2024', shopName: 'John Doe', email: 'john@example.com', orderLink: '/orderDetail' },
  { dateCreated: '9:30:31 14/08/2024', shopName: 'John Doe', email: 'john@example.com', orderLink: '/orderDetail' },
  { dateCreated: '9:30:31 14/08/2024', shopName: 'John Doe', email: 'john@example.com', orderLink: '/orderDetail' },
  { dateCreated: '9:30:31 14/08/2024', shopName: 'John Doe', email: 'john@example.com', orderLink: '/orderDetail' },
  { dateCreated: '9:30:31 14/08/2024', shopName: 'John Doe', email: 'john@example.com', orderLink: '/orderDetail' },
  { dateCreated: '9:30:31 14/08/2024', shopName: 'John Doe', email: 'john@example.com', orderLink: '/orderDetail' },
  { dateCreated: '9:30:31 14/08/2024', shopName: 'John Doe', email: 'john@example.com', orderLink: '/orderDetail' },
  { dateCreated: '9:30:31 14/08/2024', shopName: 'John Doe', email: 'john@example.com', orderLink: '/orderDetail' },
  { dateCreated: '9:30:31 14/08/2024', shopName: 'John Doe', email: 'john@example.com', orderLink: '/orderDetail' },
  { dateCreated: '9:30:31 14/08/2024', shopName: 'John Doe', email: 'john@example.com', orderLink: '/orderDetail' },
  { dateCreated: '9:30:31 14/08/2024', shopName: 'John Doe', email: 'john@example.com', orderLink: '/orderDetail' },
  { dateCreated: '9:30:31 14/08/2024', shopName: 'John Doe', email: 'john@example.com', orderLink: '/orderDetail' },
  { dateCreated: '9:30:31 14/08/2024', shopName: 'John Doe', email: 'john@example.com', orderLink: '/orderDetail' },
  { dateCreated: '9:30:31 14/08/2024', shopName: 'John Doe', email: 'john@example.com', orderLink: '/orderDetail' },
  { dateCreated: '9:30:31 14/08/2024', shopName: 'John Doe', email: 'john@example.com', orderLink: '/orderDetail' },
  { dateCreated: '9:30:31 14/08/2024', shopName: 'John Doe', email: 'john@example.com', orderLink: '/orderDetail' },
    // Add more orders if needed
];

const ShippingOrderList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 8;

  // Calculate the total number of pages needed
  const totalOrders = ordersData.length;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = ordersData.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border">Date created</th>
            <th className="py-2 px-4 border">User</th>
            <th className="py-2 px-4 border">Order</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="py-2 px-4 border">{order.dateCreated}</td>
              <td className="py-2 px-4 border">
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="shop"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{order.shopName}</p>
                    <p className="text-gray-500 text-sm">{order.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-2 px-4 border">
                <a href={order.orderLink} className="text-blue-500 hover:underline">
                  View Order
                </a>
              </td>
              <td className="py-2 px-4 border">
                <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600">
                  Shipping
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="py-2 px-4 border rounded-l-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`py-2 px-4 border ${
              currentPage === index + 1 ? 'bg-yellow-400' : 'bg-gray-200'
            } hover:bg-gray-300`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="py-2 px-4 border rounded-r-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShippingOrderList;
