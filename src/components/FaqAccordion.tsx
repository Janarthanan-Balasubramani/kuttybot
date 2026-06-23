import { useState } from "react";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import { faqs } from "../data";

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>("how-to-start");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = faqs.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-20 bg-white" id="faq-section">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px] tracking-wide uppercase border border-slate-200 shadow-xs mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-orange-500 animate-bounce" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-slate-500 font-medium text-sm sm:text-base">
            Everything you need to know about setting up Chotu as your personal buddy.
          </p>

          {/* Interactive Search inside FAQs */}
          <div className="mt-8 relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search FAQs (e.g. secure, private)..."
              value={searchQuery}
              id="faq-search-box"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-orange-500 focus:bg-white shadow-inner transition"
            />
          </div>
        </div>

        {/* Accordion List */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className="rounded-2xl border border-slate-255 overflow-hidden bg-slate-50 hover:bg-slate-100/50 transition duration-200"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    id={`faq-trigger-${faq.id}`}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-slate-800 text-xs sm:text-sm hover:text-orange-600 transition cursor-pointer select-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transform transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-orange-500" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden-override ${
                      isOpen ? "max-h-[300px] border-t border-slate-200/60 p-6 bg-white" : "max-h-0"
                    }`}
                  >
                    <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
            <p className="text-slate-500 text-sm font-semibold">
              No results found for "{searchQuery}". Ask another question!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
