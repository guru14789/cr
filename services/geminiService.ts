import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// In a real app, you would handle the missing key more gracefully in the UI.
const ai = new GoogleGenAI({ apiKey });

export const generateAIResponse = async (prompt: string, context?: string): Promise<string> => {
  if (!apiKey) return "API Key is missing. Please configure it.";

  try {
    const systemInstruction = `You are MediBot, an intelligent assistant for a Hospital CRM system. 
    Your goal is to assist administrators, doctors, and staff.
    You can draft emails, summarize patient histories, suggest appointment slots, and analyze data.
    Keep your responses professional, concise, and medical-context aware.
    Do not provide actual medical advice for treatment; focus on administrative and operational support.
    
    Current Context: ${context || 'General CRM usage'}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error communicating with the AI service.";
  }
};