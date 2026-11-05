import React from 'react';

interface IllustrationProps {
  scene: string;
  className?: string;
}

export const CardIllustration: React.FC<IllustrationProps> = ({ scene, className = 'w-full h-32 sm:h-36 md:h-40' }) => {
  switch (scene) {
    case 'park_cycling':
      return (
        <svg viewBox="0 0 400 240" className={`${className} rounded-lg bg-sky-50 border border-slate-200 shadow-inner`} xmlns="http://www.w3.org/2000/svg">
          {/* Sky & Ground */}
          <rect width="400" height="240" fill="#f0f9ff" />
          <path d="M0,170 Q150,150 400,170 L400,240 L0,240 Z" fill="#bbf7d0" />
          <path d="M0,195 Q200,185 400,195 L400,240 L0,240 Z" fill="#86efac" />
          
          {/* Trees in background */}
          <circle cx="50" cy="130" r="35" fill="#4ade80" />
          <circle cx="75" cy="115" r="30" fill="#22c55e" />
          <rect x="58" y="150" width="10" height="30" fill="#78350f" />
          
          <circle cx="340" cy="120" r="40" fill="#4ade80" />
          <rect x="335" y="150" width="12" height="30" fill="#78350f" />
          
          {/* Bicycle */}
          <g transform="translate(180, 105)">
            {/* Wheels */}
            <circle cx="30" cy="70" r="24" fill="none" stroke="#334155" strokeWidth="4" />
            <circle cx="30" cy="70" r="20" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="110" cy="70" r="24" fill="none" stroke="#334155" strokeWidth="4" />
            <circle cx="110" cy="70" r="20" fill="none" stroke="#94a3b8" strokeWidth="1" />
            {/* Frame */}
            <polygon points="30,70 65,70 100,35 60,35" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinejoin="round" />
            <line x1="65" y1="70" x2="60" y2="35" stroke="#2563eb" strokeWidth="4" />
            <line x1="110" y1="70" x2="100" y2="35" stroke="#2563eb" strokeWidth="4" />
            {/* Handle & Seat */}
            <line x1="100" y1="35" x2="95" y2="20" stroke="#1e293b" strokeWidth="4" />
            <line x1="88" y1="20" x2="102" y2="20" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="58" cy="30" rx="10" ry="3" fill="#1e293b" />
          </g>

          {/* Boy washing bicycle */}
          <g transform="translate(110, 60)">
            {/* Head */}
            <circle cx="45" cy="30" r="16" fill="#fed7aa" />
            {/* Hair */}
            <path d="M30,30 Q45,12 60,26 Q55,10 40,12 Z" fill="#451a03" />
            {/* Smile & Eye */}
            <circle cx="50" cy="28" r="2" fill="#1e293b" />
            <path d="M48,35 Q52,38 56,35" stroke="#9a3412" strokeWidth="1.5" fill="none" />
            {/* Body */}
            <path d="M32,46 L58,46 L62,95 L28,95 Z" fill="#ef4444" />
            {/* Legs (kneeling or bending) */}
            <rect x="30" y="95" width="12" height="40" fill="#1e3a8a" rx="4" />
            <rect x="48" y="95" width="12" height="40" fill="#1e3a8a" rx="4" />
            {/* Shoes */}
            <ellipse cx="36" cy="136" rx="9" ry="4" fill="#334155" />
            <ellipse cx="54" cy="136" rx="9" ry="4" fill="#334155" />
            {/* Arms reaching to bike with sponge & bubbles */}
            <path d="M55,55 L85,68" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round" />
            {/* Sponge */}
            <rect x="80" y="62" width="16" height="12" rx="3" fill="#facc15" stroke="#eab308" />
            {/* Soap bubbles & water droplets */}
            <circle cx="85" cy="55" r="4" fill="#67e8f9" opacity="0.8" />
            <circle cx="100" cy="65" r="3" fill="#67e8f9" opacity="0.8" />
            <circle cx="75" cy="75" r="5" fill="#67e8f9" opacity="0.8" />
            <circle cx="95" cy="80" r="3.5" fill="#67e8f9" opacity="0.8" />
            {/* Water bucket */}
            <polygon points="12,110 8,136 26,136 22,110" fill="#0284c7" />
            <ellipse cx="17" cy="110" rx="5" ry="2" fill="#38bdf8" />
          </g>
          <text x="20" y="30" className="text-xs font-bold fill-slate-700">Picture A: What is the boy doing?</text>
        </svg>
      );

    case 'park_bench_cats':
      return (
        <svg viewBox="0 0 400 240" className={`${className} rounded-lg bg-emerald-50 border border-slate-200 shadow-inner`} xmlns="http://www.w3.org/2000/svg">
          {/* Ground */}
          <rect width="400" height="240" fill="#ecfdf5" />
          <path d="M0,175 Q200,165 400,175 L400,240 L0,240 Z" fill="#a7f3d0" />
          
          {/* Flowers */}
          <circle cx="60" cy="200" r="5" fill="#f43f5e" />
          <circle cx="68" cy="195" r="4" fill="#fbbf24" />
          <circle cx="340" cy="205" r="5" fill="#a855f7" />

          {/* Wooden Bench */}
          <g transform="translate(100, 80)">
            {/* Backrest slats */}
            <rect x="0" y="0" width="200" height="12" rx="3" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
            <rect x="0" y="16" width="200" height="12" rx="3" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
            {/* Seat */}
            <polygon points="-10,48 210,48 190,62 -5,62" fill="#d97706" stroke="#78350f" strokeWidth="1.5" />
            {/* Legs */}
            <rect x="15" y="48" width="8" height="60" fill="#475569" rx="2" />
            <rect x="175" y="48" width="8" height="60" fill="#475569" rx="2" />
            <line x1="15" y1="80" x2="180" y2="80" stroke="#475569" strokeWidth="4" />
          </g>

          {/* Cat 1 under bench (Orange tabby) */}
          <g transform="translate(140, 155)">
            {/* Body */}
            <ellipse cx="25" cy="18" rx="16" ry="12" fill="#f97316" />
            {/* Head */}
            <circle cx="12" cy="12" r="9" fill="#f97316" />
            {/* Ears */}
            <polygon points="6,6 10,1 12,6" fill="#ea580c" />
            <polygon points="12,6 15,1 18,6" fill="#ea580c" />
            {/* Eyes & Nose */}
            <circle cx="10" cy="11" r="1.5" fill="#1e293b" />
            <circle cx="14" cy="11" r="1.5" fill="#1e293b" />
            {/* Tail */}
            <path d="M40,16 Q48,10 46,2" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>

          {/* Cat 2 under bench (Grey striped) */}
          <g transform="translate(210, 155)">
            {/* Body */}
            <ellipse cx="25" cy="18" rx="15" ry="11" fill="#64748b" />
            {/* Head */}
            <circle cx="12" cy="12" r="8.5" fill="#64748b" />
            {/* Ears */}
            <polygon points="6,6 9,1 12,6" fill="#475569" />
            <polygon points="12,6 15,1 17,6" fill="#475569" />
            {/* Eyes */}
            <circle cx="10" cy="11" r="1.2" fill="#fef08a" />
            <circle cx="13" cy="11" r="1.2" fill="#fef08a" />
            {/* Tail */}
            <path d="M38,18 Q45,22 47,15" stroke="#64748b" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </g>

          <text x="20" y="30" className="text-xs font-bold fill-slate-700">Picture B: How many cats are there under the bench?</text>
        </svg>
      );

    case 'kitchen_cooking':
      return (
        <svg viewBox="0 0 400 240" className={`${className} rounded-lg bg-orange-50 border border-slate-200 shadow-inner`} xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#fffbeb" />
          {/* Wall tiles pattern */}
          <line x1="0" y1="80" x2="400" y2="80" stroke="#fed7aa" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="130" x2="400" y2="130" stroke="#fed7aa" strokeWidth="1" strokeDasharray="4 4" />

          {/* Countertop */}
          <rect x="0" y="145" width="400" height="95" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
          
          {/* Cutting board */}
          <rect x="180" y="160" width="90" height="45" rx="4" fill="#d97706" stroke="#92400e" strokeWidth="2" />
          {/* Tomato sliced on board */}
          <circle cx="210" cy="180" r="12" fill="#ef4444" />
          <circle cx="235" cy="182" r="10" fill="#dc2626" />
          <ellipse cx="250" cy="185" rx="6" ry="8" fill="#ef4444" />

          {/* Woman cooking */}
          <g transform="translate(90, 40)">
            {/* Hair */}
            <path d="M45,20 C30,20 20,40 22,65 C25,75 35,80 40,80 C45,80 50,70 65,70 C75,70 85,60 85,45 C85,25 70,20 45,20 Z" fill="#78350f" />
            {/* Head */}
            <circle cx="50" cy="40" r="18" fill="#fed7aa" />
            {/* Eye & Smile */}
            <circle cx="58" cy="38" r="2" fill="#1e293b" />
            <path d="M55,46 Q60,50 64,46" stroke="#9a3412" strokeWidth="1.5" fill="none" />
            {/* Apron & Dress */}
            <path d="M30,65 L70,65 L75,115 L25,115 Z" fill="#10b981" />
            <path d="M38,65 L62,65 L60,115 L40,115 Z" fill="#f8fafc" />
            {/* Arms holding knife */}
            <path d="M65,75 L100,120" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round" />
            {/* Kitchen knife */}
            <polygon points="98,115 125,130 120,135 98,125" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
            <rect x="92" y="112" width="10" height="6" fill="#1e293b" rx="1" />
          </g>

          <text x="20" y="30" className="text-xs font-bold fill-slate-700">Picture A: What is the woman doing?</text>
        </svg>
      );

    case 'kitchen_table_apples':
      return (
        <svg viewBox="0 0 400 240" className={`${className} rounded-lg bg-amber-50 border border-slate-200 shadow-inner`} xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#fef3c7" />
          
          {/* Table */}
          <polygon points="30,140 370,140 390,200 10,200" fill="#d97706" stroke="#b45309" strokeWidth="2" />
          <rect x="50" y="200" width="20" height="40" fill="#b45309" />
          <rect x="330" y="200" width="20" height="40" fill="#b45309" />

          {/* Fruit Basket on Table */}
          <g transform="translate(150, 115)">
            {/* Basket base */}
            <path d="M15,40 Q50,75 85,40 Z" fill="#92400e" stroke="#78350f" strokeWidth="2" />
            <ellipse cx="50" cy="40" rx="36" ry="10" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
            
            {/* Apple 1 */}
            <g transform="translate(25, 20)">
              <circle cx="10" cy="10" r="11" fill="#ef4444" />
              <path d="M10,0 Q12,-4 15,-2" stroke="#15803d" strokeWidth="2" fill="none" />
              <ellipse cx="7" cy="7" rx="2" ry="4" fill="#fca5a5" opacity="0.6" />
            </g>

            {/* Apple 2 */}
            <g transform="translate(45, 18)">
              <circle cx="10" cy="10" r="11.5" fill="#dc2626" />
              <path d="M10,0 Q8,-4 6,-2" stroke="#15803d" strokeWidth="2" fill="none" />
              <ellipse cx="7" cy="7" rx="2" ry="4" fill="#fca5a5" opacity="0.6" />
            </g>

            {/* Apple 3 */}
            <g transform="translate(36, 6)">
              <circle cx="10" cy="10" r="11" fill="#f87171" />
              <path d="M10,0 Q12,-5 13,-2" stroke="#15803d" strokeWidth="2" fill="none" />
              <ellipse cx="7" cy="7" rx="2" ry="4" fill="#fee2e2" opacity="0.6" />
            </g>
          </g>

          <text x="20" y="30" className="text-xs font-bold fill-slate-700">Picture B: How many apples are there on the table?</text>
        </svg>
      );

    case 'library_studying':
      return (
        <svg viewBox="0 0 400 240" className={`${className} rounded-lg bg-blue-50 border border-slate-200 shadow-inner`} xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#f0fdf4" />
          
          {/* Bookshelf background */}
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="120" height="180" fill="#78350f" rx="3" />
            <rect x="8" y="30" width="104" height="40" fill="#334155" />
            <rect x="8" y="80" width="104" height="40" fill="#334155" />
            <rect x="8" y="130" width="104" height="40" fill="#334155" />
            {/* Books in shelf */}
            <rect x="15" y="35" width="8" height="35" fill="#ef4444" />
            <rect x="25" y="32" width="10" height="38" fill="#3b82f6" />
            <rect x="37" y="38" width="8" height="32" fill="#10b981" />
            <rect x="47" y="34" width="9" height="36" fill="#f59e0b" />
            <rect x="15" y="85" width="11" height="35" fill="#8b5cf6" />
            <rect x="28" y="82" width="8" height="38" fill="#ec4899" />
          </g>

          {/* Girl carrying box of books */}
          <g transform="translate(200, 50)">
            {/* Hair */}
            <path d="M45,20 C30,20 25,35 25,55 C25,75 35,90 35,90 L60,90 C60,90 70,75 70,55 C70,35 65,20 45,20 Z" fill="#1e293b" />
            {/* Head */}
            <circle cx="48" cy="35" r="16" fill="#fed7aa" />
            <circle cx="53" cy="33" r="2" fill="#1e293b" />
            <path d="M50,42 Q54,45 58,42" stroke="#9a3412" strokeWidth="1.5" fill="none" />
            {/* Clothes */}
            <rect x="32" y="55" width="32" height="45" fill="#3b82f6" rx="4" />
            <rect x="35" y="100" width="10" height="40" fill="#475569" />
            <rect x="50" y="100" width="10" height="40" fill="#475569" />
            {/* Cardboard Box */}
            <rect x="65" y="65" width="55" height="40" fill="#d97706" stroke="#92400e" strokeWidth="1.5" rx="2" />
            {/* Books inside box */}
            <rect x="70" y="55" width="10" height="20" fill="#ef4444" transform="rotate(-10 70 55)" />
            <rect x="85" y="53" width="12" height="22" fill="#10b981" transform="rotate(5 85 53)" />
            <rect x="100" y="57" width="10" height="18" fill="#6366f1" />
            {/* Arms holding box */}
            <path d="M45,65 Q65,85 75,80" stroke="#fed7aa" strokeWidth="7" fill="none" strokeLinecap="round" />
          </g>

          <text x="20" y="30" className="text-xs font-bold fill-slate-700">Picture A: What is the girl carrying?</text>
        </svg>
      );

    case 'library_shelf_books':
      return (
        <svg viewBox="0 0 400 240" className={`${className} rounded-lg bg-slate-50 border border-slate-200 shadow-inner`} xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#f8fafc" />
          
          {/* Study Desk */}
          <polygon points="50,130 350,130 380,185 20,185" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
          <rect x="50" y="185" width="15" height="45" fill="#64748b" />
          <rect x="335" y="185" width="15" height="45" fill="#64748b" />

          {/* Dictionary on Desk */}
          <g transform="translate(160, 100)">
            {/* Blue thick dictionary */}
            <polygon points="10,40 60,25 90,40 40,55" fill="#1d4ed8" stroke="#1e40af" strokeWidth="1.5" />
            {/* Pages edge */}
            <polygon points="10,40 10,50 40,65 40,55" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
            <polygon points="40,55 40,65 90,50 90,40" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
            <text x="35" y="42" fill="#ffffff" fontSize="9" fontWeight="bold" transform="rotate(-12 35 42)">DICT</text>
          </g>

          {/* Desk Lamp */}
          <g transform="translate(60, 70)">
            <ellipse cx="25" cy="65" rx="14" ry="5" fill="#475569" />
            <path d="M25,65 Q25,25 45,30" stroke="#475569" strokeWidth="3" fill="none" />
            <path d="M38,20 L60,35 L40,45 Z" fill="#eab308" />
          </g>

          <text x="20" y="30" className="text-xs font-bold fill-slate-700">Picture B: Where is the dictionary?</text>
        </svg>
      );

    default:
      // General fallbacks for other scenarios (e.g. recycle, travel, tablet)
      return (
        <svg viewBox="0 0 400 240" className={`${className} rounded-lg bg-indigo-50 border border-slate-200 shadow-inner`} xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#eef2ff" />
          <rect x="40" y="50" width="320" height="140" rx="8" fill="#ffffff" stroke="#c7d2fe" strokeWidth="2" />
          <circle cx="120" cy="110" r="28" fill="#6366f1" opacity="0.8" />
          <rect x="180" y="85" width="130" height="12" rx="3" fill="#cbd5e1" />
          <rect x="180" y="105" width="90" height="12" rx="3" fill="#94a3b8" />
          <rect x="180" y="125" width="110" height="12" rx="3" fill="#cbd5e1" />
          <text x="20" y="30" className="text-xs font-bold fill-slate-700">Illustration Scene</text>
        </svg>
      );
  }
};
