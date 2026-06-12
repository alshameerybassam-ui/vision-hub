# Vision Hub - AI Integration Setup Guide

## 🚀 Free AI Services Integration

### 1. OpenAI (DALL-E 3) - For FrameAI
**Website:** https://platform.openai.com
**Steps:**
1. Create account (free $5 credit)
2. Go to API Keys → Create new secret key
3. Copy key and add to Vercel Environment Variables:
   - `NEXT_PUBLIC_OPENAI_API_KEY`

**Usage:** Brand design generation (FrameAI)

---

### 2. Google AI Studio (Gemini Pro) - For Lens Coach
**Website:** https://aistudio.google.com
**Steps:**
1. Sign in with Google account
2. Go to API Keys → Get API key
3. Copy key and add to Vercel:
   - `NEXT_PUBLIC_GEMINI_API_KEY`

**Usage:** Photo analysis and scoring (Lens Coach)

---

### 3. Replicate - For Revive
**Website:** https://replicate.com
**Steps:**
1. Create account (free $5 credit)
2. Go to Account → API Tokens
3. Copy token and add to Vercel:
   - `NEXT_PUBLIC_REPLICATE_API_KEY`

**Usage:** Image enhancement and upscaling (Revive)

---

### 4. Hugging Face - For General AI
**Website:** https://huggingface.co
**Steps:**
1. Create account (free)
2. Go to Settings → Access Tokens
3. Create new token and add to Vercel:
   - `NEXT_PUBLIC_HUGGINGFACE_API_KEY`

**Usage:** Various AI models for image processing

---

## 🔧 Supabase Edge Functions Setup

### Deploy Functions:
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link your project
supabase link --project-ref mxtaiccaklljjaevumpo

# Deploy functions
supabase functions deploy lens-analysis
supabase functions deploy revive-image
supabase functions deploy generate-designs
```

### Set Environment Variables in Supabase:
Go to Supabase Dashboard → Settings → API → Edge Functions

Add these secrets:
- `GEMINI_API_KEY` (from Google AI Studio)
- `REPLICATE_API_KEY` (from Replicate)
- `OPENAI_API_KEY` (from OpenAI)

---

## 📊 Free Tier Limits

| Service | Free Limit | Reset |
|---------|-----------|-------|
| OpenAI | $5 credit | One-time |
| Gemini | 60 requests/min | Per minute |
| Replicate | $5 credit | One-time |
| Hugging Face | 30K requests/month | Monthly |
| Supabase Functions | 500K requests/month | Monthly |

---

## 🎯 Next Steps

1. ✅ Sign up for all services above
2. ✅ Get API keys
3. ✅ Add keys to Vercel Environment Variables
4. ✅ Deploy Supabase Edge Functions
5. ✅ Test each service

---

## 💡 Tips for Staying Free

- Use **Gemini** for most tasks (most generous free tier)
- Cache results to reduce API calls
- Use **Hugging Face** for simple tasks (completely free)
- Monitor usage in each dashboard

---

## 🆘 Support

If you need help:
- OpenAI: https://help.openai.com
- Google AI: https://ai.google.dev
- Replicate: https://replicate.com/docs
- Supabase: https://supabase.com/docs
