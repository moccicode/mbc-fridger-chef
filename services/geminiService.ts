
import { GoogleGenAI, Type } from "@google/genai";
import { MealTime, Recipe } from "../types";

const API_KEY = process.env.API_KEY || "";

export const generateRecipes = async (ingredients: string[], mealTime: MealTime): Promise<Recipe[]> => {
  if (!API_KEY) {
    throw new Error("API_KEY가 설정되지 않았습니다.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const prompt = `사용자의 냉장고에 있는 재료들: ${ingredients.join(", ")}.
이 재료들을 주재료로 활용하여 ${mealTime} 식사로 적합한 요리 레시피 3가지를 추천해줘.
냉장고에 없는 기본 양념(소금, 후추, 간장, 설탕 등)은 사용 가능하다고 가정해.
한국어로 응답하고, 각 레시피는 이름, 짧은 설명, 필요한 상세 재료 목록, 단계별 조리법, 예상 조리 시간, 난이도, 예상 칼로리를 포함해야 해.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              ingredients: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              instructions: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              cookingTime: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              calories: { type: Type.STRING }
            },
            required: ["name", "description", "ingredients", "instructions", "cookingTime", "difficulty", "calories"]
          }
        }
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("응답을 받지 못했습니다.");
    
    return JSON.parse(resultText) as Recipe[];
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
