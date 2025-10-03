const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System prompt for the furniture design assistant
const SYSTEM_PROMPT = `You are "AN Furnish Design Assistant". Your goal: help the user describe or upload a furniture design, ask for 4 required details (style, dimensions/room, material & fabric preference, budget & timeline), then produce 3 optimized image-generation prompts tailored for Nano Banana. Ask questions concisely, confirm measurements, and store answers so API can create a DesignRequest object. Keep tone friendly and local (India). After the user confirms, produce 3 short image prompts for the image model.`;

// Function to chat with Gemini
async function chatWithGemini(message, conversationHistory = []) {
  try {
    // Create the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // Prepare the chat history
    const history = conversationHistory.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));
    
    // Start chat with history
    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });
    
    // Send message
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}

// Function to generate image prompts from conversation
async function generateImagePrompts(conversationHistory) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // Prepare the chat history
    const history = conversationHistory.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));
    
    // Start chat with history
    const chat = model.startChat({
      history: history,
    });
    
    // Ask for image prompts
    const prompt = "Based on our conversation, please generate 3 optimized image-generation prompts for Nano Banana. Each prompt should be a single line and focus on different aspects of the design. Format your response as a numbered list.";
    
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the prompts (assuming they're in a numbered list format)
    const prompts = text.split('\n')
      .filter(line => /^\d+\./.test(line))
      .map(line => line.replace(/^\d+\.\s*/, '').trim());
    
    return prompts.slice(0, 3); // Return up to 3 prompts
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}

module.exports = {
  chatWithGemini,
  generateImagePrompts,
  SYSTEM_PROMPT
};