const items = [
  "Autos and e-rickshaws",
  "Driver-first",
  "No commission",
  "11 trial cities",
  "Uttar Pradesh",
  "Haryana",
  "Punjab",
  "Local trust",
  "One city at a time",
  "Active since 2024",
];

export default function Marquee() {
  return (
    <div className="marqwrap" aria-hidden="true">
      <div className="marqin">
        <div className="track">
          {[0, 1].map((copy) =>
            items.map((t) => (
              <span key={`${copy}-${t}`}>
                {t}
                <i />
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}