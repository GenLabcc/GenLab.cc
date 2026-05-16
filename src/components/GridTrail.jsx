import { useEffect, useRef } from 'react';

const CELL_SIZE = 60;
const TRAIL_COLOR = { r: 194, g: 230, b: 0 }; // #c2e600 brand green
const DECAY_SPEED = 0.004; // very slow decay for a long, smooth trail
const PEAK_OPACITY = 0.18; // max opacity of a lit cell

export default function GridTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const isMobile =
      window.matchMedia('(max-width: 768px)').matches ||
      'ontouchstart' in window;
    if (isMobile) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let cols, rows;
    // Map of "col,row" -> current opacity (0–1)
    const cells = new Map();
    let rafId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / CELL_SIZE);
      rows = Math.ceil(canvas.height / CELL_SIZE);
    };

    const onMouseMove = (e) => {
      const col = Math.floor(e.clientX / CELL_SIZE);
      const row = Math.floor(e.clientY / CELL_SIZE);
      const key = `${col},${row}`;
      cells.set(key, PEAK_OPACITY);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const [key, opacity] of cells) {
        if (opacity <= 0.005) {
          cells.delete(key);
          continue;
        }

        const [col, row] = key.split(',').map(Number);
        const x = col * CELL_SIZE;
        const y = row * CELL_SIZE;

        ctx.fillStyle = `rgba(${TRAIL_COLOR.r}, ${TRAIL_COLOR.g}, ${TRAIL_COLOR.b}, ${opacity})`;
        ctx.fillRect(x + 1, y + 1, CELL_SIZE - 1, CELL_SIZE - 1);

        // Decay this cell's opacity
        cells.set(key, opacity - DECAY_SPEED);
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        willChange: 'contents',
      }}
    />
  );
}