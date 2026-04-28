export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, modelId = 'gpt4o' } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Model mapping for OpenRouter
  const modelMap = {
    gpt4o: 'openai/gpt-4o',
    claude35: 'anthropic/claude-3.5-sonnet',
    gemini: 'google/gemini-pro',
    mistral: 'mistralai/mistral-7b-instruct',
    llama3: 'meta-llama/llama-3-8b-instruct',
  };

  const model = modelMap[modelId] || modelMap.gpt4o;
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: 'You are an AI learning assistant specializing in machine learning, deep learning, prompt engineering, and generative AI. Provide clear, educational responses.' },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'OpenRouter API failed');
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || 'No response from AI';

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('OpenRouter API error:', error);
    return res.status(500).json({ error: error.message || 'Failed to get AI response' });
  }
}
