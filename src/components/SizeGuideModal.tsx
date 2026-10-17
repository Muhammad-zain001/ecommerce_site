import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  category = 'shalwar-kameez',
}) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [activeTab, setActiveTab] = useState<'traditional' | 'shirts' | 'trousers'>(
    category === 'shirts' ? 'shirts' : category === 'pants' ? 'trousers' : 'traditional'
  );

  if (!isOpen) return null;

  const multiplier = unit === 'cm' ? 2.54 : 1;
  const formatVal = (val: number) => {
    const calculated = val * multiplier;
    return unit === 'cm' ? calculated.toFixed(1) : `${val}"`;
  };

  const traditionalSizes = [
    { size: 'S', chest: 38, shoulder: 17.5, length: 40, sleeve: 24, waist: 36 },
    { size: 'M', chest: 41, shoulder: 18.5, length: 42, sleeve: 25, waist: 39 },
    { size: 'L', chest: 44, shoulder: 19.5, length: 43.5, sleeve: 25.5, waist: 42 },
    { size: 'XL', chest: 47, shoulder: 20.5, length: 45, sleeve: 26, waist: 45 },
    { size: 'XXL', chest: 50, shoulder: 21.5, length: 46, sleeve: 26.5, waist: 48 },
  ];

  const shirtSizes = [
    { size: 'S', collar: 15, chest: 38, shoulder: 17.5, length: 29, sleeve: 24.5 },
    { size: 'M', collar: 15.5, chest: 41, shoulder: 18.5, length: 30, sleeve: 25.5 },
    { size: 'L', collar: 16.5, chest: 44, shoulder: 19.5, length: 31, sleeve: 26 },
    { size: 'XL', collar: 17.5, chest: 47, shoulder: 20.5, length: 32, sleeve: 26.5 },
  ];

  const trouserSizes = [
    { size: '30 / S', waist: 30, hip: 39, thigh: 24, inseam: 31, legOpening: 14.5 },
    { size: '32 / M', waist: 32, hip: 41, thigh: 25, inseam: 31.5, legOpening: 15 },
    { size: '34 / L', waist: 34, hip: 43, thigh: 26, inseam: 32, legOpening: 15.5 },
    { size: '36 / XL', waist: 36, hip: 45, thigh: 27, inseam: 32.5, legOpening: 16 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-[#F6F4EF] rounded-xl shadow-2xl border border-[#D9C9A7]/40 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-guide-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#121212]/10 bg-white/70">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2E4A3B]/10 rounded-lg text-[#2E4A3B]">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h2 id="size-guide-title" className="text-xl font-bold font-serif text-[#121212]">
                Zain Craft Sizing Guide
              </h2>
              <p className="text-xs text-[#575757] mt-0.5">
                Accurate Pakistani tailored measurements. Measure your best-fitting garment flat.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-[#121212] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Controls: Category tabs & Unit switch */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg">
              <button
                onClick={() => setActiveTab('traditional')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'traditional'
                    ? 'bg-white text-[#121212] shadow-xs'
                    : 'text-stone-600 hover:text-[#121212]'
                }`}
              >
                Shalwar Kameez & Kurtas
              </button>
              <button
                onClick={() => setActiveTab('shirts')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'shirts'
                    ? 'bg-white text-[#121212] shadow-xs'
                    : 'text-stone-600 hover:text-[#121212]'
                }`}
              >
                Shirts & Overshirts
              </button>
              <button
                onClick={() => setActiveTab('trousers')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'trousers'
                    ? 'bg-white text-[#121212] shadow-xs'
                    : 'text-stone-600 hover:text-[#121212]'
                }`}
              >
                Trousers & Pants
              </button>
            </div>

            {/* Unit toggle */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-stone-500 mr-1 font-medium">Unit:</span>
              <button
                onClick={() => setUnit('inches')}
                className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                  unit === 'inches'
                    ? 'bg-[#2E4A3B] text-white'
                    : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                  unit === 'cm'
                    ? 'bg-[#2E4A3B] text-white'
                    : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                }`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-[#121212]/10 bg-white">
            {activeTab === 'traditional' && (
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF8F5] text-stone-700 border-b border-stone-200 uppercase font-semibold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Chest</th>
                    <th className="py-3 px-4">Shoulder</th>
                    <th className="py-3 px-4">Kameez Length</th>
                    <th className="py-3 px-4">Sleeve</th>
                    <th className="py-3 px-4">Waist</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono tabular-nums">
                  {traditionalSizes.map((row) => (
                    <tr key={row.size} className="hover:bg-stone-50">
                      <td className="py-3 px-4 font-sans font-bold text-[#121212]">{row.size}</td>
                      <td className="py-3 px-4 text-stone-700">{formatVal(row.chest)}</td>
                      <td className="py-3 px-4 text-stone-700">{formatVal(row.shoulder)}</td>
                      <td className="py-3 px-4 text-stone-700">{formatVal(row.length)}</td>
                      <td className="py-3 px-4 text-stone-700">{formatVal(row.sleeve)}</td>
                      <td className="py-3 px-4 text-stone-700">{formatVal(row.waist)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'shirts' && (
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF8F5] text-stone-700 border-b border-stone-200 uppercase font-semibold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Collar</th>
                    <th className="py-3 px-4">Chest</th>
                    <th className="py-3 px-4">Shoulder</th>
                    <th className="py-3 px-4">Length</th>
                    <th className="py-3 px-4">Sleeve</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono tabular-nums">
                  {shirtSizes.map((row) => (
                    <tr key={row.size} className="hover:bg-stone-50">
                      <td className="py-3 px-4 font-sans font-bold text-[#121212]">{row.size}</td>
                      <td className="py-3 px-4 text-stone-700">{formatVal(row.collar)}</td>
                      <td className="py-3 px-4 text-stone-700">{formatVal(row.chest)}</td>
                      <td className="py-3 px-4 text-stone-700">{formatVal(row.shoulder)}</td>
                      <td className="py-3 px-4 text-stone-700">{formatVal(row.length)}</td>
                      <td className="py-3 px-4 text-stone-700">{formatVal(row.sleeve)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'trousers' && (
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF8F5] text-stone-700 border-b border-stone-200 uppercase font-semibold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Waist Size</th>
                    <th className="py-3 px-4">Hip</th>
                    <th className="py-3 px-4">Thigh</th>
                    <th className="py-3 px-4">Inseam</th>
                    <th className="py-3 px-4">Leg Opening</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono tabular-nums">
                  {trouserSizes.map((row) => (
                    <tr key={row.size} className="hover:bg-stone-50">
                      <td className="py-3 px-4 font-sans font-bold text-[#121212]">{row.size}</td>
                      <td className="py-3 px-4 text-stone-700">{formatVal(row.hip)}</td>
                      <td className="py-3 px-4 text-stone-700">{formatVal(row.thigh)}</td>
                      <td className="py-3 px-4 text-stone-700">{formatVal(row.inseam)}</td>
                      <td className="py-3 px-4 text-stone-700">{formatVal(row.legOpening)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Measuring tips */}
          <div className="bg-[#FAF8F5] p-4 rounded-lg border border-[#121212]/5 space-y-2 text-xs text-stone-600">
            <div className="flex items-center gap-2 font-semibold text-[#121212]">
              <CheckCircle2 className="w-4 h-4 text-[#2E4A3B]" />
              <span>Zain Craft Fit Recommendation:</span>
            </div>
            <p>
              • If your chest measurement falls between two sizes, choose the larger size for a relaxed traditional drape or the smaller size for a tailored modern fit.
            </p>
            <p>
              • Need custom tailor alterations or not sure? WhatsApp our Master Tailor at <span className="font-semibold text-[#121212]">+92 321 4455888</span> for personalized fit guidance before ordering.
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-[#121212]/10 bg-white/70 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#2E4A3B] rounded-lg hover:bg-[#203529] transition-colors"
          >
            Got It, Back to Product
          </button>
        </div>
      </div>
    </div>
  );
};
