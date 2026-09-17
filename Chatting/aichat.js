const {GoogleGenAI} =require('@google/genai') ;
const GEMINI_API_KEY = "AIzaSyDugEoSlmf5rTJRRA30UPfUh9pCA-P05Ls";

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function main(msg) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents:msg
  });
  return response.text;
}

module.exports=main;