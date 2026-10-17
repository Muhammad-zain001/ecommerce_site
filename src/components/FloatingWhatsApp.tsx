import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/923214455888?text=Salam%20Zain%20Craft,%20I%20would%20like%20to%20inquire%20about%20your%20menswear%20collection."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-30 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-4 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 text-xs font-semibold"
      aria-label="Chat with Zain Craft on WhatsApp"
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span className="hidden sm:inline">WhatsApp Concierge</span>
    </a>
  );
};
