import { createClient } from '@/lib/supabase/client'

// ===== OpenAI API (ChatGPT, DALL-E) =====
// $5 free credit for new accounts
// https://platform.openai.com

export async function generateImageWithDALLE(prompt: string) {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    }),
  })

  const data = await response.json()
  return data.data[0].url
}

// ===== Google AI Studio (Gemini Pro) =====
// Free tier available
// https://aistudio.google.com

export async function analyzeWithGemini(imageBase64: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: 'Analyze this photo and provide feedback on composition, lighting, and creativity. Give a score out of 100 for each.' },
            { inline_data: { mime_type: 'image/jpeg', data: imageBase64 } },
          ],
        }],
      }),
    }
  )

  const data = await response.json()
  return data.candidates[0].content.parts[0].text
}

// ===== Hugging Face (Free AI Models) =====
// https://huggingface.co

export async function enhanceImageWithHuggingFace(imageUrl: string) {
  const response = await fetch(
    'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: imageUrl }),
    }
  )

  const blob = await response.blob()
  return URL.createObjectURL(blob)
}

// ===== Replicate (Image Generation) =====
// $5 free credit
// https://replicate.com

export async function generateWithReplicate(prompt: string) {
  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: 'db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf',
      input: { prompt: prompt },
    }),
  })

  const data = await response.json()
  return data.urls.get
}

// ===== Supabase Edge Functions (Serverless AI) =====
// Free tier: 500K requests/month

export async function callSupabaseEdgeFunction(functionName: string, payload: any) {
  const supabase = createClient()

  const { data, error } = await supabase.functions.invoke(functionName, {
    body: payload,
  })

  if (error) throw error
  return data
}
