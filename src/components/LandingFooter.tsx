import { MessageCircle, Send, Compass, ShieldCheck } from "lucide-react";

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-vibrant-navy text-slate-400 py-16 border-t border-indigo-950" id="landing-footer">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand block */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span className="text-vibrant-coral font-black">Chotu</span>
              <span className="text-xs bg-[#4E5ACD]/20 px-2.5 py-1 rounded-full text-indigo-300 font-bold border border-[#4E5ACD]/30">
                AI Companion
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed max-w-md">
              Chotu is your trusted personal AI buddy on WhatsApp and Telegram. 
              We make cutting-edge conversational intelligence accessible to anyone, anywhere—no account logins, signups, or heavy applications required.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold font-mono">
              <ShieldCheck className="w-4 h-4 text-[#FF6B6B]" />
              <span>Full privacy guard active • Chats are private</span>
            </div>
          </div>

          {/* Direct channels */}
          <div>
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-200 mb-4 font-mono">
              Direct Channels
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/something_place_holder_chotu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-slate-400 hover:text-vibrant-coral transition font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current text-slate-500" />
                  <span>Chotu on WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/something_place_holder_chotu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-slate-400 hover:text-vibrant-indigo transition font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 fill-current text-slate-500" />
                  <span>Chotu on Telegram</span>
                </a>
              </li>
              <li>
                <span className="text-xs text-slate-500 font-medium">
                  Support hotline: +1 (555) 793-2468
                </span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-200 mb-4 font-mono">
              Resources & Privacy
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#chat-sandbox-container"
                  className="text-xs sm:text-sm text-slate-400 hover:text-vibrant-coral transition font-semibold cursor-pointer"
                >
                  Demo Live Sandbox
                </a>
              </li>
              <li>
                <a
                  href="#features-section"
                  className="text-xs sm:text-sm text-slate-400 hover:text-vibrant-coral transition font-semibold cursor-pointer"
                >
                  Explore Capabilities
                </a>
              </li>
              <li>
                <a
                  href="#pricing-section"
                  className="text-xs sm:text-sm text-slate-400 hover:text-vibrant-coral transition font-semibold cursor-pointer"
                >
                  Pricing Tiers
                </a>
              </li>
              <li>
                <span className="text-xs sm:text-sm text-slate-500 font-semibold cursor-not-allowed">
                  Terms of Service & GDPR
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footprint */}
        <div className="mt-12 pt-8 border-t border-indigo-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="text-xs text-slate-500 font-medium">
            &copy; {currentYear} ChotuBot Inc. All rights reserved. Built beautifully with care.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-600 font-bold uppercase tracking-widest font-mono">
            <Compass className="w-4 h-4 text-vibrant-coral" />
            <span>SWISS MODERN TYPOGRAPHY CHANNELS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
