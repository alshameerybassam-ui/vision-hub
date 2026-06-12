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
    const { imageUrl, userId, orderId } = await req.json()

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Use Replicate for image enhancement
    const replicateResponse = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${Deno.env.get('REPLICATE_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: '9283608c0a29a9b6d122229631d2779d8f981c4e3f54a0e2229c34f0f6c2d6f',
        input: {
          image: imageUrl,
          scale: 2,
          face_enhance: true,
        },
      }),
    })

    const replicateData = await replicateResponse.json()

    // Update order status
    await supabaseClient
      .from('orders')
      .update({ status: 'ai_processing' })
      .eq('id', orderId)

    // Create revive request
    await supabaseClient
      .from('revive_requests')
      .insert({
        order_id: orderId,
        ai_result_url: replicateData.urls.get,
        status: 'ai_done',
      })

    return new Response(
      JSON.stringify({
        success: true,
        predictionUrl: replicateData.urls.get,
        status: 'processing',
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
