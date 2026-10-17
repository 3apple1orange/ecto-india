export default function RoadDivider() {
  return (
    <div className="roaddiv" aria-hidden="true">
      <div className="lane" />
      <div className="rauto">
        <svg viewBox="0 0 64 40" width="84" height="52">
          <g className="bob">
            <ellipse cx="32" cy="35" rx="26" ry="4" fill="rgba(0,0,0,.35)" />
            <rect x="2" y="3" width="56" height="32" rx="11" fill="#A7EB2A" stroke="#000" strokeWidth="3" />
            <rect x="6" y="6" width="36" height="26" rx="8" fill="#000" />
            <path d="M42 8 C50 9 54 13 55 19 C54 25 50 29 42 30 Z" fill="#E9F9C9" stroke="#000" strokeWidth="2.5" />
            <circle cx="57" cy="19" r="3" fill="#fff" stroke="#000" strokeWidth="1.5" />
            <rect x="11" y="15" width="22" height="8" rx="3" fill="#A7EB2A" />
          </g>
        </svg>
      </div>
    </div>
  );
}