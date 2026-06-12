'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Aperture, Sparkles, ArrowLeft, PlayCircle,
  ImagePlus, Palette, Camera, GraduationCap,
  ChevronDown, Instagram, Twitter,
  Linkedin, Youtube, Mail, Phone, Menu, X
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF7A00] to-[#FFD700] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#FFD700] flex items-center justify-center"
              >
                <Aperture className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <span className="text-xl font-bold">Vision Hub</span>
                <span className="text-xs text-gray-400 block -mt-1">المنصة الإبداعية</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {['Revive', 'FrameAI', 'Lens Coach', 'الأكاديمية'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-gray-300 hover:text-[#FF7A00] transition-colors relative group">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF7A00] transition-all group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login" className="hidden md:inline-flex bg-gradient-to-r from-[#FF7A00] to-[#E56D00] px-6 py-2.5 rounded-xl text-sm font-semibold text-white hover:shadow-[0_0_20px_rgba(255,122,0,0.4)] transition-all">
                تسجيل الدخول
              </Link>
              <button onClick={() => setMenuOpen(true)} className="md:hidden p-2">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: menuOpen ? 0 : '100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-50 bg-[#0A0A0A]/98 backdrop-blur-xl p-6"
      >
        <div className="flex justify-between items-center mb-8">
          <span className="text-xl font-bold">القائمة</span>
          <button onClick={() => setMenuOpen(false)} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {['Revive', 'FrameAI', 'Lens Coach', 'الأكاديمية'].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMenuOpen(false)} className="text-lg py-3 border-b border-white/10 hover:text-[#FF7A00] transition-colors block">
                {item}
              </Link>
            </motion.div>
          ))}
          <Link href="/login" onClick={() => setMenuOpen(false)} className="bg-gradient-to-r from-[#FF7A00] to-[#E56D00] mt-4 py-3 rounded-xl text-center font-semibold">
            تسجيل الدخول
          </Link>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF7A00]/20 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-[128px] animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
                <span className="text-sm text-gray-300">المنصة الإبداعية الأولى من نوعها</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  حيث يلتقي
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="block mt-2 bg-gradient-to-r from-[#FF7A00] to-[#FFD700] bg-clip-text text-transparent"
                >
                  الإبداع البشري
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  بالذكاء
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  className="bg-gradient-to-r from-[#FF7A00] to-[#FFD700] bg-clip-text text-transparent"
                >
                  الاصطناعي
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                منصة Vision Hub تجمع بين خبرة الفريق وقوة الذكاء الاصطناعي لتقديم خدمات تصميم، 
                تحسين صور، هوية بصرية، وتدريب بمعايير احترافية.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/revive" className="bg-gradient-to-r from-[#FF7A00] to-[#E56D00] px-8 py-4 rounded-2xl text-lg font-bold text-white inline-flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(255,122,0,0.4)] transition-all">
                    <span>استكشف خدماتنا</span>
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/academy" className="border-2 border-white/20 px-8 py-4 rounded-2xl text-lg font-semibold inline-flex items-center justify-center gap-2 hover:border-[#FF7A00] hover:bg-[#FF7A00]/10 transition-all">
                    <PlayCircle className="w-5 h-5" />
                    <span>الأكاديمية</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-[#FF7A00]" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#FF7A00] font-semibold text-sm tracking-wider uppercase">خدماتنا</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
              نظام بيئي إبداعي
              <span className="bg-gradient-to-r from-[#FF7A00] to-[#FFD700] bg-clip-text text-transparent"> متكامل</span>
            </h2>
          </motion.div>

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
                whileHover={{ y: -10 }}
              >
                <Link href={service.href}>
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-[#FF7A00]/30 transition-all h-full group">
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[#FF7A00] transition-colors">{service.title}</h3>
                    <p className="text-gray-400 mb-6">{service.desc}</p>
                    <div className="flex items-center gap-2 text-[#FF7A00] font-semibold group-hover:gap-4 transition-all">
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A00]/10 to-[#1E3A5F]/10" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            جاهز لتحويل
            <span className="bg-gradient-to-r from-[#FF7A00] to-[#FFD700] bg-clip-text text-transparent"> رؤيتك إلى واقع؟</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            انضم إلى مئات العملاء الذين وثقوا بـ Vision Hub
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/revive" className="bg-gradient-to-r from-[#FF7A00] to-[#E56D00] px-10 py-4 rounded-2xl text-lg font-bold text-white inline-flex items-center gap-2 hover:shadow-[0_0_30px_rgba(255,122,0,0.4)] transition-all">
              <span>ابدأ مجاناً</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A]/50 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#FFD700] flex items-center justify-center">
                  <Aperture className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">Vision Hub</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">منصة إبداعية متكاملة تجمع بين الخبرة البشرية وقوة الذكاء الاصطناعي.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-bold mb-6">الخدمات</h4>
              <ul className="space-y-3">
                <li><Link href="/revive" className="text-gray-400 hover:text-[#FF7A00] text-sm transition-colors">Revive</Link></li>
                <li><Link href="/frameai" className="text-gray-400 hover:text-[#FF7A00] text-sm transition-colors">FrameAI</Link></li>
                <li><Link href="/lens-coach" className="text-gray-400 hover:text-[#FF7A00] text-sm transition-colors">Lens Coach</Link></li>
                <li><Link href="/academy" className="text-gray-400 hover:text-[#FF7A00] text-sm transition-colors">الأكاديمية</Link></li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-bold mb-6">الشركة</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-400 hover:text-[#FF7A00] text-sm transition-colors">عن Vision Hub</Link></li>
                <li><Link href="/" className="text-gray-400 hover:text-[#FF7A00] text-sm transition-colors">أعمالنا</Link></li>
                <li><Link href="/" className="text-gray-400 hover:text-[#FF7A00] text-sm transition-colors">المدونة</Link></li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="font-bold mb-6">تواصل معنا</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Mail className="w-4 h-4 text-[#FF7A00]" />
                  <span>hello@visionhub.com</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Phone className="w-4 h-4 text-[#FF7A00]" />
                  <span>+966 50 000 0000</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-500 text-sm">© 2026 Vision Hub. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
