
import React, { useState } from 'react';

interface IngredientInputProps {
  onAdd: (ingredient: string) => void;
  onRemove: (index: number) => void;
  ingredients: string[];
}

const IngredientInput: React.FC<IngredientInputProps> = ({ onAdd, onRemove, ingredients }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        보유 중인 재료 입력 (엔터를 눌러 추가)
      </label>
      <div className="flex flex-wrap gap-2 p-3 bg-white border border-gray-300 rounded-lg min-h-[50px] focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 transition-all">
        {ingredients.map((item, index) => (
          <span 
            key={index} 
            className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            {item}
            <button 
              onClick={() => onRemove(index)}
              className="ml-2 text-orange-600 hover:text-orange-900 focus:outline-none"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={ingredients.length === 0 ? "예: 달걀, 양파, 베이컨..." : ""}
          className="flex-1 outline-none min-w-[120px] bg-transparent"
        />
      </div>
    </div>
  );
};

export default IngredientInput;
