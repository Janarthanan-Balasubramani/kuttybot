import { MessageCircle, Send, Star, Users } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-radial from-vibrant-bg via-slate-100 to-indigo-50/40 py-16 sm:py-24" id="hero-section">
      {/* Decorative backdrop elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-vibrant-coral/10 blur-3xl opacity-60 pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-vibrant-indigo/10 blur-3xl opacity-50 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
        <div className="mx-auto max-w-3xl">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-vibrant-coral/10 text-vibrant-coral font-bold text-xs tracking-wide uppercase mb-6 border border-vibrant-coral/20 shadow-xs animate-pulse">
            <span className="w-2 h-2 rounded-full bg-vibrant-coral" />
            <span>Award Winning AI Assistant</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibrant-coral to-vibrant-orange">Chotu</span>, Your AI Buddy On <span className="text-vibrant-indigo">WhatsApp</span> & <span className="text-vibrant-coral">Telegram</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Get instant answers, beautiful images, fast math solutions, and flawless coding tutor help directly inside your favorite messaging apps. No logins, no downloads, 100% helper speed.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/something_place_holder_chotu?text=Hello+Chotu"
              target="_blank"
              rel="noopener noreferrer"
              id="cta-whatsapp-hero"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-tr from-vibrant-coral to-vibrant-orange text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-[#FF6B6B]/20 hover:-translate-y-0.5 active:translate-y-0 shadow-md transition flex items-center justify-center gap-2.5 text-base cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Add to WhatsApp</span>
            </a>

            <a
              href="https://t.me/something_place_holder_chotu"
              target="_blank"
              rel="noopener noreferrer"
              id="cta-telegram-hero"
              className="w-full sm:w-auto px-8 py-4 bg-vibrant-indigo text-white rounded-2xl font-bold hover:bg-vibrant-indigo/90 hover:shadow-lg hover:shadow-vibrant-indigo/20 hover:-translate-y-0.5 active:translate-y-0 shadow-md transition flex items-center justify-center gap-2.5 text-base cursor-pointer"
            >
              <Send className="w-5 h-5 fill-current" />
              <span>Add to Telegram</span>
            </a>
          </div>

          {/* Security alert notification */}
          <div className="mt-6 inline-flex items-center gap-2 text-xs bg-slate-200/60 text-slate-600 px-4 py-2 rounded-xl font-medium border border-slate-300/40">
            <Users className="w-4 h-4 text-orange-500" />
            <span>Trusted by over <strong>150,000+ active students, builders, and moms</strong> worldwide</span>
          </div>

          {/* Star review ratings */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
              ))}
            </div>
            <span className="text-xs text-slate-500 font-bold">
              4.9/5 Rating (from 12,000+ verified chats)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
