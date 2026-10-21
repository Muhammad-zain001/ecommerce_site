import React, { useState } from 'react';
import { X, Truck, RefreshCw, Shield, HelpCircle, PhoneCall } from 'lucide-react';

interface PoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'shipping' | 'returns' | 'faqs' | 'contact';
}

export const PoliciesModal: React.FC<PoliciesModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'shipping',
}) => {
  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'faqs' | 'contact'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-[#F6F4EF] rounded-2xl shadow-2xl border border-[#D9C9A7]/50 overflow-hidden my-auto max-h-[85vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="policies-title"
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-white/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#2E4A3B]" />
            <h2 id="policies-title" className="font-serif text-lg font-bold text-[#121212]">
              Customer Care & Atelier Policies
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-[#121212] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab buttons */}
        <div className="flex items-center gap-1 p-2 bg-stone-200/60 border-b border-stone-200 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'shipping' ? 'bg-white text-[#121212] shadow-2xs' : 'text-stone-600 hover:text-black'
            }`}
          >
            Shipping & COD
          </button>
          <button
            onClick={() => setActiveTab('returns')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'returns' ? 'bg-white text-[#121212] shadow-2xs' : 'text-stone-600 hover:text-black'
            }`}
          >
            14-Day Exchange
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'faqs' ? 'bg-white text-[#121212] shadow-2xs' : 'text-stone-600 hover:text-black'
            }`}
          >
            FAQs
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'contact' ? 'bg-white text-[#121212] shadow-2xs' : 'text-stone-600 hover:text-black'
            }`}
          >
            Contact & WhatsApp
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h3 className="font-serif text-base font-bold text-[#121212]">Shipping & Delivery Policy</h3>
              <p>
                Zain Craft delivers to every major city and district across Pakistan, including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar, Quetta, Multan, Sialkot, and rural territories.
              </p>
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
                <p>• <strong>Free Nationwide Shipping:</strong> Applicable automatically on all cart orders above Rs. 5,000.</p>
                <p>• <strong>Standard Shipping Fee:</strong> Flat Rs. 250 for orders below Rs. 5,000.</p>
                <p>• <strong>Delivery Timelines:</strong> Lahore: 1–2 business days. Karachi, Islamabad, Rawalpindi: 2–3 business days. Other cities: 3–4 business days.</p>
                <p>• <strong>Courier Partners:</strong> Trax Logistics, Call Courier, and Leopards Courier with automated SMS dispatch tracking.</p>
              </div>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-4">
              <h3 className="font-serif text-base font-bold text-[#121212]">14-Day Hassle-Free Exchange Policy</h3>
              <p>
                We stand behind our pattern grading and craftsmanship. If your Shalwar Kameez, Kurta, or trousers do not fit perfectly, we will gladly arrange a size exchange or store credit within 14 days of receipt.
              </p>
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
                <p>1. Send a quick WhatsApp message to <strong>+92 321 4455888</strong> with your Order Number and preferred replacement size.</p>
                <p>2. Keep the garment unwashed, unworn, with all original tags and packaging intact.</p>
                <p>3. Our reverse-courier rider will pick up the package from your doorstep when delivering your replacement.</p>
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-3">
              <h3 className="font-serif text-base font-bold text-[#121212]">Frequently Asked Questions</h3>
              
              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                <p className="font-bold text-xs text-stone-900">How do I choose the correct size for Shalwar Kameez?</p>
                <p className="text-xs text-stone-600">
                  Refer to our interactive Size Guide on any product page. Measure your chest circumference at the widest point. If you prefer a traditional drape, opt for your standard size; for a tailored fit, size down one notch.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                <p className="font-bold text-xs text-stone-900">Do I need a credit card to purchase?</p>
                <p className="text-xs text-stone-600">
                  No! Cash on Delivery (COD) is available on all orders nationwide. You pay in cash directly to the courier rider upon delivery. Direct bank transfer via Meezan Bank or Raast is also available.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                <p className="font-bold text-xs text-stone-900">Is the fabric pre-shrunk?</p>
                <p className="text-xs text-stone-600">
                  Yes, all Zain Craft Egyptian Giza cottons and European linens are mercerized and pre-washed to minimize post-purchase shrinkage.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4">
              <h3 className="font-serif text-base font-bold text-[#121212]">Atelier Client Concierge</h3>
              <p>
                Our master tailors and customer support team are available Monday through Saturday from 10:00 AM to 8:00 PM PKT.
              </p>
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3 text-xs">
                <p>• <strong>WhatsApp Hotline:</strong> +923244167247 (Instant replies)</p>
                <p>• <strong>Email:</strong> Zasif826@gmail.com</p>
                <p>• <strong>Studio Address:</strong> Zain Craft Design Atelier, MM Alam Road, Gulberg III, Lahore, Pakistan</p>
              </div>
              <a
                href="https://wa.me/923244167247?text=Salam%20Zain%20Craft,%20I%20have%20an%20inquiry%20regarding%20your%20collection."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 rounded-xl hover:bg-emerald-800 transition-colors"
              >
                <span>Chat on WhatsApp Directly</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
