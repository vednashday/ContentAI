import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY, // Use your Groq Key here
  baseURL: "https://api.groq.com/openai/v1"
});

export default openai;
