export interface ChatMessage {
  id: string;
  sender: "user" | "chotu" | "KUTTYBOTT" | "kuttybott" | "Kuttybott";
  text: string;
  timestamp: string;
  messageType?: "text" | "image" | "voice";
  mediaUrl?: string;
  status?: "sent" | "delivered" | "read";
}

export interface ChotuFeature {
  id: string;
  title: string;
  description: string;
  iconName: string; // Dynamic icon rendering name for Lucide
  badge?: string;
  category: "chat" | "utility" | "media";
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  ctaText: string;
  whatsappLink: string;
  telegramLink: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
