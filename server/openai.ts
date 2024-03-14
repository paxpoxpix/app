import axios from 'axios';

const OPENAI_API_URL = 'https://api.deepinfra.com/v1/openai';
const OPENAI_API_KEY = 'HpVrfBfNwUz1DDXbOxKmYczLqJEUyudV';

export async function generateAIResponse(prompt: string): Promise<string> {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        prompt,
        max_tokens: 100,
        model: google/gemma-7b-it,
        n: 1,
        stop: null,
        temperature: 0.8,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    const generatedText = response.data.choices[0].text.trim();
    return generatedText;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate AI response');
  }
}

