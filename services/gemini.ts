
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

export const enhanceTaskDescription = async (title: string, currentDesc: string): Promise<string> => {
  if (!API_KEY) return currentDesc;
  
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Enhance this task description to be more professional and clear for a productivity app. 
      Task Title: "${title}"
      Current Description: "${currentDesc || 'None'}"
      Keep it brief (1-2 sentences). Return ONLY the enhanced text.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 100,
      }
    });
    
    return response.text || currentDesc;
  } catch (error) {
    console.error("Gemini Error:", error);
    return currentDesc;
  }
};
