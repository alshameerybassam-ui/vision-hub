import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vision Hub',
  description: 'منصة الإبداع البصري المتكاملة',
  keywords: 'تصميم, تصوير, هوية بصرية, ذكاء اصطناعي, تدريب, Vision Hub',
  authors: [{ name: 'Vision Hub Team' }],
  openGraph: {
    title: 'Vision Hub',
    description: 'حيث يلتقي الإبداع البشري بالذكاء الاصطناعي',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#0A0A0A" />
      </head>
      <body className="font-arabic">
        {children}
      </body>
    </html>
  )
}
