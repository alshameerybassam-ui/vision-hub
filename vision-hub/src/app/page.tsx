'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Aperture, Sparkles, Award, Zap, ArrowLeft, PlayCircle,
  ImagePlus, Palette, Camera, GraduationCap,
  Star, ChevronDown, Instagram, Twitter,
  Linkedin, Youtube, Mail, Phone, MapPin, Menu, X, CheckCircle
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-primary text-white">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-md border-b border-white/10' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-yellow-500 flex items-center justify-center">
                <Aperture className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">Vision Hub</span>
                <span className="text-xs text-gray-400 block -mt-1">المنصة الإبداعية</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/revive" className="text-sm text-gray-300 hover:text-accent transition-colors">Revive</Link>
              <Link href="/frameai" className="text-sm text-gray-300 hover:text-accent transition-colors">FrameAI</Link>
              <Link href="/lens-coach" className="text-sm text-gray-300 hover:text-accent transition-colors">Lens Coach</Link>
              <Link href="/academy" className="text-sm text-gray-300 hover:text-accent transition-colors">الأكاديمية</Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login" className="hidden md:inline-flex bg-accent px-6 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-accent-hover transition-colors">
                تسجيل الدخول
              </Link>
              <button onClick={() => setMenuOpen(true)} className="md:hidden p-2">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-md p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold">القائمة</span>
            <button onClick={() => setMenuOpen(false)} className="p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <Link href="/revive" onClick={() => setMenuOpen(false)} className="text-lg py-3 border-b border-white/10 hover:text-accent">Revive</Link>
            <Link href="/frameai" onClick={() => setMenuOpen(false)} className="text-lg py-3 border-b border-white/10 hover:text-accent">FrameAI</Link>
            <Link href="/lens-coach" onClick={() => setMenuOpen(false)} className="text-lg py-3 border-b border-white/10 hover:text-accent">Lens Coach</Link>
            <Link href="/academy" onClick={() => setMenuOpen(false)} className="text-lg py-3 border-b border-white/10 hover:text-accent">الأكاديمية</Link>
            <Link href="/login" onClick={() => setMenuOpen(false)} className="bg-accent mt-4 py-3 rounded-xl text-center font-semibold">تسجيل الدخول</Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-blue-500/5" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm text-gray-300">المنصة الإبداعية الأولى من نوعها</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
                حيث يلتقي
                <span className="block mt-2 bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent">الإبداع البشري</span>
                <span className="text-white">بالذكاء</span>
                <span className="bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent">الاصطناعي</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                منصة Vision Hub تجمع بين خبرة الفريق وقوة الذكاء الاصطناعي لتقديم خدمات تصميم، 
                تحسين صور، هوية بصرية، وتدريب بمعايير احترافية.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/revive" className="bg-accent px-8 py-4 rounded-2xl text-lg font-bold text-white inline-flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors">
                  <span>استكشف خدماتنا</span>
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <Link href="/academy" className="border-2 border-white/20 px-8 py-4 rounded-2xl text-lg font-semibold inline-flex items-center justify-center gap-2 hover:border-accent hover:bg-accent/10 transition-colors">
                  <PlayCircle className="w-5 h-5" />
                  <span>الأكاديمية</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-accent" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-semibold text-sm tracking-wider uppercase">خدماتنا</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
              نظام بيئي إبداعي
              <span className="bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent">متكامل</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                icon: ImagePlus,
                title: 'Revive — إحياء الصور',
                desc: 'استعد صورك القديمة والتالفة بجودة احترافية باستخدام أحدث تقنيات الذكاء الاصطناعي',
                color: 'from-orange-500 to-red-500',
                href: '/revive'
              },
              {
                icon: Palette,
                title: 'FrameAI — الهوية البصرية',
                desc: 'ولد تصاميم فريدة ومخصصة بناءً على تفضيلاتك باستخدام الذكاء الاصطناعي المتقدم',
                color: 'from-blue-500 to-cyan-500',
                href: '/frameai'
              },
              {
                icon: Camera,
                title: 'Lens Coach — المدرب البصري',
                desc: 'احصل على تحليل AI احترافي لصورك مع تقييم دقيق واقتراحات للتحسين',
                color: 'from-green-500 to-emerald-500',
                href: '/lens-coach'
              },
              {
                icon: GraduationCap,
                title: 'AI Academy — الأكاديمية',
                desc: 'تعلم فنون التصوير والتصميم من خلال دورات تفاعلية مع شهادات معتمدة',
                color: 'from-purple-500 to-pink-500',
                href: '/academy'
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={service.href}>
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-accent/30 transition-all h-full group">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">{service.title}</h3>
                    <p className="text-gray-400 mb-6">{service.desc}</p>
                    <div className="flex items-center gap-2 text-accent font-semibold">
                      <span>اكتشف المزيد</span>
                      <ArrowLeft className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-blue-500/10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            جاهز لتحويل
            <span className="bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent">رؤيتك إلى واقع؟</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            انضم إلى مئات العملاء الذين وثقوا بـ Vision Hub
          </p>
          <Link href="/revive" className="bg-accent px-10 py-4 rounded-2xl text-lg font-bold text-white inline-flex items-center gap-2 hover:bg-accent-hover transition-colors">
            <span>ابدأ مجاناً</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-yellow-500 flex items-center justify-center">
                  <Aperture className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">Vision Hub</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">منصة إبداعية متكاملة تجمع بين الخبرة البشرية وقوة الذكاء الاصطناعي.</p>
            </div>

            <div>
              <h4 className="font-bold mb-6">الخدمات</h4>
              <ul className="space-y-3">
                <li><Link href="/revive" className="text-gray-400 hover:text-accent text-sm">Revive</Link></li>
                <li><Link href="/frameai" className="text-gray-400 hover:text-accent text-sm">FrameAI</Link></li>
                <li><Link href="/lens-coach" className="text-gray-400 hover:text-accent text-sm">Lens Coach</Link></li>
                <li><Link href="/academy" className="text-gray-400 hover:text-accent text-sm">الأكاديمية</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">الشركة</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-400 hover:text-accent text-sm">عن Vision Hub</Link></li>
                <li><Link href="/" className="text-gray-400 hover:text-accent text-sm">أعمالنا</Link></li>
                <li><Link href="/" className="text-gray-400 hover:text-accent text-sm">المدونة</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">تواصل معنا</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Mail className="w-4 h-4 text-accent" />
                  <span>hello@visionhub.com</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Phone className="w-4 h-4 text-accent" />
                  <span>+966 50 000 0000</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-500 text-sm">© 2026 Vision Hub. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
