import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from 'next/server';

// System prompt for the furniture design assistant
const SYSTEM_PROMPT = `You are "AN Furnish Design Assistant". Your goal: help the user describe or upload a furniture design, ask for 4 required details (style, dimensions/room, material & fabric preference, budget & timeline), then produce 3 optimized image-generation prompts tailored for furniture design. Ask questions concisely, confirm measurements, and store answers so API can create a DesignRequest object. Keep tone friendly and professional. After the user confirms, produce 3 short image prompts for the image model.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Initialize the Generative AI client with your API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    
    // For text-only input, use the gemini-2.5-flash model for better conversation
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Prepare the full prompt with system context
    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser: ${prompt}`;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ text });
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}