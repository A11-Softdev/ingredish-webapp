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

const RequestOrderList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 8;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'confirm' | 'cancel' | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  // Calculate the total number of pages needed
  const totalOrders = ordersData.length;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = ordersData.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleActionClick = (action: 'confirm' | 'cancel', orderIndex: number) => {
    setActionType(action);
    setSelectedOrder(orderIndex);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    // Logic for confirming the order
    console.log(`Order ${selectedOrder} confirmed.`);
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCancel = () => {
    // Logic for canceling the order
    console.log(`Order ${selectedOrder} canceled.`);
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border">Date created</th>
            <th className="py-2 px-4 border">User</th>
            <th className="py-2 px-4 border">Order</th>
            <th className="py-2 px-4 border"></th>
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
                <button 
                  onClick={() => handleActionClick('confirm', index)} 
                  className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                >
                  Confirm
                </button>
                <button 
                  onClick={() => handleActionClick('cancel', index)} 
                  className="bg-red-500 text-white py-1 px-3 ml-2 rounded hover:bg-red-600"
                >
                  Cancel
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

      {/* Modal for confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-semibold">
              คุณแน่ใจหรือไม่ว่าต้องการ {actionType === 'confirm' ? 'ยืนยัน' : 'ยกเลิก'} คำสั่งซื้อ?
            </h2>
            <div className="mt-4 flex items-center justify-center">
              <button 
                onClick={actionType === 'confirm' ? handleConfirm : handleCancel} 
                className="bg-yellow-400 text-black py-1 px-3 rounded hover:bg-yellow-500 mr-2"
              >
                ยืนยัน
              </button>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestOrderList;
