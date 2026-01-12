
import React, { useState, useCallback } from 'react';
import { MealTime, Recipe } from './types';
import { generateRecipes } from './services/geminiService';
import IngredientInput from './components/IngredientInput';
import MealTimeSelector from './components/MealTimeSelector';
import RecipeCard from './components/RecipeCard';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [mealTime, setMealTime] = useState<MealTime>(MealTime.LUNCH);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddIngredient = (item: string) => {
    if (!ingredients.includes(item)) {
      setIngredients([...ingredients, item]);
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      alert("최소 한 가지 이상의 재료를 입력해주세요!");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await generateRecipes(ingredients, mealTime);
      setRecipes(result);
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError("레시피를 생성하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-orange-500 text-white py-8 px-4 shadow-lg mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">🥕 냉장고 셰프</h1>
          <p className="text-orange-100 font-medium">냉장고에 남은 재료로 만드는 근사한 한 끼!</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Input Section */}
        <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
          <IngredientInput 
            ingredients={ingredients} 
            onAdd={handleAddIngredient} 
            onRemove={handleRemoveIngredient} 
          />
          
          <MealTimeSelector 
            selected={mealTime} 
            onChange={setMealTime} 
          />

          <button
            onClick={handleGenerate}
            disabled={isLoading || ingredients.length === 0}
            className={`w-full py-4 rounded-xl text-lg font-bold transition-all transform active:scale-95 ${
              isLoading || ingredients.length === 0
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-200'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                AI 셰프가 레시피를 구상 중...
              </span>
            ) : "맛있는 레시피 3가지 제안받기"}
          </button>
        </section>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Results Section */}
        {recipes.length > 0 && (
          <section id="results" className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                오늘 {mealTime}을 위한 추천 메뉴
              </h2>
              <span className="text-orange-500 font-bold bg-orange-50 px-3 py-1 rounded-full text-sm">
                총 3개 발견
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
            </div>
            
            <div className="text-center pt-8">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-gray-400 hover:text-orange-500 font-medium transition-colors"
              >
                처음으로 돌아가기 ↑
              </button>
            </div>
          </section>
        )}

        {/* Empty State */}
        {!isLoading && recipes.length === 0 && !error && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-6xl mb-4 opacity-20">🥘</div>
            <p className="text-lg">냉장고 속 재료를 입력하고 추천 버튼을 눌러보세요!</p>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm mt-12 pb-8">
        © {new Date().getFullYear()} 냉장고 셰프 Powered by Gemini AI
      </footer>
    </div>
  );
};

export default App;
