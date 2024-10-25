import React, { useState } from 'react';
import RequestOrderList from './RequestOrderList'
import ConfirmOrderList from './ConfirmOrderList';
import ShippingOrderList from './ShippingOrderList';
import ReceivedOrderList from './ReceivedOrderList';

const ButtonGroup: React.FC = () => {
  const [selected, setSelected] = useState<number>(0);

  // Sample Components to render
  const renderComponent = () => {
    switch (selected) {
      case 0:
        return <RequestOrderList/>;
      case 1:
        return <ConfirmOrderList/>;
      case 2:
        return <ShippingOrderList/>;
      case 3:
        return <ReceivedOrderList/>;
      default:
        return <RequestOrderList/>;
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <button
          onClick={() => setSelected(0)}
          className={`px-4 py-2 rounded-l-lg ${selected === 0 ? 'bg-yellow-400 text-black' : 'bg-gray-400 text-white hover:bg-gray-600'}`}
        >
          Request Orders
        </button>
        <button
          onClick={() => setSelected(1)}
          className={`px-4 py-2 ${selected === 1 ? 'bg-yellow-400 text-black' : 'bg-gray-400 text-white hover:bg-gray-600'}`}
        >
          Confirm Orders
        </button>
        <button
          onClick={() => setSelected(2)}
          className={`px-4 py-2 ${selected === 2 ? 'bg-yellow-400 text-black' : 'bg-gray-400 text-white hover:bg-gray-600'}`}
        >
          Shipping Orders
        </button>
        <button
          onClick={() => setSelected(3)}
          className={`px-4 py-2 rounded-r-lg ${selected === 3 ? 'bg-yellow-400 text-black' : 'bg-gray-400 text-white hover:bg-gray-600'}`}
        >
          Received Orders 
        </button>
      </div>
      <div className="mt-4">
        {renderComponent()}
      </div>
    </div>
  );
};

const ComponentThree = () => <div className="p-4 bg-gray-200 rounded-lg">This is Component 3</div>;
const ComponentFour = () => <div className="p-4 bg-gray-200 rounded-lg">This is Component 4</div>;

export default ButtonGroup;
