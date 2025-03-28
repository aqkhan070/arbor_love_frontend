import {  useState } from 'react';


export default function Tooltip({ text, children }) {
    const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex items-center">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative z-10"
      >
        {children}
      </div>
      {showTooltip && (
        <div className="absolute left-full ml-2 p-2 bg-[#ECECEC] text-black text-sm rounded shadow-lg whitespace-nowrap">
          {text}
        </div>
      )}
    </div>
  );
}