const MODEL_MAP = {
  gpt4o: 'openai/gpt-4o-mini',
  claude35: 'anthropic/claude-3.5-sonnet',
  gemini: 'google/gemini-2.0-flash-001',
  mistral: 'mistralai/mistral-7b-instruct',
  llama3: 'meta-llama/llama-3.1-8b-instruct',
};

const SYSTEM_PROMPT =
  'You are a clear AI learning assistant for machine learning, deep learning, and prompt engineering. Give concise, practical answers with short bullets and examples when useful.';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Server missing OPENROUTER_API_KEY' });
  }

  try {
    const { message, modelId = 'gpt4o' } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'A valid message is required' });
    }

    const model = MODEL_MAP[modelId] || MODEL_MAP.gpt4o;

    const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://aipramgram.vercel.app',
        'X-Title': 'AI Pramgram Playground',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
      }),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: data?.error?.message || 'OpenRouter request failed',
      });
    }

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(502).json({ error: 'No response text from model' });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Unexpected server error' });
  }
}
