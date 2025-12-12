import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

export default function ErrorPage() {
  const { pathname } = useLocation();

  const containerRef = useRef(null);
  const rafRef = useRef(null);

  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 0, my: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const stars = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: 1 + Math.random() * 2.2,
        o: 0.10 + Math.random() * 0.18,
        d: 0.9 + Math.random() * 1.8,
      })),
    []
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReducedMotion) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const rxTarget = (0.5 - py) * 8;
      const ryTarget = (px - 0.5) * 10;

      const mxTarget = (px - 0.5) * 16;
      const myTarget = (py - 0.5) * 16;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setTilt((prev) => ({
          rx: prev.rx + (rxTarget - prev.rx) * 0.18,
          ry: prev.ry + (ryTarget - prev.ry) * 0.18,
          mx: prev.mx + (mxTarget - prev.mx) * 0.14,
          my: prev.my + (myTarget - prev.my) * 0.14,
        }));
      });
    };

    const onLeave = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setTilt((prev) => ({
          rx: prev.rx + (0 - prev.rx) * 0.22,
          ry: prev.ry + (0 - prev.ry) * 0.22,
          mx: prev.mx + (0 - prev.mx) * 0.18,
          my: prev.my + (0 - prev.my) * 0.18,
        }));
      });
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const cardTransform = `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translate3d(0,0,0)`;
  const innerTranslate = `translate3d(${tilt.mx}px, ${tilt.my}px, 0)`;

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-green-200 via-gray-400 to-blue-200 text-slate-900">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-48 -top-48 h-[560px] w-[560px] rounded-full blur-3xl opacity-95
                     bg-linear-to-br from-sky-300/35 via-indigo-200/25 to-violet-300/30
                     animate-[float1_12s_ease-in-out_infinite]"
          style={{ transform: `translate3d(${tilt.mx * 0.35}px, ${tilt.my * 0.35}px, 0)` }}
        />
        <div
          className="absolute -right-56 top-[18%] h-[660px] w-[660px] rounded-full blur-3xl opacity-90
                     bg-linear-to-br from-emerald-200/35 via-sky-200/25 to-cyan-200/30
                     animate-[float2_14s_ease-in-out_infinite]"
          style={{ transform: `translate3d(${tilt.mx * -0.3}px, ${tilt.my * 0.25}px, 0)` }}
        />
        <div
          className="absolute -bottom-64 left-[16%] h-[720px] w-[720px] rounded-full blur-3xl opacity-85
                     bg-linear-to-br from-violet-200/30 via-rose-200/20 to-amber-100/25
                     animate-[float3_16s_ease-in-out_infinite]"
          style={{ transform: `translate3d(${tilt.mx * 0.22}px, ${tilt.my * -0.3}px, 0)` }}
        />

        <div
          className="absolute -inset-[40%] rotate-12 opacity-25 animate-[gridDrift_22s_linear_infinite]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(30,41,59,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,41,59,0.07) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            transform: `translate3d(${tilt.mx * -0.12}px, ${tilt.my * 0.1}px, 0) rotate(12deg)`,
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.05] animate-[scan_7s_linear_infinite]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(30,41,59,0.10), rgba(30,41,59,0.10) 1px, transparent 1px, transparent 10px)",
          }}
        />

        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full bg-slate-700"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.s}px`,
              height: `${s.s}px`,
              opacity: s.o,
              transform: `translate3d(${tilt.mx * s.d}px, ${tilt.my * s.d}px, 0)`,
              boxShadow: "0 0 10px rgba(15,23,42,0.10)",
            }}
          />
        ))}
      </div>

      <section
        ref={containerRef}
        className="relative mx-auto flex min-h-screen w-full max-w-[860px] items-center px-6 py-12"
      >
        <div
          className="w-full"
          style={{
            transform: cardTransform,
            transformStyle: "preserve-3d",
            transition: isHovering ? "transform 60ms linear" : "transform 420ms ease",
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            className="relative rounded-2xl border border-slate-200/80 bg-slate-50/70 p-7
                       shadow-[0_18px_60px_rgba(2,6,23,0.10)] backdrop-blur"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-90"
              style={{
                background:
                  "radial-gradient(520px 240px at 50% 20%, rgba(99,102,241,0.16), transparent 62%)",
                transform: innerTranslate,
              }}
            />

            <div style={{ transform: `translate3d(${tilt.mx * 0.2}px, ${tilt.my * 0.2}px, 18px)` }}>
              <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/80 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-900/80">
                You seem lost
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500/70" />
              </p>
            </div>

            <h1 className="mt-4 text-[clamp(64px,10vw,120px)] font-black leading-[0.9] tracking-[-0.05em] text-slate-900">
              <span
                className="relative inline-block animate-[wobble_2.8s_ease-in-out_infinite]
                           [text-shadow:0_0_18px_rgba(99,102,241,0.18),0_0_30px_rgba(56,189,248,0.14)]"
                style={{ transform: `translate3d(${tilt.mx * 0.35}px, ${tilt.my * 0.25}px, 30px)` }}
              >
                <span className="relative inline-block animate-[floatText_3.6s_ease-in-out_infinite]">
                  <span className="bg-linear-to-r from-slate-900 via-black to-slate-900 bg-size-[220%_100%] bg-clip-text text-transparent animate-[shimmer_2.8s_linear_infinite]">
                    404
                  </span>
                </span>

                <span className="pointer-events-none absolute inset-0 translate-x-0.5 text-green-200 animate-[glitch1_2.6s_steps(1,end)_infinite] [clip-path:inset(0_0_0_0)]">
                  404
                </span>
                <span className="pointer-events-none absolute inset-0 -translate-x-0.5 text-black animate-[glitch2_2.2s_steps(1,end)_infinite] [clip-path:inset(0_0_0_0)]">
                  404
                </span>
              </span>
            </h1>

            <p
              className="mt-3 text-base text-slate-800"
              style={{ transform: `translate3d(${tilt.mx * 0.14}px, ${tilt.my * 0.1}px, 22px)` }}
            >
              Oops! The page you’re looking for can’t be found.
            </p>
            <p
              className="mt-1 text-sm text-slate-700"
              style={{ transform: `translate3d(${tilt.mx * 0.12}px, ${tilt.my * 0.08}px, 20px)` }}
            >
              It might have been moved, deleted, or the URL may be incorrect.
            </p>

            <p
              className="mt-4 text-sm text-slate-700"
              style={{ transform: `translate3d(${tilt.mx * 0.10}px, ${tilt.my * 0.08}px, 18px)` }}
            >
              <span className="text-slate-600">Path:</span>{" "}
              <code className="rounded-xl border border-slate-200 bg-slate-100/70 px-2 py-1 text-slate-800">
                {pathname}
              </code>
            </p>

            <div
              className="mt-6 flex flex-wrap gap-3"
              style={{ transform: `translate3d(${tilt.mx * 0.08}px, ${tilt.my * 0.08}px, 26px)` }}
            >
              <button
                onClick={() => window.history.back()}
                className="cursor-pointer shadow-2xl inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-100/70 px-4 py-3
                           text-sm font-semibold text-slate-800 transition hover:bg-slate-100 active:scale-[0.98] hover:-translate-y-0.5"
              >
                Go back
              </button>

              <Link
                to="/"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl
                           border border-indigo-200 bg-linear-to-br from-indigo-600 to-sky-600
                           px-4 py-3 text-sm font-semibold text-white
                           transition hover:opacity-95 active:scale-[0.98] hover:-translate-y-0.5"
              >
                Go to homepage
                <span className="pointer-events-none absolute -inset-y-10 -inset-x-24 rotate-15 bg-linear-to-r from-transparent via-white/45 to-transparent opacity-0 transition group-hover:opacity-100 group-hover:animate-[shine_1.2s_ease-in-out]" />
              </Link>
            </div>

            <div
              className="mt-6 border-t border-dashed border-slate-200 pt-4 text-[13px] text-slate-600"
              style={{ transform: `translate3d(${tilt.mx * 0.05}px, ${tilt.my * 0.05}px, 14px)` }}
            >
              If you think this is a mistake, try refreshing the page or contact support.
            </div>
          </div>
        </div>

        <style>{`
          @media (prefers-reduced-motion: reduce) {
            * { animation: none !important; transition: none !important; }
          }

          @keyframes gridDrift {
            from { transform: translate3d(0,0,0) rotate(12deg); }
            to   { transform: translate3d(-120px, 80px, 0) rotate(12deg); }
          }
          @keyframes scan {
            from { transform: translateY(-18px); }
            to   { transform: translateY(18px); }
          }

          @keyframes float1 {
            0%,100% { transform: translate(-10px, -10px) scale(1); }
            50%     { transform: translate(40px, 25px) scale(1.06); }
          }
          @keyframes float2 {
            0%,100% { transform: translate(20px, 0px) scale(1); }
            50%     { transform: translate(-35px, -25px) scale(1.05); }
          }
          @keyframes float3 {
            0%,100% { transform: translate(0px, 10px) scale(1); }
            50%     { transform: translate(30px, -20px) scale(1.04); }
          }

          @keyframes wobble {
            0%,100% { transform: translate(0,0) rotate(0deg); }
            50%     { transform: translate(0, -1px) rotate(-0.2deg); }
          }

          @keyframes shimmer {
            from { background-position: 0% 50%; }
            to   { background-position: 220% 50%; }
          }

          @keyframes floatText {
            0%,100% { transform: translateY(0px); }
            50%     { transform: translateY(-6px); }
          }

          @keyframes glitch1 {
            0%,100% { clip-path: inset(0 0 0 0); }
            8%  { clip-path: inset(12% 0 70% 0); }
            12% { clip-path: inset(35% 0 35% 0); }
            16% { clip-path: inset(65% 0 12% 0); }
            22% { clip-path: inset(15% 0 60% 0); }
            28% { clip-path: inset(0 0 0 0); }
          }
          @keyframes glitch2 {
            0%,100% { clip-path: inset(0 0 0 0); }
            10% { clip-path: inset(60% 0 14% 0); }
            14% { clip-path: inset(10% 0 75% 0); }
            18% { clip-path: inset(42% 0 38% 0); }
            24% { clip-path: inset(0 0 0 0); }
          }

          @keyframes shine {
            0%   { transform: rotate(15deg) translateX(-70%); opacity: 0; }
            40%  { opacity: 1; }
            100% { transform: rotate(15deg) translateX(70%); opacity: 0; }
          }
        `}</style>
      </section>
    </main>
  );
}