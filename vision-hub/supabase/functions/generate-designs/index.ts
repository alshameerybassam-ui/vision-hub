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
    const { questionnaire, userId, orderId } = await req.json()

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Generate prompt from questionnaire
    const prompt = generateDesignPrompt(questionnaire)

    // Use DALL-E 3 for design generation
    const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 4,
        size: '1024x1024',
      }),
    })

    const openaiData = await openaiResponse.json()
    const designs = openaiData.data.map((img: any) => img.url)

    // Save designs
    await supabaseClient
      .from('brand_designs')
      .insert({
        order_id: orderId,
        user_id: userId,
        questionnaire,
        ai_designs: designs,
        status: 'ai_generating',
      })

    // Update order
    await supabaseClient
      .from('orders')
      .update({ status: 'ai_processing' })
      .eq('id', orderId)

    return new Response(
      JSON.stringify({
        success: true,
        designs,
        status: 'ai_generating',
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

function generateDesignPrompt(q: any): string {
  const colors = q.color === 'warm' ? 'warm orange and gold colors' : 
                 q.color === 'cool' ? 'cool blue and cyan colors' :
                 q.color === 'neutral' ? 'neutral gray and white colors' :
                 'vibrant purple and pink colors'

  const style = q.style === 'minimal' ? 'minimalist clean design' :
                q.style === 'modern' ? 'modern sleek design' :
                q.style === 'classic' ? 'classic elegant design' :
                'artistic creative design'

  return `Professional brand identity design for ${q.field} company, ${colors}, ${style}, ${q.feeling} mood, high quality, vector style, suitable for logo and branding`
}
