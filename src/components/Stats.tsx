const stats = [
  { value: 11, from: 0, suffix: "", label: "trial cities", count: true },
  { value: 3, from: 0, suffix: "", label: "states: Uttar Pradesh, Haryana and Punjab", count: true },
  { value: 0, from: 0, suffix: "%", label: "commission on rides, by design", count: false },
  { value: 2024, from: 2000, suffix: "", label: "active since February", count: true },
];

export default function Stats() {
  return (
    <section className="stats" aria-label="ECTO at a glance">
      <div className="wrap">
        <div className="statgrid">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="num">
                <span {...(s.count ? { "data-count": s.value, "data-from": s.from } : {})}>{s.value}</span>
                {s.suffix}
              </div>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}