import { useState } from "react";
import { Check, MessageCircle, Send, Building2 } from "lucide-react";
import { pricingPlans } from "../data";

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const calculatePrice = (basePriceStr: string) => {
    if (basePriceStr === "$0") return "$0";
    const baseNum = parseFloat(basePriceStr.replace("$", ""));
    if (billingCycle === "monthly") {
      return `$${baseNum}`;
    } else {
      // 20% discount for annual billing
      const discountedYearlyMonthlyRate = (baseNum * 0.8).toFixed(2);
      return `$${discountedYearlyMonthlyRate}`;
    }
  };

  return (
    <section className="py-20 bg-vibrant-bg" id="pricing-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-base font-extrabold text-vibrant-coral uppercase tracking-widest animate-pulse">
            Simple Pricing
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
            Choose Your Friendly Chotu Buddy
          </p>
          <p className="mt-4 text-slate-600 font-medium text-sm sm:text-base">
            No hidden fees. Upgrade, downgrade, or cancel anytime. Get started for free!
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 bg-slate-100 rounded-full border border-slate-200 shadow-sm">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition cursor-pointer ${
                billingCycle === "monthly" 
                  ? "bg-gradient-to-tr from-vibrant-coral to-vibrant-orange text-white shadow-sm" 
                  : "text-slate-600 hover:text-vibrant-coral"
              }`}
            >
              🗓️ Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                billingCycle === "yearly" 
                  ? "bg-gradient-to-tr from-vibrant-coral to-vibrant-orange text-white shadow-sm" 
                  : "text-slate-600 hover:text-vibrant-coral"
              }`}
            >
              🎉 Annual Billing
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-[#FF6B6B] text-white uppercase tracking-wider scale-95">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => {
            const displayPrice = calculatePrice(plan.price);
            return (
              <div
                key={plan.id}
                id={`pricing-card-${plan.id}`}
                className={`flex flex-col relative rounded-3xl p-8 bg-white border transition-all duration-350 ${
                  plan.popular 
                    ? "border-vibrant-coral ring-2 ring-vibrant-coral/15 shadow-xl shadow-[#FF6B6B]/10 scale-102 z-10" 
                    : "border-indigo-100/55 shadow-xs hover:border-indigo-200"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-vibrant-coral to-vibrant-orange text-white text-[10px] uppercase font-extrabold tracking-widest shadow-md">
                    👑 Most Popular Plan
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                    {plan.id === "team-plan" && <Building2 className="w-5 h-5 text-vibrant-indigo" />}
                    <span>{plan.name}</span>
                  </h3>
                  <p className="mt-3 text-slate-500 text-xs font-semibold leading-relaxed min-h-12">
                    {plan.description}
                  </p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                      {displayPrice}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      / {billingCycle === "yearly" && plan.price !== "$0" ? "month billed annually" : plan.period}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-vibrant-coral/10 text-vibrant-coral flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 font-bold" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-600">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Action Bar */}
                <div className="space-y-3">
                  <a
                    href={plan.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-4 rounded-xl text-center font-bold text-xs flex items-center justify-center gap-2 transition duration-200 cursor-pointer ${
                      plan.popular 
                        ? "bg-gradient-to-tr from-vibrant-coral to-vibrant-orange text-white shadow-md shadow-[#FF6B6B]/20 hover:opacity-95" 
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{plan.ctaText} (WhatsApp)</span>
                  </a>
                  <a
                    href={plan.telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-4 rounded-xl text-center font-semibold text-[11px] text-slate-500 hover:text-vibrant-indigo hover:bg-indigo-50/50 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 fill-current" />
                    <span>Or activate on Telegram</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
