
import React from 'react';
import { MealTime } from '../types';

interface MealTimeSelectorProps {
  selected: MealTime;
  onChange: (time: MealTime) => void;
}

const MealTimeSelector: React.FC<MealTimeSelectorProps> = ({ selected, onChange }) => {
  const options = [
    { value: MealTime.BREAKFAST, icon: '🌅', label: '아침' },
    { value: MealTime.LUNCH, icon: '☀️', label: '점심' },
    { value: MealTime.DINNER, icon: '🌙', label: '저녁' },
  ];

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">식사 시간 선택</label>
      <div className="grid grid-cols-3 gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
              selected === option.value
                ? 'bg-orange-50 border-orange-500 text-orange-700 shadow-md'
                : 'bg-white border-gray-200 text-gray-500 hover:border-orange-200'
            }`}
          >
            <span className="text-2xl mb-1">{option.icon}</span>
            <span className="font-bold">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MealTimeSelector;
