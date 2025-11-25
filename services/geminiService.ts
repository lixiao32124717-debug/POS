import { GoogleGenAI } from "@google/genai";
import { CartItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateReceiptMessage = async (items: CartItem[]): Promise<string> => {
  try {
    const itemList = items.map(item => `${item.quantity}份${item.name}`).join('，');
    
    const prompt = `
      请为一位刚购买了以下商品的顾客写一句简短、幽默或温馨的收银条感谢语。
      商品列表: ${itemList}。
      要求：
      1. 字数在30字以内。
      2. 语气轻松活泼，带点小机智。
      3. 不要包含任何称呼（如"亲爱的顾客"），直接给句子。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text ? response.text.trim() : "谢谢光临，祝您生活愉快！";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "谢谢光临，期待您的下次到来！";
  }
};
