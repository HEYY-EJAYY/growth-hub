import { useEffect, useRef } from 'react';
import { useMotion } from '@/lib/motion';

/**
 * Lightweight Canvas2D "communications environment" for the Home hero.
 * Points of light travel along luminous paths and converge into one hub.
 * ~8KB. Pauses off-screen, on tab hide, and under reduce-motion.
 */
export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reduced } = useMotion();

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx = context;

    let raf = 0;
    let running = false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;

    type Particle = { t: number; speed: number; path: number; hue: number; size: number };
    const particles: Particle[] = [];
    const PATHS = 5;
    const PER_PATH = 6;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function hub() {
      return { x: w * 0.5, y: h * 0.55 };
    }

    // control points per path (from edges to hub)
    function pathPoint(i: number, t: number) {
      const c = hub();
      const start = starts[i % starts.length];
      const sx = start.x * w, sy = start.y * h;
      // quadratic curve with slight bend
      const bend = start.bend;
      const cx = (sx + c.x) / 2 + bend.x * w;
      const cy = (sy + c.y) / 2 + bend.y * h;
      const u = 1 - t;
      const x = u * u * sx + 2 * u * t * cx + t * t * c.x;
      const y = u * u * sy + 2 * u * t * cy + t * t * c.y;
      return { x, y };
    }

    const starts = [
      { x: 0.05, y: 0.15, bend: { x: -0.08, y: 0.12 } },
      { x: 0.95, y: 0.2, bend: { x: 0.1, y: 0.1 } },
      { x: 0.08, y: 0.85, bend: { x: -0.1, y: -0.1 } },
      { x: 0.92, y: 0.8, bend: { x: 0.08, y: -0.14 } },
      { x: 0.5, y: 0.02, bend: { x: 0.0, y: 0.18 } },
    ];

    const pointer = { x: 0.5, y: 0.4 };
    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = (e.clientY - rect.top) / rect.height;
    }

    function init() {
      particles.length = 0;
      for (let p = 0; p < PATHS; p++) {
        for (let i = 0; i < PER_PATH; i++) {
          particles.push({
            t: Math.random(),
            speed: 0.0015 + Math.random() * 0.002,
            path: p,
            hue: 150 + Math.random() * 30,
            size: 1.6 + Math.random() * 2.2,
          });
        }
      }
    }

    function drawPath(i: number) {
      const c = hub();
      const s = starts[i];
      const sx = s.x * w, sy = s.y * h;
      const cx = (sx + c.x) / 2 + s.bend.x * w;
      const cy = (sy + c.y) / 2 + s.bend.y * h;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.quadraticCurveTo(cx, cy, c.x, c.y);
      ctx.strokeStyle = 'rgba(110, 231, 183, 0.10)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      // soft volumetric base
      const c = hub();
      const px = c.x + (pointer.x - 0.5) * 40;
      const py = c.y + (pointer.y - 0.4) * 30;
      const grad = ctx.createRadialGradient(px, py, 0, px, py, Math.max(w, h) * 0.7);
      grad.addColorStop(0, 'rgba(5, 150, 105, 0.22)');
      grad.addColorStop(0.45, 'rgba(6, 78, 59, 0.12)');
      grad.addColorStop(1, 'rgba(3, 18, 13, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // paths
      for (let i = 0; i < PATHS; i++) drawPath(i);

      // particles
      for (const p of particles) {
        p.t += p.speed;
        if (p.t > 1) p.t -= 1;
        const pt = pathPoint(p.path, p.t);
        const glow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, p.size * 6);
        glow.addColorStop(0, `hsla(${p.hue}, 80%, 70%, 0.9)`);
        glow.addColorStop(1, `hsla(${p.hue}, 80%, 70%, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, p.size * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `hsla(${p.hue}, 90%, 85%, 0.95)`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // hub
      const pulse = 0.5 + 0.5 * Math.sin(performance.now() / 900);
      const hr = 10 + pulse * 3;
      const hg = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, hr * 6);
      hg.addColorStop(0, 'rgba(110, 231, 183, 0.55)');
      hg.addColorStop(1, 'rgba(110, 231, 183, 0)');
      ctx.fillStyle = hg;
      ctx.beginPath();
      ctx.arc(c.x, c.y, hr * 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(110, 231, 183, 0.9)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(c.x, c.y, hr, 0, Math.PI * 2);
      ctx.stroke();

      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
      // draw one static frame so fallback looks finished
      if (!reduced) frame();
      running = false;
      cancelAnimationFrame(raf);
    }

    function drawStatic() {
      ctx.clearRect(0, 0, w, h);
      const c = hub();
      const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, Math.max(w, h) * 0.6);
      grad.addColorStop(0, 'rgba(5, 150, 105, 0.18)');
      grad.addColorStop(1, 'rgba(3, 18, 13, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < PATHS; i++) drawPath(i);
      ctx.strokeStyle = 'rgba(110, 231, 183, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(c.x, c.y, 11, 0, Math.PI * 2);
      ctx.stroke();
      // static points
      for (let i = 0; i < PATHS; i++) {
        const pt = pathPoint(i, 0.5);
        ctx.fillStyle = 'rgba(110, 231, 183, 0.85)';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    resize();
    init();
    if (reduced) {
      drawStatic();
    } else {
      start();
    }

    canvas.addEventListener('pointermove', onMove);
    window.addEventListener('resize', resize);

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !reduced) start();
        else stop();
      });
    }, { threshold: 0.05 });
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (!reduced) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
