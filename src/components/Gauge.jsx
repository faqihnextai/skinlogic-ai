import React from "react";

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}
function valueToAngle(v) {
  return 180 - (v / 100) * 180;
}
function describeArc(cx, cy, r, v1, v2) {
  const start = polarToCartesian(cx, cy, r, valueToAngle(v1));
  const end = polarToCartesian(cx, cy, r, valueToAngle(v2));
  return `M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y}`;
}

export default function Gauge({ score }) {
  const cx = 120, cy = 118, r = 92;
  const rotation = 1.8 * score - 90;
  return (
    <svg viewBox="0 0 240 150" className="w-full max-w-xs mx-auto block">
      <path d={describeArc(cx, cy, r, 0, 40)} stroke="#f43f5e" strokeWidth="18" fill="none" strokeLinecap="round" opacity="0.8" />
      <path d={describeArc(cx, cy, r, 40, 70)} stroke="#eab308" strokeWidth="18" fill="none" opacity="0.8" />
      <path d={describeArc(cx, cy, r, 70, 100)} stroke="#f472b6" strokeWidth="18" fill="none" strokeLinecap="round" opacity="0.8" />
      <g
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: `${cx}px ${cy}px`,
          transition: "transform 1s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <line x1={cx} y1={cy} x2={cx} y2={cy - r + 30} stroke="#a16207" strokeWidth="4" strokeLinecap="round" />
      </g>
      <circle cx={cx} cy={cy} r="7" fill="#a16207" />
      <text x={cx} y={cy - 16} textAnchor="middle" fontFamily="Fraunces, serif" fontSize="38" fontWeight="600" fill="#4c0519">
        {score}
      </text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="12" fill="#9f1239">
        Skor Barrier
      </text>
    </svg>
  );
}
