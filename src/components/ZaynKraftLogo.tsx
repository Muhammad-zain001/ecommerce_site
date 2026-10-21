import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'exact' | 'full' | 'compact' | 'monogram';
  inverted?: boolean;
}

export const ZaynKraftLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  inverted = false,
}) => {
  const color = inverted ? '#F6F4EF' : '#121212';
  const subtitleColor = inverted ? '#D9C9A7' : '#121212';

  // Exact standalone lockup matching the original iconic ZK atelier mark:
  // Large ZK on top with the sweeping K swash, DESIGN ATELIER below
  if (variant === 'exact') {
    return (
      <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
        <svg
          viewBox="0 0 540 330"
          className="w-full h-auto max-w-[280px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="ZK DESIGN ATELIER"
        >
          <g fill={color}>
            {/* Letter Z */}
            {/* Top-left bracketed drop serif & top bar */}
            <path d="M 88 48 C 88 48 88 78 88 84 C 91 75 97 60 110 56 L 222 56 L 222 48 L 88 48 Z" />
            {/* Diagonal bold stem */}
            <path d="M 222 48 L 222 62 L 126 200 L 96 200 L 202 56 L 222 48 Z" />
            {/* Bottom horizontal bar & bottom-right upward terminal */}
            <path d="M 96 192 L 96 200 L 230 200 C 230 194 230 164 230 158 C 227 167 221 182 208 186 L 96 186 L 96 192 Z" />

            {/* Letter K */}
            {/* Vertical stem with bracketed top and bottom serifs */}
            <path d="M 228 48 L 278 48 C 271 52 268 56 268 64 L 268 184 C 268 192 271 196 278 200 L 228 200 C 235 196 238 192 238 184 L 238 64 C 238 56 235 52 228 48 Z" />
            {/* Upper diagonal arm with top-right serif */}
            <path d="M 262 128 L 332 54 C 330 50 327 48 322 48 L 354 48 C 350 51 346 56 341 62 L 280 134 Z" />
            {/* Signature lower sweeping calligraphic swash leg */}
            <path d="M 288 114 C 298 126 312 148 328 172 C 348 202 376 226 414 238 C 438 245 466 247 482 247 C 452 244 424 235 398 218 C 374 202 352 178 335 152 C 322 132 308 114 300 106 Z" />
          </g>
          {/* DESIGN ATELIER text matching the exact proportion and typography */}
          <text 
            x="270" 
            y="298" 
            textAnchor="middle" 
            fontFamily="'Playfair Display', 'Bodoni Moda', 'Didot', 'Cinzel', serif" 
            fontSize="44" 
            fontWeight="600" 
            letterSpacing="6" 
            fill={subtitleColor}
          >
            DESIGN ATELIER
          </text>
        </svg>
      </div>
    );
  }

  // Header and component lockup:
  // Features the iconic ZK mark with the sweeping K leg alongside ZAIN CRAFT and DESIGN ATELIER
  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3 select-none ${className}`}>
      {/* Monogram SVG */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 460 260"
          className={variant === 'compact' ? 'w-8 h-5 sm:w-10 sm:h-6' : 'w-9 h-5 sm:w-12 sm:h-7 md:w-14 md:h-8'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="ZK Monogram"
        >
          <g fill={color}>
            {/* Letter Z */}
            <path d="M 88 48 C 88 48 88 78 88 84 C 91 75 97 60 110 56 L 222 56 L 222 48 L 88 48 Z" />
            <path d="M 222 48 L 222 62 L 126 200 L 96 200 L 202 56 L 222 48 Z" />
            <path d="M 96 192 L 96 200 L 230 200 C 230 194 230 164 230 158 C 227 167 221 182 208 186 L 96 186 L 96 192 Z" />

            {/* Letter K */}
            <path d="M 228 48 L 278 48 C 271 52 268 56 268 64 L 268 184 C 268 192 271 196 278 200 L 228 200 C 235 196 238 192 238 184 L 238 64 C 238 56 235 52 228 48 Z" />
            <path d="M 262 128 L 332 54 C 330 50 327 48 322 48 L 354 48 C 350 51 346 56 341 62 L 280 134 Z" />
            <path d="M 288 114 C 298 126 312 148 328 172 C 348 202 376 226 414 238 C 438 245 466 247 482 247 C 452 244 424 235 398 218 C 374 202 352 178 335 152 C 322 132 308 114 300 106 Z" />
          </g>
        </svg>
      </div>

      {variant !== 'monogram' && (
        <div className="flex flex-col tracking-tight leading-none">
          <span
            className="text-sm sm:text-lg md:text-xl font-bold tracking-[0.14em] uppercase font-serif"
            style={{ color }}
          >
            ZAIN CRAFT
          </span>
          <span
            className="text-[7.5px] sm:text-[9px] uppercase tracking-[0.24em] font-serif font-semibold mt-0.5"
            style={{ color: subtitleColor }}
          >
            DESIGN ATELIER
          </span>
        </div>
      )}
    </div>
  );
};

export const ZainKraftLogo = ZaynKraftLogo;
export const ZainCraftLogo = ZaynKraftLogo;
