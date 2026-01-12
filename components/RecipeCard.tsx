
import React from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full transform transition-transform hover:scale-[1.02]">
      <div className="bg-orange-500 p-4 text-white">
        <h3 className="text-xl font-bold">{recipe.name}</h3>
        <p className="text-orange-100 text-sm mt-1">{recipe.description}</p>
      </div>
      
      <div className="p-5 flex-1 space-y-4">
        <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="flex items-center">
            <span className="mr-1">🕒</span> {recipe.cookingTime}
          </div>
          <div className="flex items-center">
            <span className="mr-1">🔥</span> {recipe.calories}
          </div>
          <div className="flex items-center">
            <span className="mr-1">⭐</span> {recipe.difficulty}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-gray-800 mb-2 flex items-center">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
            필요 재료
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {recipe.ingredients.map((ing, i) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {ing}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-gray-800 mb-2 flex items-center">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
            조리 순서
          </h4>
          <ol className="text-sm text-gray-600 space-y-2">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-orange-500 font-bold shrink-0">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
