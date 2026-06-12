import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { imageUrl, userId } = await req.json()

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Analyze with Gemini (Google AI)
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${Deno.env.get('GEMINI_API_KEY')}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: 'Analyze this photo and provide: 1) Composition score (0-100), 2) Exposure score (0-100), 3) Focus score (0-100), 4) Creativity score (0-100), 5) Three specific improvement suggestions in Arabic.' },
              { inline_data: { mime_type: 'image/jpeg', data: imageUrl } },
            ],
          }],
        }),
      }
    )

    const geminiData = await geminiResponse.json()
    const analysisText = geminiData.candidates[0].content.parts[0].text

    // Parse scores
    const scores = {
      composition: extractScore(analysisText, 'Composition') || 75,
      exposure: extractScore(analysisText, 'Exposure') || 70,
      focus: extractScore(analysisText, 'Focus') || 80,
      creativity: extractScore(analysisText, 'Creativity') || 72,
    }

    const suggestions = extractSuggestions(analysisText)

    // Save to database
    const { data, error } = await supabaseClient
      .from('lens_analysis')
      .insert({
        user_id: userId,
        ai_score: (scores.composition + scores.exposure + scores.focus + scores.creativity) / 4,
        ai_feedback: scores,
        status: 'ai_done',
      })
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({
        success: true,
        analysis: data,
        scores,
        suggestions,
        rawResponse: analysisText,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

function extractScore(text: string, category: string): number {
  const regex = new RegExp(`${category}[:\s]*(\d+)`, 'i')
  const match = text.match(regex)
  return match ? parseInt(match[1]) : 0
}

function extractSuggestions(text: string): string[] {
  const lines = text.split('\n')
  return lines.filter(line => 
    line.includes('1.') || line.includes('2.') || line.includes('3.')
  ).slice(0, 3)
}
