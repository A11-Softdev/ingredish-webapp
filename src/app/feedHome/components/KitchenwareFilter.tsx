import React, { useState } from 'react';

interface TagFilterProps {
  options: string[];
  selectedOptions: string;
  onOptionChange: (options: string) => void;
}

const KitchenwareFilter: React.FC<TagFilterProps> = ({
  options,
  selectedOptions,
  onOptionChange,
}) => {
  const [activeOptions, setActiveOptions] = useState(selectedOptions);

  const handleOptionChange = (option: string) => {
    const updatedOptions = activeOptions === option ? "" : option; // ถ้าเลือกอยู่จะลบออก ถ้าไม่เลือกจะเพิ่ม
    setActiveOptions(updatedOptions);
    onOptionChange(updatedOptions);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            activeOptions.includes(option)
              ? 'bg-black text-yellow-400'
              : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => handleOptionChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default KitchenwareFilter;
