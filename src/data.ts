import { ChotuFeature, PricingPlan, FAQItem } from "./types";

export const samplePrompts = [
  { label: "🥘 Healthy Recipe", text: "Suggest a quick and healthy dinner recipe using chicken and broccoli." },
  { label: "💻 Fix my Python Code", text: "Why is this function returning None? def find_first(lst): for x in lst: if x > 5: return x" },
  { label: "✍️ Write a Thank You note", text: "Write a warm, polite thank you email to my mentor for their career advice." },
  { label: "🌍 Learn Spanish", text: "How do I ask 'where is the nearest coffee shop?' in fluent Spanish?" },
  { label: "💡 Side-Hustle Ideas", text: "Suggest 3 creative weekend tech side hustles for a software engineer." },
  { label: "📊 Summarize this topic", text: "Explain quantum computing in 3 simple sentences for an 8-year-old." }
];

export const chotuFeatures: ChotuFeature[] = [
  {
    id: "chat-companion",
    title: "Always-On Chat Buddy",
    description: "Chat with Chotu about anything. Get instant answers, ask follow-up questions, translate languages, or brainstorm business proposals directly.",
    iconName: "MessageCircle",
    badge: "Super Fast",
    category: "chat"
  },
  {
    id: "voice-notes",
    title: "Voice Notes Helper",
    description: "Send Chotu voice notes on WhatsApp! Chotu will instantly answer them or transcribe them for you. Learn on-the-go without typing.",
    iconName: "Mic",
    category: "utility"
  },
  {
    id: "image-generation",
    title: "Instant AI Painter",
    description: "Just type 'draw a futuristic cat on a skateboard' or 'generate a modern logo for a food app' and watch Chotu paint in seconds.",
    iconName: "Paintbrush",
    badge: "New",
    category: "media"
  },
  {
    id: "document-summarizer",
    title: "Doc & PDF Scanner",
    description: "Send articles, reports, images, or photos of textbooks. Chotu will summarize them, extract key tables, or solve complex problems in it.",
    iconName: "FileText",
    category: "media"
  },
  {
    id: "coding-tutor",
    title: "Master Code Solver",
    description: "Write, debug, or translate code across 20+ programming languages. Perfect for engineers on the go or students finishing assignments.",
    iconName: "Code2",
    badge: "For Devs",
    category: "utility"
  },
  {
    id: "math-homework",
    title: "Step-by-Step Math",
    description: "Send a photo of a math equation or copy-paste a word problem. Chotu breaks it down and explains the strategy step-by-step.",
    iconName: "Binary",
    category: "utility"
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "free-plan",
    name: "Chotu Companion (Free)",
    price: "$0",
    period: "forever",
    description: "Perfect for casual chatting, quick questions, and exploring what Chotu can do.",
    features: [
      "10 text messages per day",
      "Standard response speed",
      "WhatsApp & Telegram support",
      "Full web search capabilities",
      "Basic math & coding answers"
    ],
    popular: false,
    ctaText: "Add to WhatsApp",
    whatsappLink: "https://wa.me/something_place_holder_chotu",
    telegramLink: "https://t.me/something_place_holder_chotu"
  },
  {
    id: "pro-plan",
    name: "Chotu Premium (Popular)",
    price: "$4.99",
    period: "month",
    description: "Our most requested tier. Unlimited messages, fast answers, voice, and image capabilities.",
    features: [
      "Unlimited messages & chats",
      "Ultra-fast processing speeds",
      "Image Generation & editing",
      "Full Voice Note transcription",
      "Heavy PDF & File uploads",
      "24/7 priority helper access"
    ],
    popular: true,
    ctaText: "Start Premium Chat",
    whatsappLink: "https://wa.me/something_place_holder_chotu?text=Hi+Chotu+I+want+premium",
    telegramLink: "https://t.me/something_place_holder_chotu?start=premium"
  },
  {
    id: "team-plan",
    name: "Chotu Business Bot",
    price: "$29",
    period: "month",
    description: "Deploy Chotu as an automated customer rep, booking agent, or FAQs bot for your own brand page.",
    features: [
      "Custom Knowledge Base files",
      "Connects to your custom WA business number",
      "Automatic customer lead collection",
      "Detailed usage analytics panel",
      "Developer API credentials",
      "Custom brand colors & logo"
    ],
    popular: false,
    ctaText: "Setup Business Bot",
    whatsappLink: "https://wa.me/something_place_holder_chotu?text=Tell+me+about+Chotu+Business",
    telegramLink: "https://t.me/something_place_holder_chotu?start=business"
  }
];

export const faqs: FAQItem[] = [
  {
    id: "how-to-start",
    question: "Do I need to download another app for Chotu?",
    answer: "No! That is the magic of Chotu. You do not need to install any new apps, register accounts, or configure settings. You simply add Chotu's number on WhatsApp or message Chotu's bot on Telegram, and start chatting instantly. It works exactly like messaging a close friend."
  },
  {
    id: "charge-rate",
    question: "Is Chotu really free?",
    answer: "Yes, our Companion tier is 100% free forever and lets you send up to 10 messages per day to get quick answers and check out Chotu. If you love Chotu and want unlimited messages, image generation, voice transcription, or document uploads, you can easily upgrade to Chotu Premium for just $4.99/month."
  },
  {
    id: "data-privacy-security",
    question: "Is my conversation with Chotu secure?",
    answer: "Absolutely. Chotu takes user privacy very seriously. All chats on WhatsApp and Telegram are secured by industry-standard encryption. Your conversation history is private to you and is never sold, shared, or used for advertising purposes. You can request to purge all conversation history anytime by typing 'purge history'."
  },
  {
    id: "how-does-voice",
    question: "How do voice notes and image features work?",
    answer: "In WhatsApp, you can just tap and hold to record a standard voice message and send it to Chotu. Chotu uses advanced speech-to-text models to transcribing your query, reasons through it, and types a clean, helpful response back. For images, simply type 'draw [your description]', and Chotu will generate a highly detailed image in the chat in seconds."
  },
  {
    id: "business-setup",
    question: "Can I customize Chotu for my Shopify store or company?",
    answer: "Yes! Our Chotu Business tier allows you to deploy Chotu on your business account or WhatsApp hotline. You can feed Chotu your business PDFs, product listings, order FAQs, and store policies, and Chotu will interact with your clients, take bookings, or answer queries automatically with full support."
  }
];
