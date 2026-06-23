import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Mic, 
  Image as ImageIcon, 
  Paperclip, 
  MoreVertical, 
  Phone, 
  Video, 
  ArrowLeft,
  CheckCheck,
  Sparkles,
  RefreshCw,
  Clock
} from "lucide-react";
import { ChatMessage } from "../types";
import { samplePrompts } from "../data";

export default function ChatSandbox() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "chotu",
      text: "Namaste! Boss, I am Chotu, your friendly AI assistant. 🌟\n\nI can solve coding bugs, translate languages, write poems, summarize PDFs, or generate beautiful artwork! \n\nHow can I help you today? Feel free to type any question below or click one of the quick suggestions!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messageType: "text",
      status: "read"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState<"whatsapp" | "telegram">("whatsapp");
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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
      // Build brief chat history to send to the server
      const conversationHistory = messages
        .filter(m => m.id !== "welcome-1") // Skip welcome instruction parameter for simplicity
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
        const chotuMsg: ChatMessage = {
          id: `chotu-${Date.now()}`,
          sender: "chotu",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          messageType: "text",
          status: "read"
        };
        setMessages((prev) => [...prev, chotuMsg]);
      } else {
        throw new Error(data.error || "Communication failed");
      }
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: "chotu",
        text: "Oops! Sorry Boss, my server hit a little speedbump. Please try again! 🙏",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        messageType: "text"
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePromptClick = (text: string) => {
    if (isTyping) return;
    handleSendMessage(text);
  };

  const handleVoiceButtonClick = () => {
    if (isTyping) return;
    setIsRecording(true);
    // Simulate recording voice note
    setTimeout(() => {
      setIsRecording(false);
      const voicePrompts = [
        "Explain quantum computers to me in simple Hindi and English.",
        "Solve this math: Log base 10 of 1000 multiplied by 5.",
        "Tell me a sweet short joke to make me smile!"
      ];
      const randomPrompt = voicePrompts[Math.floor(Math.random() * voicePrompts.length)];
      handleSendMessage(`🎤 [Voice Note]: ${randomPrompt}`);
    }, 2200);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-1",
        sender: "chotu",
        text: "Chat cleared! Boss, what are we creating or solving next? Ask me anything!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        messageType: "text",
        status: "read"
      }
    ]);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-stretch h-full max-w-6xl mx-auto px-4 py-8" id="chat-sandbox-container">
      {/* Simulation Controls on left */}
      <div className="flex-1 flex flex-col justify-between space-y-6 lg:max-w-md">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vibrant-coral/10 text-vibrant-coral font-bold text-xs mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Sandbox</span>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
            Chat with Chotu in Real-Time
          </h3>
          <p className="mt-3 text-slate-600 text-sm leading-relaxed">
            Experience the actual power of Chotu on this website! This demo Sandbox runs on a
            built-in response engine — no API key needed. Click any hot topic below to test him, or
            write your own custom queries.
          </p>
        </div>

        {/* Hot Prompts Grid */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">
            Click to Try a Suggestion:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                id={`prompt-btn-${idx}`}
                disabled={isTyping}
                onClick={() => handlePromptClick(p.text)}
                className="p-3 text-left rounded-xl bg-white border border-slate-200 shadow-xs hover:border-vibrant-coral hover:shadow-md hover:text-vibrant-indigo transition text-xs font-semibold text-slate-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Indicators */}
        <div className="p-4 bg-slate-50 border border-indigo-50/80 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-xs text-slate-500 font-medium font-sans">
              Connected to Chotu Core API
            </div>
          </div>
          <button
            onClick={handleResetChat}
            id="reset-chat-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-white hover:text-vibrant-coral border border-slate-200 hover:border-vibrant-coral/30 transition cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Restart Chat</span>
          </button>
        </div>
      </div>

      {/* Phone Window Wrapper */}
      <div className="flex-1 flex flex-col rounded-[2.5rem] bg-vibrant-navy p-3.5 shadow-2xl border-4 border-[#2d2f44] min-h-[550px] max-h-[620px] relative">
        {/* Phone Notch */}
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-slate-950 rounded-full z-20 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-4" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
        </div>

        {/* Layout Client Header Selector */}
        <div className="flex justify-center mb-1.5 mt-4 z-10">
          <div className="bg-slate-950/60 p-1 rounded-full inline-flex gap-1 border border-slate-800/80">
            <button
              onClick={() => setActiveTab("whatsapp")}
              id="platform-tab-whatsapp"
              className={`px-4 py-1 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "whatsapp" 
                  ? "bg-vibrant-coral text-white shadow-sm" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-orange-300" />
              WhatsApp
            </button>
            <button
              onClick={() => setActiveTab("telegram")}
              id="platform-tab-telegram"
              className={`px-4 py-1 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "telegram" 
                  ? "bg-vibrant-indigo text-white shadow-sm" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-indigo-300" />
              Telegram
            </button>
          </div>
        </div>

        {/* Real Dynamic Phone Frame Content */}
        <div className="flex-1 flex flex-col bg-vibrant-bg rounded-[1.8rem] overflow-hidden text-slate-800 shadow-inner relative border border-slate-950">
          {/* Active Platform Header */}
          {activeTab === "whatsapp" ? (
            <div className="bg-vibrant-navy text-white px-4 py-3.5 flex items-center justify-between border-b border-indigo-950 shadow-md">
              <div className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 cursor-pointer" />
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-[#3a44ad] flex items-center justify-center text-white font-black text-sm border border-indigo-500/30 select-none">
                    CH
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#FF6B6B] border-2 border-vibrant-navy" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-wide">Chotu Bot 💬</h4>
                  <p className="text-[10px] text-indigo-200 font-medium leading-none mt-0.5">
                    {isTyping ? "typing..." : "online"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/90">
                <Video className="w-4 h-4 cursor-not-allowed opacity-60" />
                <Phone className="w-4 h-4 cursor-not-allowed opacity-60" />
                <MoreVertical className="w-4 h-4 cursor-pointer" />
              </div>
            </div>
          ) : (
            <div className="bg-vibrant-indigo text-white px-4 py-3.5 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-indigo-900/40 flex items-center justify-center text-indigo-100 font-bold text-sm border border-white/20 select-none">
                    C
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#FF6B6B] border-2 border-indigo-700" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-wide">Chotu AI Buddy</h4>
                  <p className="text-[10px] text-indigo-100/90 font-medium leading-none mt-0.5">
                    {isTyping ? "typing..." : "bot • active"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/90">
                <Clock className="w-4 h-4 cursor-not-allowed opacity-60" />
                <MoreVertical className="w-4 h-4 cursor-pointer" />
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-vibrant-bg/40 bg-opacity-75 flex flex-col">
            {messages.map((m) => {
              const isChotu = m.sender === "chotu";
              return (
                <div
                  key={m.id}
                  id={`chat-msg-${m.id}`}
                  className={`flex flex-col max-w-[85%] rounded-2xl px-4 py-3 text-xs shadow-xs relative ${
                    isChotu 
                      ? "self-start bg-white text-slate-800 rounded-tl-none border border-indigo-100/60" 
                      : "self-end bg-gradient-to-br from-vibrant-indigo via-[#3a44ad] to-indigo-850 text-white rounded-tr-none shadow-md"
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed pb-3 font-medium">
                    {m.text}
                  </p>
                  <div className={`absolute bottom-1 right-2 flex items-center gap-1 text-[9px] font-medium ${
                    isChotu ? "text-slate-400" : "text-indigo-100/80"
                  }`}>
                    <span>{m.timestamp}</span>
                    {!isChotu && <CheckCheck className="w-3 h-3 text-white" />}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="self-start bg-white text-slate-800 rounded-xl rounded-tl-none px-4 py-2.5 shadow-xs flex items-center gap-1 text-xs border border-indigo-100/40">
                <span className="text-slate-400 font-semibold italic text-[11px]">Chotu is plotting</span>
                <span className="flex gap-0.5 items-center mt-1 ml-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-vibrant-coral animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-vibrant-coral animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-vibrant-coral animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Voice Recording Overlay notification */}
          {isRecording && (
            <div className="absolute inset-x-0 bottom-16 bg-vibrant-coral text-white py-2.5 px-4 flex items-center justify-between text-xs animate-pulse backdrop-blur-xs z-10 font-bold">
              <span className="flex items-center gap-2 font-semibold">
                <Mic className="w-4 h-4 animate-ping text-white" />
                Recording Voice Note... Keep chatting
              </span>
              <span className="text-[10px] font-bold">RELEASE TO TRANSCRIBE</span>
            </div>
          )}

          {/* Message Input Area */}
          <div className="bg-[#f0f0f4] p-2.5 flex items-center gap-2 border-t border-indigo-100/50">
            <div className="flex-1 bg-white rounded-2xl px-3.5 py-2 flex items-center gap-2 border border-indigo-100 shadow-inner">
              <Paperclip className="w-4 h-4 text-slate-400 cursor-not-allowed hidden sm:block" />
              <input
                type="text"
                placeholder="Ask Chotu anything..."
                value={inputVal}
                id="message-input-box"
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage(inputVal);
                }}
                disabled={isTyping}
                className="flex-1 bg-transparent border-none outline-none text-xs font-semibold placeholder-slate-400 text-slate-800"
              />
              <ImageIcon className="w-4 h-4 text-slate-400 cursor-not-allowed hidden sm:block" />
            </div>

            <button
              onClick={() => handleSendMessage(inputVal)}
              disabled={!inputVal.trim() || isTyping}
              id="send-message-btn"
              className="w-9 h-9 rounded-xl bg-vibrant-indigo text-white flex items-center justify-center hover:opacity-90 transition cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed shadow-sm shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>

            <button
              onClick={handleVoiceButtonClick}
              disabled={isTyping || isRecording}
              id="voice-message-btn"
              className="w-9 h-9 rounded-xl bg-vibrant-coral text-white flex items-center justify-center hover:bg-[#ff5252] transition cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed shadow-sm shrink-0"
              title="Simulate sending a Voice Note"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
