/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'mxtaiccaklljjaevumpo.supabase.co'],
    unoptimized: true, // Required for static export or when using external images
  },
  // Remove output: 'export' for dynamic routes to work
  // output: 'export',
}

module.exports = nextConfig
