import { frame, places, project, routes } from "@/content/geo";

const W = 760;
const H = 520;

/** Survey-style map: lat/long graticule, real town positions and the highway packages between them. */
export function AreaMap({ highlight }: { highlight?: string }) {
  const lats = [20.5, 21, 21.5, 22];
  const lons = [84, 84.5, 85, 85.5, 86, 86.5, 87];

  return (
    <figure className="relative border border-line bg-asphalt">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="area-map-title" className="block h-auto w-full">
        <title id="area-map-title">{`Map of Aretus operating areas in Odisha: ${Object.values(places)
          .map((p) => p.name)
          .join(", ")}.`}</title>
        <g stroke="var(--line)" strokeWidth="1">
          {lats.map((lat) => {
            const { y } = project(lat, frame.lonMin, W, H);
            return <line key={lat} x1="0" x2={W} y1={y} y2={y} />;
          })}
          {lons.map((lon) => {
            const { x } = project(frame.latMin, lon, W, H);
            return <line key={lon} y1="0" y2={H} x1={x} x2={x} />;
          })}
        </g>
        <g fill="var(--steel-light)" fontSize="11" fontFamily="var(--font-barlow)" opacity="0.6">
          {lats.map((lat) => (
            <text key={lat} x="8" y={project(lat, frame.lonMin, W, H).y - 6}>
              {lat.toFixed(1)}°N
            </text>
          ))}
          {lons.map((lon) => (
            <text key={lon} y={H - 8} x={project(frame.latMin, lon, W, H).x + 6}>
              {lon.toFixed(1)}°E
            </text>
          ))}
        </g>

        {routes.map((r) => {
          const pts = r.stops.map((k) => project(places[k].lat, places[k].lon, W, H));
          return (
            <polyline
              key={r.label}
              points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke="var(--signal)"
              strokeWidth="4"
              strokeDasharray="14 10"
              strokeLinecap="square"
            />
          );
        })}

        {Object.entries(places).map(([key, p]) => {
          const { x, y } = project(p.lat, p.lon, W, H);
          const active = !highlight || highlight === key;
          const flip = x > W * 0.78;
          return (
            <g key={key} opacity={active ? 1 : 0.35}>
              <circle cx={x} cy={y} r="16" fill="var(--signal)" opacity="0.12" />
              <circle cx={x} cy={y} r="5" fill="var(--signal)" />
              <text
                x={flip ? x - 12 : x + 12}
                y={y - 10}
                textAnchor={flip ? "end" : "start"}
                fill="var(--dust)"
                fontSize="18"
                fontWeight="700"
                fontFamily="var(--font-barlow-condensed)"
                letterSpacing="1.5"
              >
                {p.name.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="flex items-center justify-between gap-4 border-t border-line px-5 py-3 text-sm text-dust-dim">
        <span>Odisha operating area</span>
        <span className="font-display font-semibold uppercase tracking-wider text-steel-light">+ Yamuna Expressway, UP</span>
      </figcaption>
    </figure>
  );
}
