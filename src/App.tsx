import React, { useState, useEffect, useRef } from "react";
import { 
  MessageCircle, 
  Send, 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight, 
  ShoppingCart, 
  Cpu, 
  Volume2, 
  ShieldAlert, 
  Monitor, 
  Wifi, 
  Smartphone, 
  Check, 
  CheckCheck, 
  Mic, 
  Paperclip, 
  Image as ImageIcon, 
  RefreshCw, 
  BookOpen, 
  Users, 
  CheckCircle2,
  ChevronRight,
  Heart,
  Settings,
  HelpCircle,
  Eye,
  Info
} from "lucide-react";
import { ChatMessage } from "./types";
import { samplePrompts } from "./data";

export default function App() {
  // Navigation & Menu States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Active Main Product Image
  const [activeImage, setActiveImage] = useState("/assets/productImg.webp");
  const productImages = [
    { src: "/assets/productImg.webp", label: "Classic White" },
    { src: "/assets/m1.webp", label: "Variant 1" },
    { src: "/assets/m2.webp", label: "Variant 2" },
    { src: "/assets/m3.webp", label: "Variant 3" }
  ];

  // Active Lite Product Image
  const [activeLiteImage, setActiveLiteImage] = useState("/assets/bottomimg.webp");
  const liteImages = [
    { src: "/assets/bottomimg.webp", label: "Pink Base" },
    { src: "/assets/productImg.webp", label: "Classic White" },
    { src: "/assets/cUb2QbY8icjLfv42dvMClfFYoIA.jpeg.webp", label: "Deep Black" }
  ];

  // Checkout Modal State
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [checkoutProduct, setCheckoutProduct] = useState({ name: "KUTTYBOTT", price: "₹2,999" });
  const [formData, setFormData] = useState({ name: "", email: "", address: "", phone: "" });

  // Simulator State (Collapsible Sidebar/Drawer)
  const [showSimulator, setShowSimulator] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "KUTTYBOTT",
      text: "Namaste! Boss, I am KUTTYBOTT. I run inside this desktop robot body, but you can also link me to WhatsApp & Telegram! 🌟\n\nHow can I help you today? Type a question below or choose a suggestion!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messageType: "text",
      status: "read"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activePlatform, setActivePlatform] = useState<"whatsapp" | "telegram">("whatsapp");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    if (showSimulator) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, showSimulator]);

  // Handle chat submission
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsgId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messageType: "text"
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputVal("");
    setIsTyping(true);

    try {
      const conversationHistory = messages
        .filter(m => m.id !== "welcome-1")
        .map(m => ({
          role: m.sender === "user" ? "user" : "model",
          text: m.text
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: conversationHistory
        })
      });

      const data = await response.json();
      
      if (response.ok && data.reply) {
        const KUTTYBOTTMsg: ChatMessage = {
          id: `KUTTYBOTT-${Date.now()}`,
          sender: "KUTTYBOTT",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          messageType: "text",
          status: "read"
        };
        setMessages((prev) => [...prev, KUTTYBOTTMsg]);
      } else {
        throw new Error(data.error || "Communication failed");
      }
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: "KUTTYBOTT",
        text: "Oops! Sorry Boss, my digital brain hit a tiny speedbump. Please try again! 🙏",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        messageType: "text"
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceButtonClick = () => {
    if (isTyping) return;
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const voicePrompts = [
        "Explain quantum computers to me in simple terms.",
        "Solve this math equation: 15 * 12 + 75.",
        "Tell me a short programming joke!"
      ];
      const randomPrompt = voicePrompts[Math.floor(Math.random() * voicePrompts.length)];
      handleSendMessage(`🎤 [Voice Note]: ${randomPrompt}`);
    }, 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-1",
        sender: "KUTTYBOTT",
        text: "Simulator reset! What shall we tackle next, Boss?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        messageType: "text",
        status: "read"
      }
    ]);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep(2);
  };

  const openCheckout = (productName: string, price: string) => {
    setCheckoutProduct({ name: productName, price });
    setCheckoutStep(1);
    setShowCheckout(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900 selection:bg-rose-500 selection:text-white" id="main-app">
      
      {/* Top Banner / Simulator Alert */}
      <div className="bg-rose-600 text-white py-2.5 px-4 text-center text-xs font-bold flex items-center justify-center gap-2 relative z-50 shadow-sm">
        <Sparkles className="w-4 h-4 text-rose-200" />
        <span>Want to test KUTTYBOTT's intelligence? Try our live interface simulator!</span>
        <button 
          onClick={() => setShowSimulator(true)} 
          className="underline hover:text-rose-100 ml-1.5 font-extrabold cursor-pointer transition inline-flex items-center gap-0.5"
        >
          <span>Open Live Simulator</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Hero Block Container */}
      <div className="p-4 md:p-6 lg:p-8 bg-slate-50 min-h-[90vh]">
        <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-xl flex items-center bg-black">
          
          {/* Header inside Hero Section */}
          <header className="absolute top-0 inset-x-0 z-40 p-6 md:p-10 flex justify-end pointer-events-none">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-white/80 cursor-pointer transition-colors pointer-events-auto drop-shadow-md"
            >
              {mobileMenuOpen ? <X className="w-10 h-10" /> : <Menu className="w-10 h-10" />}
            </button>
          </header>

          {/* Interactive Menu Dropdown (works on all screens) */}
          {mobileMenuOpen && (
            <div className="absolute top-24 right-6 md:right-10 bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-6 space-y-4 shadow-2xl z-50 w-64 animate-in fade-in slide-in-from-top-4 duration-200">
              <nav className="flex flex-col gap-4">
                <a href="#meet-KUTTYBOTT" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-700 hover:text-rose-600 transition-colors">
                  Meet KUTTYBOTT
                </a>
                <a href="#special-features" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-700 hover:text-rose-600 transition-colors">
                  Specialties
                </a>
                <a href="#capabilities" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-700 hover:text-rose-600 transition-colors">
                  Capabilities
                </a>
                <a href="#lite-version" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-700 hover:text-rose-600 transition-colors">
                  KUTTYBOTT Lite
                </a>
              </nav>
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <button
                  onClick={() => { setMobileMenuOpen(false); openCheckout("KUTTYBOTT", "₹2,999"); }}
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-center text-xs font-extrabold shadow-md transition-colors cursor-pointer"
                >
                  Order Now
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); setShowSimulator(true); }}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-center text-xs font-bold transition-colors cursor-pointer"
                >
                  Live Simulator
                </button>
              </div>
            </div>
          )}

          <div className="absolute inset-0 z-0">
            <img 
              src="/assets/ogimage.jpg.jpeg" 
              alt="CHOTU BOT Hero" 
              className="w-full h-full object-cover object-center opacity-90"
            />
            {/* Soft gradient to make text pop */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
          </div>

          <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 text-left text-white mb-20 md:mb-32">
            <h1 className="text-6xl md:text-[90px] lg:text-[110px] font-extrabold tracking-tighter drop-shadow-xl" style={{ fontFamily: "'Nunito', 'Varela Round', 'Inter', sans-serif" }}>
              CHOTU BOT
            </h1>
            <p className="mt-2 md:mt-4 text-xl md:text-2xl lg:text-3xl text-white/95 font-medium tracking-wide drop-shadow-md">
              Your Tiny Desk Companion
            </p>
          </div>
        </section>
      </div>

      {/* Meet your AI buddy! Section */}
      <section className="py-12 md:py-16 px-6" id="meet-KUTTYBOTT">
        <div className="max-w-4xl mx-auto text-center">
          {/* Centered Heading */}
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Meet your <span className="text-rose-600 font-black">AI buddy!</span>
          </h2>
          <p className="mt-2 text-slate-500 text-xs md:text-sm font-semibold max-w-md mx-auto">
            The next-generation smart robot assistant designed to live on your table.
          </p>

          {/* Product showcase card - simple and compact layout */}
          <div className="mt-8 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 text-left">
            
            {/* Left Column: Big active image */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-slate-50 rounded-2xl p-4 border border-slate-100 relative group overflow-hidden">
              <img 
                src={activeImage} 
                alt="KUTTYBOTT Physical Robot" 
                className="max-h-[260px] md:max-h-[300px] object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-500 border border-slate-200">
                Interactive Model View
              </span>
            </div>

            {/* Middle Column: Vertical Thumbnail strip */}
            <div className="flex md:flex-col gap-3 justify-center md:justify-start">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img.src)}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 bg-slate-50 p-1 flex items-center justify-center transition cursor-pointer overflow-hidden ${
                    activeImage === img.src ? "border-rose-600 bg-rose-50/20" : "border-slate-200 hover:border-slate-300"
                  }`}
                  title={img.label}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Right Column: Information, Price, CTA, Bullets */}
            <div className="w-full md:w-5/12 flex flex-col justify-between self-stretch">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-wide uppercase">
                  KUTTYBOTT
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-rose-600">₹2,999</span>
                  <span className="text-xs text-slate-400 line-through">₹4,999</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">40% OFF</span>
                </div>

                {/* Red CTA button */}
                <button
                  onClick={() => openCheckout("KUTTYBOTT", "₹2,999")}
                  className="mt-4 w-full md:w-auto px-10 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-black tracking-widest uppercase transition-all duration-200 shadow-md hover:shadow-lg active:scale-98 cursor-pointer text-center"
                >
                  Buy Now
                </button>
              </div>

              {/* Bullet points with red dot list */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <ul className="space-y-2.5">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-slate-700">Sleek compact design</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-slate-700">Smart eyes (dynamic screen animations)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-slate-700">Easy setup (WiFi & companion app)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-slate-700">Interactive voice replies</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-slate-700">Safe for kids & fully parental controlled</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Why is KUTTYBOTT Special? Section */}
      <section className="py-12 bg-slate-100 border-y border-slate-200" id="special-features">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-extrabold text-center text-slate-900 tracking-tight">
            Why is <span className="text-rose-600 font-black">KUTTYBOTT</span> Special?
          </h2>
          <p className="mt-2 text-center text-slate-500 text-xs md:text-sm font-semibold max-w-md mx-auto">
            Explore the premium hardware technology built into this tiny powerhouse.
          </p>

          {/* Row of 4 columns with gray placeholders */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            
            {/* Box 1 */}
            <div className="group flex flex-col items-center text-center">
              <div className="w-full aspect-square rounded-2xl bg-slate-200 border border-slate-300/40 flex flex-col items-center justify-center p-6 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition" />
                <Eye className="w-10 h-10 text-slate-500 group-hover:text-rose-600 transition" />
                <span className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">OLED Tech</span>
              </div>
              <span className="mt-3 text-xs md:text-sm font-bold text-slate-800 group-hover:text-rose-600 transition">
                Screen & Lights
              </span>
            </div>

            {/* Box 2 */}
            <div className="group flex flex-col items-center text-center">
              <div className="w-full aspect-square rounded-2xl bg-slate-200 border border-slate-300/40 flex flex-col items-center justify-center p-6 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition" />
                <Volume2 className="w-10 h-10 text-slate-500 group-hover:text-rose-600 transition" />
                <span className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mic Array</span>
              </div>
              <span className="mt-3 text-xs md:text-sm font-bold text-slate-800 group-hover:text-rose-600 transition">
                Voice Tech
              </span>
            </div>

            {/* Box 3 */}
            <div className="group flex flex-col items-center text-center">
              <div className="w-full aspect-square rounded-2xl bg-slate-200 border border-slate-300/40 flex flex-col items-center justify-center p-6 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition" />
                <Smartphone className="w-10 h-10 text-slate-500 group-hover:text-rose-600 transition" />
                <span className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">iOS & Android</span>
              </div>
              <span className="mt-3 text-xs md:text-sm font-bold text-slate-800 group-hover:text-rose-600 transition">
                Companion Apps
              </span>
            </div>

            {/* Box 4 */}
            <div className="group flex flex-col items-center text-center">
              <div className="w-full aspect-square rounded-2xl bg-slate-200 border border-slate-300/40 flex flex-col items-center justify-center p-6 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition" />
                <ShieldAlert className="w-10 h-10 text-slate-500 group-hover:text-rose-600 transition" />
                <span className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Parental Lock</span>
              </div>
              <span className="mt-3 text-xs md:text-sm font-bold text-slate-800 group-hover:text-rose-600 transition">
                Safe for Kids
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Row of 4 white card badges (Features summary) */}
      <section className="py-12 px-6" id="capabilities">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-rose-300 hover:shadow-md transition duration-200">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 mb-4">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Always-On Chat</h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed font-semibold">
                Chat with KUTTYBOTT on any topic. Answers, summaries, recipes, and creative writing.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-rose-300 hover:shadow-md transition duration-200">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 mb-4">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Voice Companion</h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed font-semibold">
                Send voice notes. KUTTYBOTT transcribes them and responds with clear voice or text.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-rose-300 hover:shadow-md transition duration-200">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Instant Coding</h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed font-semibold">
                Master tutor: debug, write, or convert programs across 20+ computer languages.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-rose-300 hover:shadow-md transition duration-200">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 mb-4">
                <Heart className="w-5 h-5 animate-pulse" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Kids Friendly</h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed font-semibold">
                Educational answers, story telling mode, and strictly safe filters for family rooms.
              </p>
            </div>

          </div>

          {/* Centered quote/intelligence banner */}
          <div className="mt-16 text-center max-w-xl mx-auto px-4">
            <p className="text-slate-500 font-semibold italic text-xs md:text-sm leading-relaxed">
              "The small bot with big intelligence. Designed to fit your space, style, and routine."
            </p>
          </div>
        </div>
      </section>

      {/* Product Variant Section (Pink Robot legs mockup) */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-8 shadow-xs">
            {/* Left part: cute pink robot */}
            <div className="w-full sm:w-1/2 flex items-center justify-center p-3 bg-rose-50/20 rounded-2xl border border-rose-100">
              <img 
                src="/assets/phoneui.webp" 
                alt="Pink Robot Variant" 
                className="max-h-[160px] md:max-h-[180px] object-contain"
              />
            </div>
            {/* Right part: stacked button list */}
            <div className="w-full sm:w-1/2 flex flex-col gap-3">
              <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">
                KUTTYBOTT Resources
              </span>
              <h3 className="text-lg font-black text-slate-900">Explore & Connect</h3>
              
              <button 
                onClick={() => setShowSimulator(true)}
                className="w-full py-2.5 bg-white border border-rose-500 text-rose-600 hover:bg-rose-50 rounded-full text-xs font-extrabold transition cursor-pointer text-center"
              >
                Free Trial
              </button>
              
              <a 
                href="#wiki"
                onClick={(e) => { e.preventDefault(); alert("Wiki documentation opening soon!"); }}
                className="w-full py-2.5 bg-white border border-slate-300 text-slate-700 hover:border-slate-400 rounded-full text-xs font-bold transition text-center"
              >
                Wiki Page
              </a>
              
              <a 
                href="#community"
                onClick={(e) => { e.preventDefault(); alert("Join 50,000+ members in our Discord!"); }}
                className="w-full py-2.5 bg-white border border-slate-300 text-slate-700 hover:border-slate-400 rounded-full text-xs font-bold transition text-center"
              >
                Community
              </a>
            </div>
          </div>

          {/* Imprint */}
          <div className="mt-12 text-center">
            <span className="text-xs font-black tracking-widest text-slate-400 uppercase">
              Powered by <span className="text-rose-600 font-extrabold">KUTTYBOTT</span>
            </span>
          </div>
        </div>
      </section>

      {/* Banners Grid Segment */}
      <section className="py-12 px-6 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Banner 1: Unleash Your Creativity */}
            <div className="relative rounded-3xl overflow-hidden min-h-[220px] bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center p-6 md:p-8 text-white shadow-xs group">
              <div className="relative z-10 w-2/3">
                <span className="text-[10px] font-black bg-white/20 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Art Studio
                </span>
                <h3 className="mt-3 text-lg md:text-xl font-black leading-tight">
                  Unleash Your Creativity
                </h3>
                <p className="mt-2 text-xs text-sky-100 font-medium">
                  Draw customized sketches, avatars, and characters instantly on request.
                </p>
              </div>
              <img 
                src="/assets/creativity-banner.webp" 
                alt="Pikachu Theme Kuttybott" 
                className="absolute right-0 bottom-0 max-h-[160px] md:max-h-[180px] object-contain z-0 transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Banner 2: KUTTYBOTT LINK */}
            <div className="relative rounded-3xl overflow-hidden min-h-[220px] bg-gradient-to-tr from-slate-100 to-sky-100 flex items-center p-6 md:p-8 border border-slate-200 text-slate-900 shadow-xs group">
              <div className="relative z-10 w-2/3">
                <span className="text-[10px] font-black bg-sky-200/50 text-sky-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Sync Mode
                </span>
                <h3 className="mt-3 text-lg md:text-xl font-black leading-tight flex items-center gap-1.5 text-slate-900">
                  <span>CH-OTU LINK</span>
                </h3>
                <p className="mt-2 text-xs text-slate-500 font-semibold leading-relaxed">
                  Synchronize your tasks & commands in real-time. Link with Mac, Windows, or Mobile.
                </p>
              </div>
              <img 
                src="/assets/webui.webp" 
                alt="Kuttybott Link Monitor" 
                className="absolute right-2 bottom-2 max-h-[140px] md:max-h-[160px] object-contain z-0 transition-transform duration-500 group-hover:scale-105"
              />
            </div>

          </div>

          {/* Banner 3: Black logo banner */}
          <div className="rounded-2xl bg-black py-8 px-6 text-center flex flex-col items-center justify-center text-white border border-slate-900">
            <h3 className="text-3xl sm:text-4xl font-black tracking-widest flex items-center gap-1 select-none">
              <span>CH</span>
              <div className="w-10 h-10 bg-slate-900 rounded-lg border border-slate-700 flex items-center justify-center mx-1 animate-pulse">
                <div className="w-6 h-4 bg-sky-400 rounded-xs flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full mx-0.5" />
                  <div className="w-1 h-1 bg-white rounded-full mx-0.5" />
                </div>
              </div>
              <span>TU</span>
            </h3>
            <span className="mt-1 text-[8px] font-bold text-slate-500 uppercase tracking-widest">
              Standard Version
            </span>
          </div>

          {/* Banner 4: KUTTYBOTT Lite Section */}
          <div className="bg-slate-100 border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-xs" id="lite-version">
            
            {/* Left side text info */}
            <div className="w-full md:w-1/2 text-left">
              <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Lite Edition
              </span>
              <h3 className="mt-3 text-2xl font-black text-slate-950 uppercase tracking-wide">
                KUTTYBOTT Lite
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-xl font-black text-purple-600">₹1,999</span>
                <span className="text-xs text-slate-400 line-through">₹2,999</span>
              </div>
              <p className="mt-2 text-xs text-slate-500 font-semibold leading-relaxed">
                A lighter, battery-powered version perfect for study desks and quick questions.
              </p>

              {/* Purple Buy Button */}
              <button
                onClick={() => openCheckout("KUTTYBOTT Lite", "₹1,999")}
                className="mt-5 px-8 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-xs font-black tracking-wider uppercase transition shadow-md cursor-pointer"
              >
                Buy Now
              </button>
            </div>

            {/* Right side: dynamic gallery selector */}
            <div className="w-full md:w-1/2 flex flex-col sm:flex-row items-center gap-6 justify-end bg-white p-4 rounded-2xl border border-slate-200/50">
              <div className="flex sm:flex-col gap-2">
                {liteImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveLiteImage(img.src)}
                    className={`w-12 h-12 rounded-xl p-1 bg-slate-50 border-2 cursor-pointer transition ${
                      activeLiteImage === img.src ? "border-purple-600" : "border-slate-200"
                    }`}
                  >
                    <img src={img.src} alt={img.label} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
              <div className="flex-1 flex items-center justify-center min-h-[140px]">
                <img 
                  src={activeLiteImage} 
                  alt="Lite Variant Display" 
                  className="max-h-[140px] object-contain"
                />
              </div>
            </div>

          </div>

          {/* Banner 5: Hundreds of designs */}
          <div className="border-t border-slate-200 pt-8 text-center">
            <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">
              Customize Your Style
            </span>
            <h3 className="mt-1 text-lg md:text-xl font-black text-slate-900 uppercase">
              Hundreds of designs... Match your style with KUTTYBOTT
            </h3>
            
            {/* Gallery display cards */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center hover:shadow-xs transition">
                <img src="/assets/productImg.webp" alt="Classic White" className="h-20 object-contain" />
                <span className="mt-2 text-xs font-bold text-slate-800">Classic White</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center hover:shadow-xs transition">
                <img src="/assets/bottomimg.webp" alt="Playful Base" className="h-20 object-contain" />
                <span className="mt-2 text-xs font-bold text-slate-800">Playful Base</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center hover:shadow-xs transition">
                <img src="/assets/cUb2QbY8icjLfv42dvMClfFYoIA.jpeg.webp" alt="Midnight Cyber" className="h-20 object-contain" />
                <span className="mt-2 text-xs font-bold text-slate-800">Midnight Cyber</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center hover:shadow-xs transition">
                <img src="/assets/Tco563vxKZEKs5W2crWZNX6OM.jpeg.webp" alt="Neko Accessory" className="h-20 object-contain" />
                <span className="mt-2 text-xs font-bold text-slate-800">Neko Accessory</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer Segment */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-center text-xs font-medium">
        <p>&copy; {new Date().getFullYear()} KUTTYBOTTBot Inc. All rights reserved. Designed compact & beautiful.</p>
      </footer>

      {/* Interactive Order/Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-sm tracking-wider uppercase">Secure Checkout</h4>
                <p className="text-[10px] text-slate-400">Order: {checkoutProduct.name}</p>
              </div>
              <button 
                onClick={() => setShowCheckout(false)}
                className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {checkoutStep === 1 ? (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-600">Product:</span>
                    <span className="text-xs font-black text-slate-900">{checkoutProduct.name}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-600">Price:</span>
                    <span className="text-xs font-black text-rose-600">{checkoutProduct.price}</span>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-rose-600 focus:bg-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        required 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-rose-600 focus:bg-white"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Shipping Address</label>
                      <textarea 
                        required 
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-rose-600 focus:bg-white min-h-16"
                        placeholder="Street address, City, Pincode"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full mt-4 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-black tracking-widest uppercase shadow-md transition cursor-pointer"
                  >
                    Confirm & Proceed
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto border border-emerald-100 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900">Order Placed Successfully!</h4>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed px-4">
                    Thank you <strong className="text-slate-800">{formData.name}</strong>! Your KUTTYBOTT order is secured. We will contact you at <strong className="text-slate-800">{formData.phone}</strong> for shipping details.
                  </p>
                  <button 
                    onClick={() => setShowCheckout(false)}
                    className="mt-4 px-8 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-black tracking-wider uppercase transition cursor-pointer"
                  >
                    Back to Store
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Simulator Slider (Compact Drawer) */}
      {showSimulator && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-slate-900 flex flex-col h-full shadow-2xl border-l border-slate-800 animate-in slide-in-from-right duration-350">
            
            {/* Drawer Header */}
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center font-black text-xs select-none">
                  CH
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm tracking-wide">Live AI Simulator</h4>
                  <p className="text-[10px] text-slate-400 font-bold leading-none mt-0.5">
                    {isTyping ? "KUTTYBOTT is thinking..." : "Ready to chat"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleResetChat}
                  title="Clear Conversation"
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setShowSimulator(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mode Selectors */}
            <div className="p-2.5 bg-slate-950/40 border-b border-slate-800 flex justify-center">
              <div className="bg-slate-900 p-1 rounded-full inline-flex gap-1 border border-slate-800">
                <button
                  onClick={() => setActivePlatform("whatsapp")}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase transition cursor-pointer flex items-center gap-1.5 ${
                    activePlatform === "whatsapp" 
                      ? "bg-rose-600 text-white shadow-sm" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  WhatsApp Mode
                </button>
                <button
                  onClick={() => setActivePlatform("telegram")}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase transition cursor-pointer flex items-center gap-1.5 ${
                    activePlatform === "telegram" 
                      ? "bg-indigo-600 text-white shadow-sm" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Telegram Mode
                </button>
              </div>
            </div>

            {/* Chat History Panel */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/20">
              {messages.map((m) => {
                const isKUTTYBOTT = m.sender === "KUTTYBOTT";
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col max-w-[85%] rounded-2xl px-4 py-3 text-xs shadow-xs relative ${
                      isKUTTYBOTT 
                        ? "self-start bg-slate-850 text-slate-200 border border-slate-800" 
                        : "self-end bg-rose-600 text-white shadow-md"
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed pb-3 font-semibold">
                      {m.text}
                    </p>
                    <div className="absolute bottom-1 right-2 flex items-center gap-1 text-[9px] font-bold text-slate-400">
                      <span>{m.timestamp}</span>
                      {!isKUTTYBOTT && <CheckCheck className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="self-start bg-slate-850 text-slate-200 rounded-xl px-4 py-2.5 shadow-xs flex items-center gap-1 text-xs border border-slate-800">
                  <span className="text-slate-400 font-semibold italic text-[11px]">KUTTYBOTT is typing</span>
                  <span className="flex gap-0.5 items-center mt-1 ml-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Suggestions Strip */}
            <div className="p-3 bg-slate-950/60 border-t border-slate-800">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                Click Suggestions to test:
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    disabled={isTyping}
                    onClick={() => handleSendMessage(p.text)}
                    className="shrink-0 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300 hover:border-rose-500 hover:text-white transition cursor-pointer disabled:opacity-50"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form Bar */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
              <div className="flex-1 bg-slate-900 rounded-xl px-3.5 py-2.5 flex items-center gap-2 border border-slate-800">
                <input
                  type="text"
                  placeholder="Ask KUTTYBOTT a question..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage(inputVal);
                  }}
                  disabled={isTyping}
                  className="flex-1 bg-transparent border-none outline-none text-xs font-semibold placeholder-slate-500 text-white"
                />
              </div>

              <button
                onClick={() => handleSendMessage(inputVal)}
                disabled={!inputVal.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center hover:bg-rose-700 transition cursor-pointer disabled:bg-slate-800 disabled:text-slate-600"
              >
                <Send className="w-4 h-4" />
              </button>

              <button
                onClick={handleVoiceButtonClick}
                disabled={isTyping || isRecording}
                className="w-10 h-10 rounded-xl bg-slate-850 text-white flex items-center justify-center hover:bg-slate-800 transition cursor-pointer disabled:bg-slate-850 disabled:opacity-50"
              >
                <Mic className="w-4 h-4 text-rose-500" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
