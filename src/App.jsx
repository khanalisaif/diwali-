import { useEffect, useState, useRef } from 'react';
import {
  LogOut,
  Phone,
  Play,
  Pause,
  Heart,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const wishes = [
  {
    title: 'Happy Dhanteras',
    tag: 'PROSPERITY & GOOD FORTUNE',
    image: '/images/dhanteras-art.jpg',
    text: 'May this Dhanteras bring wealth, good health and prosperity to your home. May Goddess Lakshmi bless you with abundance and happiness.'
  },
  {
    title: 'Happy Diwali',
    tag: 'FESTIVAL OF LIGHTS',
    image: '/images/diwali-art.jpg',
    text: 'May the festival of lights remove darkness from your life and fill it with happiness, peace and success. Wishing you and your family a sparkling Diwali.'
  },
  {
    title: 'Happy Chhath Puja',
    tag: 'FAITH & DEVOTION',
    image: '/images/chhath-art.jpg',
    text: 'May the blessings of Surya Dev bring good health, happiness and prosperity to you and your family. Chhath Puja ki hardik shubhkamnayein.'
  }
];

// Interactive background particles (floating embers, stars, tap sparkles)
function FestiveCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Continuous floating particles (golden embers & soft glowing orbs)
    const count = Math.min(Math.floor(width / 35), 45);
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.8 + 1,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      fadeSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      hue: Math.random() > 0.3 ? 42 : Math.random() > 0.5 ? 20 : 55 // golden, amber, warm yellow
    }));

    // Interactive burst particles when clicking/tapping
    const bursts = [];
    const addBurst = (clientX, clientY) => {
      const burstCount = 16;
      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount + Math.random() * 0.4;
        const speed = Math.random() * 3.5 + 1.5;
        bursts.push({
          x: clientX,
          y: clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 1.5,
          alpha: 1,
          decay: Math.random() * 0.025 + 0.015,
          color: Math.random() > 0.4 ? '#ffcf40' : Math.random() > 0.5 ? '#ff841f' : '#fff'
        });
      }
    };

    const handlePointerDown = (e) => {
      const x = e.clientX || (e.touches && e.touches[0]?.clientX);
      const y = e.clientY || (e.touches && e.touches[0]?.clientY);
      if (x !== undefined && y !== undefined) {
        addBurst(x, y);
      }
    };
    window.addEventListener('pointerdown', handlePointerDown);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render floating festive embers
      for (let p of particles) {
        p.y -= p.speedY;
        p.x += Math.sin(p.y * 0.01) * p.speedX;
        p.alpha += p.fadeSpeed;
        if (p.alpha <= 0.15 || p.alpha >= 0.85) p.fadeSpeed = -p.fadeSpeed;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.alpha})`;
        ctx.shadowColor = `hsl(${p.hue}, 100%, 55%)`;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      // Render interactive click/tap bursts
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx;
        b.y += b.vy;
        b.vy += 0.06;
        b.alpha -= b.decay;

        if (b.alpha <= 0) {
          bursts.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.globalAlpha = Math.max(0, b.alpha);
        ctx.shadowColor = '#ffb300';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="festive-canvas" aria-hidden="true" />;
}

// Traditional Auspicious Marigold (Genda Phool) & Mango Leaf Toran with Swaying Golden Bells
function FestiveToran() {
  const unitsCount = 14;
  return (
    <div className="festive-toran-container" aria-hidden="true">
      <div className="toran-top-border" />
      <div className="toran-units-track">
        {Array.from({ length: unitsCount }, (_, i) => (
          <div key={i} className="toran-unit" style={{ '--i': i }}>
            <svg
              className="toran-svg"
              viewBox="0 0 110 85"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={`goldGrad-${i}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fff8b5" />
                  <stop offset="50%" stopColor="#f5b82e" />
                  <stop offset="100%" stopColor="#9e6002" />
                </linearGradient>
                <linearGradient id={`leafGrad-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4caf50" />
                  <stop offset="100%" stopColor="#1b5e20" />
                </linearGradient>
                <linearGradient id={`marigoldGrad-${i}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffd54f" />
                  <stop offset="50%" stopColor="#ff9800" />
                  <stop offset="100%" stopColor="#e65100" />
                </linearGradient>
              </defs>

              {/* Marigold Swag Curve */}
              <path
                d="M 0,6 Q 55,42 110,6"
                stroke={`url(#marigoldGrad-${i})`}
                strokeWidth="6.5"
                strokeLinecap="round"
                strokeDasharray="4 8"
              />
              <path
                d="M 0,9 Q 55,45 110,9"
                stroke="#ffe082"
                strokeWidth="2"
                fill="none"
                opacity="0.85"
              />

              {/* Mango leaves hanging along the swag */}
              <path
                d="M 26,18 C 22,30 29,38 29,38 C 29,38 35,30 32,18 Z"
                fill={`url(#leafGrad-${i})`}
              />
              <path
                d="M 82,18 C 78,30 85,38 85,38 C 85,38 91,30 88,18 Z"
                fill={`url(#leafGrad-${i})`}
              />
              <path
                d="M 53,24 C 50,38 55,48 55,48 C 55,48 60,38 57,24 Z"
                fill={`url(#leafGrad-${i})`}
              />

              {/* Marigold flower rosettes at junctions */}
              <circle cx="0" cy="6" r="7.5" fill="#ff7a00" />
              <circle cx="0" cy="6" r="4.5" fill="#ffca28" />
              <circle cx="0" cy="6" r="2" fill="#fff" />

              <circle cx="110" cy="6" r="7.5" fill="#ff7a00" />
              <circle cx="110" cy="6" r="4.5" fill="#ffca28" />
              <circle cx="110" cy="6" r="2" fill="#fff" />

              {/* Swaying Golden Bell with Beads */}
              <g className="hanging-bell-group">
                <line x1="55" y1="24" x2="55" y2="52" stroke="#ffd700" strokeWidth="1.5" strokeDasharray="1 3" />
                <circle cx="55" cy="35" r="3.2" fill="#ff9800" />
                <circle cx="55" cy="43" r="2.2" fill="#ffd700" />

                {/* Bell Body */}
                <path
                  d="M 49,52 C 49,46 61,46 61,52 L 63,65 C 66,69 44,69 47,65 Z"
                  fill={`url(#goldGrad-${i})`}
                  stroke="#ffe082"
                  strokeWidth="0.8"
                />
                <ellipse cx="55" cy="65" rx="7.5" ry="2" fill="#b26a00" />
                {/* Clapper */}
                <circle cx="55" cy="68.5" r="2.4" fill="#ffd700" />
              </g>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

// Traditional Glowing Diyas with realistic dancing flame
function Diyas() {
  return (
    <div className="diyas" aria-hidden="true">
      <span className="diya-item diya-left">🪔</span>
      <span className="diya-item diya-center">🪔</span>
      <span className="diya-item diya-right">🪔</span>
    </div>
  );
}

// Spectacular Diwali Rockets Celebration Canvas (Rockets shoot from bottom to top and burst with fireworks)
function CelebrationRocketCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const colorThemes = [
      ['#ffd700', '#ffaa00', '#ffffff', '#ffeb3b', '#ff9800'], // Golden Sparkler
      ['#ff1744', '#ff5252', '#ffd700', '#ff80ab', '#ffffff'], // Ruby Celebration
      ['#00e676', '#69f0ae', '#ffd700', '#b9f6ca', '#00b0ff'], // Emerald & Gold
      ['#ff9100', '#ff6d00', '#ffd700', '#ffffff', '#ff3d00'], // Saffron Flame
      ['#e040fb', '#7c4dff', '#ffd700', '#ea80fc', '#ffffff']  // Royal Violet & Gold
    ];

    const rockets = [];
    const particles = [];
    const flashes = [];

    // Launch rocket from bottom towards (targetX, targetY)
    const launchRocket = (startX, targetX, targetY) => {
      const sx = startX !== undefined ? startX : Math.random() * (width * 0.8) + width * 0.1;
      const sy = height + 10;
      const tx = targetX !== undefined ? targetX : Math.random() * (width * 0.7) + width * 0.15;
      const ty = targetY !== undefined ? targetY : Math.random() * (height * 0.35) + height * 0.12;

      const dx = tx - sx;
      const dy = ty - sy;
      const dist = Math.hypot(dx, dy);
      const speed = Math.random() * 2.5 + 13.5;
      const vx = (dx / dist) * speed;
      const vy = (dy / dist) * speed;

      const theme = colorThemes[Math.floor(Math.random() * colorThemes.length)];

      rockets.push({
        x: sx,
        y: sy,
        vx,
        vy,
        tx,
        ty,
        theme,
        trail: []
      });
    };

    // Explosion starburst at (x, y)
    const explode = (x, y, theme) => {
      // Light flash
      flashes.push({
        x,
        y,
        radius: Math.random() * 45 + 35,
        alpha: 0.5,
        color: theme[0]
      });

      // 55-75 celebratory sparks
      const sparkCount = Math.floor(Math.random() * 22) + 55;
      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5.8 + 1.2;
        const color = theme[Math.floor(Math.random() * theme.length)];
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.8 + 1.6,
          color,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.012,
          gravity: 0.09,
          drag: 0.965,
          flicker: Math.random() > 0.45
        });
      }

      // Willow streamers
      const streamerCount = 14;
      for (let i = 0; i < streamerCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.6 + 2.2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2.2,
          color: '#ffffff',
          alpha: 1,
          decay: 0.014,
          gravity: 0.065,
          drag: 0.98
        });
      }
    };

    // Auto-launch rockets at lively celebration intervals
    let launchTimer;
    const scheduleNextLaunch = () => {
      const delay = Math.random() * 500 + 650; // every 650ms - 1150ms
      launchTimer = setTimeout(() => {
        const side = Math.random();
        let sx;
        if (side < 0.45) {
          sx = Math.random() * (width * 0.28) + width * 0.04; // Left
        } else if (side < 0.9) {
          sx = Math.random() * (width * 0.28) + width * 0.68; // Right
        } else {
          sx = Math.random() * (width * 0.3) + width * 0.35; // Center
        }
        launchRocket(sx);
        scheduleNextLaunch();
      }, delay);
    };

    // Staggered initial launches for immediate celebration excitement
    launchRocket(width * 0.15, width * 0.25, height * 0.22);
    setTimeout(() => launchRocket(width * 0.85, width * 0.72, height * 0.18), 350);
    setTimeout(() => launchRocket(width * 0.3, width * 0.42, height * 0.16), 850);
    setTimeout(() => launchRocket(width * 0.7, width * 0.6, height * 0.24), 1350);
    scheduleNextLaunch();

    // Interactive launch on pointerdown/click
    const onPointerDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0]?.clientX)) - rect.left;
      const y = (e.clientY || (e.touches && e.touches[0]?.clientY)) - rect.top;
      if (!isNaN(x) && !isNaN(y)) {
        const sx = x < width * 0.5 ? width * 0.12 : width * 0.88;
        launchRocket(sx, x, y);
      }
    };
    canvas.addEventListener('pointerdown', onPointerDown);

    // 60FPS Render Loop
    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Flashes
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        f.alpha -= 0.04;
        if (f.alpha <= 0) {
          flashes.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
        grad.addColorStop(0, `rgba(255, 240, 200, ${f.alpha})`);
        grad.addColorStop(1, 'rgba(255, 180, 50, 0)');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }

      // 2. Rockets shooting from bottom to top
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];

        // Sizzling rocket sparks trail
        r.trail.push({
          x: r.x + (Math.random() - 0.5) * 4,
          y: r.y + (Math.random() - 0.5) * 4,
          alpha: 1,
          size: Math.random() * 2.8 + 1.2,
          color: Math.random() > 0.4 ? '#ffb300' : Math.random() > 0.5 ? '#ff3d00' : '#ffffff'
        });

        if (r.trail.length > 20) r.trail.shift();

        // Move upward with slight deceleration
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.08;

        // Render sparkling tail
        for (let j = 0; j < r.trail.length; j++) {
          const t = r.trail[j];
          t.alpha -= 0.055;
          ctx.save();
          ctx.beginPath();
          ctx.arc(t.x, t.y, t.size * (j / r.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = t.color;
          ctx.globalAlpha = Math.max(0, t.alpha);
          ctx.shadowColor = '#ff6d00';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
        }

        // Rocket burning tip
        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffea00';
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.restore();

        // Check if rocket reached top explosion target
        const reachedTarget = r.y <= r.ty || (r.vy >= -1 && r.y < height * 0.7);
        if (reachedTarget) {
          explode(r.x, r.y, r.theme);
          rockets.splice(i, 1);
        }
      }

      // 3. Explosion Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        let displayAlpha = p.alpha;
        if (p.flicker && Math.random() > 0.4) {
          displayAlpha *= Math.random() * 0.6 + 0.4;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, displayAlpha);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('pointerdown', onPointerDown);
      clearTimeout(launchTimer);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="celebration-rocket-canvas" aria-hidden="true" />;
}

// Intro Screen with celebration, progress bar & skip option
function Intro({ done }) {
  useEffect(() => {
    const t = setTimeout(done, 4200);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <section className="intro">
      <FestiveCanvas />
      <CelebrationRocketCanvas />
      <FestiveToran />
      <div className="intro-inner">
        <div className="intro-lamp-wrap">
          <div className="intro-lamp">🪔</div>
          <div className="lamp-halo" />
        </div>
        <div className="intro-kicker">
          <span>✧</span> FESTIVAL OF LIGHTS · LOVE &amp; TOGETHERNESS <span>✧</span>
        </div>
        <h1 className="intro-title">
          Happy<br />
          <em className="shimmer-text">Diwali</em>
        </h1>
        <div className="ornament">✧ ───── ❈ ───── ✧</div>
        <p className="intro-subtitle">
          May your home glow with joy<br />
          and your heart shine with happiness
        </p>
        <Diyas />
        <div className="progress-container">
          <div className="progress">
            <span />
          </div>
        </div>
        <small className="intro-loading-label">CELEBRATING THE FESTIVAL OF LIGHTS...</small>
        <button className="skip-intro-btn" onClick={done}>
          Skip to Festival ➜
        </button>
      </div>
    </section>
  );
}

// Login Screen with single 16:9 photo (image (52).png) + ONLY Mobile number field
function Login({ onLogin }) {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!/^\d{10}$/.test(mobile.trim())) {
      setError('Kripya apna 10 digit mobile number enter karein.');
      return;
    }
    onLogin({ mobile: mobile.trim() });
  }

  return (
    <main className="login-screen">
      <FestiveCanvas />
      <div className="login-bg-lights" />
      <FestiveToran />
      <div className="welcome-art">
        <div className="welcome-label">
          <span className="welcome-namaste">🙏</span> Welcome to Diwali Celebration{' '}
          <span className="welcome-namaste">🙏</span>
        </div>

        {/* Big glowing Diya - properly centered and visible */}
        <div className="lamp-mark-wrap">
          <div className="lamp-mark">🪔</div>
          <div className="diya-aura" />
          <div className="diya-aura diya-aura-2" />
        </div>

        <h1 className="welcome-title shimmer-text">Happy Diwali</h1>
        <p className="welcome-text">
          Wishing you and your family a<br />
          very Happy &amp; Prosperous Diwali
        </p>
        <div className="ornament">✧ ❧ ❈ ❧ ✧</div>

        {/* ONLY ONE PHOTO: video-poster.png in custom frame sized for full 16:9 landscape photo */}
        <div className="single-photo-container">
          <div className="single-photo-frame">
            <img src="/video-poster.png" alt="Diwali Celebration" className="single-photo-img" />
          </div>
        </div>
      </div>

      <form className="login-box" onSubmit={submit}>
        <div className="login-heading">
          <div className="login-icon-wrap">
            <Phone size={22} />
          </div>
          <h2>Login to Celebrate</h2>
        </div>

        <label className="login-input">
          <Phone className="input-icon" />
          <input
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
              if (error) setError('');
            }}
            placeholder="Enter 10-Digit Mobile Number"
            inputMode="numeric"
            maxLength={10}
            autoFocus
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button className="login-button" type="submit">
          <span>➜ &nbsp; Login to Celebrate</span>
        </button>

        {/* 3 Centered, dancing, glowing Diyas */}
        <div className="login-diyas-container">
          <Diyas />
        </div>
      </form>

      <div className="login-footer">
        ✦ &nbsp; MAY THE LIGHT OF DIWALI BRIGHTEN YOUR LIFE &nbsp; ✦
      </div>
    </main>
  );
}

// 5 Step Festival Slides: Dhanteras -> Diwali -> Chhath Puja -> WhatsApp Video -> YouTube
const festivalSlides = [
  {
    id: 'dhanteras',
    stepTitle: 'Dhanteras',
    title: 'Happy Dhanteras',
    tag: 'PROSPERITY & GOOD FORTUNE',
    icon: '',
    image: '/images/dhanteras-art.jpg',
    greeting: 'Shubh Dhanteras',
    text: 'May this Dhanteras bring wealth, good health and prosperity to your home. May Goddess Lakshmi bless you with abundance and happiness.',
    subtext: 'Dhanvantari aur Maa Lakshmi ke aashirwaad se aapka jeevan sadaiva sukh, samriddhi aur aarogya se paripoorna rahe.',
    nextLabel: 'Next: Happy Diwali'
  },
  {
    id: 'diwali',
    stepTitle: 'Diwali',
    title: 'Happy Diwali',
    tag: 'FESTIVAL OF LIGHTS',
    icon: '',
    image: '/images/diwali-art.jpg',
    greeting: 'Shubh Deepawali',
    text: 'May the festival of lights remove darkness from your life and fill it with happiness, peace and success. Wishing you and your family a sparkling Diwali.',
    subtext: 'Deepon ka ye paavan tyohar aapke aangan mein khushiyan, pragati aur prem ki amrit dhara bahaaye.',
    nextLabel: 'Next: Happy Chhath Puja'
  },
  {
    id: 'chhath',
    stepTitle: 'Chhath Puja',
    title: 'Happy Chhath Puja',
    tag: 'FAITH & DEVOTION',
    icon: '',
    image: '/images/chhath-art.jpg',
    greeting: 'Chhath Mahaparv',
    text: 'May the blessings of Surya Dev bring good health, happiness and prosperity to you and your family. Chhath Puja ki hardik shubhkamnayein.',
    subtext: 'Bhagwan Bhaskar aur Chhathi Maiya ki kripa se aapke jeevan mein naya savera aur apaar unnati aave.',
    nextLabel: 'Next: Watch Special Video'
  },
  {
    id: 'special-video',
    stepTitle: 'Special Video',
    title: 'Festival Special Celebration Video',
    tag: 'EXCLUSIVE CELEBRATION',
    icon: '🎬',
    type: 'video',
    videoSrc: '/festival-video.mp4',
    poster: '/video-poster.png',
    text: 'Auspicious festival moments filled with joy, diyas, laughter and celebrations with loved ones.',
    nextLabel: 'Next: YouTube Celebration'
  },
  {
    id: 'youtube-video',
    stepTitle: 'YouTube',
    title: 'YouTube Celebration Special',
    tag: 'DIWALI SPECIAL MUSIC & JOY',
    icon: '▶️',
    type: 'youtube',
    text: 'Enjoy festive music and glorious celebration moments to make this Diwali unforgettable!',
    nextLabel: 'Celebrate Again'
  }
];

// Interactive Celebration Video with Image Preview (NO black frame) & Center Start/Pause Buttons
function FestivalVideoPlayer({ src, poster }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;

    if (v.paused || v.ended) {
      v.play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch((err) => {
          console.warn('Video play prevented:', err);
        });
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="local-video-shell" onClick={togglePlay}>
      {/* 1. Crystal clear poster from second photo - guarantees NO black frame */}
      {!hasStarted && (
        <img
          src={poster}
          alt="Festival Celebration Video"
          className="video-poster-fallback-img"
        />
      )}

      {/* 2. Video element */}
      <video
        ref={videoRef}
        className={`local-video-player ${!hasStarted ? 'video-hidden-before-start' : ''}`}
        src={src}
        controls={hasStarted}
        playsInline
        preload="auto"
        poster={poster}
        onPlay={() => {
          setIsPlaying(true);
          setHasStarted(true);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setHasStarted(false);
        }}
      >
        Your browser does not support the video tag.
      </video>

      {/* 3. Center Start (Play) & Push (Pause) button */}
      {(!hasStarted || !isPlaying) && (
        <button
          type="button"
          className="center-video-btn"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause size={32} fill="#ffffff" color="#ffffff" />
          ) : (
            <Play size={32} fill="#ffffff" color="#ffffff" className="play-triangle-offset" />
          )}
        </button>
      )}

      {!hasStarted && (
        <div className="video-center-tap-label">
          <span>▶ Tap to Play Celebration</span>
        </div>
      )}
    </div>
  );
}

// Dashboard: Rotated multi-page transition (Next slides left) with WhatsApp Video & YouTube
function Dashboard({ user, onLogout }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState('next');
  const [touchStartX, setTouchStartX] = useState(null);
  const youtubeId = import.meta.env.VITE_YOUTUBE_VIDEO_ID;

  const total = festivalSlides.length;
  const slide = festivalSlides[currentSlide];

  const changeSlide = (newIndex, dir) => {
    if (newIndex < 0 || newIndex >= total) return;
    setDirection(dir);
    setCurrentSlide(newIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goNext = () => {
    if (currentSlide < total - 1) {
      changeSlide(currentSlide + 1, 'next');
    } else {
      // Replay from start
      changeSlide(0, 'prev');
    }
  };

  const goPrev = () => {
    if (currentSlide > 0) {
      changeSlide(currentSlide - 1, 'prev');
    }
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      // Swiped left -> Go Next
      goNext();
    } else if (diff < -45) {
      // Swiped right -> Go Prev
      goPrev();
    }
    setTouchStartX(null);
  };

  return (
    <main className="dashboard screen-fit-dashboard">
      <FestiveCanvas />

      {/* Header with Centered Brand & Logout */}
      <header className="dash-header">
        <div className="dash-brand">
          <span className="brand-diya">🪔</span>
          <span className="brand-title shimmer-text">Festival Wishes</span>
          <span className="brand-diya brand-diya-right">🪔</span>
        </div>
        <div className="dash-header-actions">
          <button className="logout-btn" onClick={onLogout} title="Logout">
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="dash-garland">
        <FestiveToran />
      </div>

      {/* Rotated Card Viewport */}
      <section
        className="festival-carousel-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          key={currentSlide}
          className={`festival-slide-card slide-anim-${direction}`}
        >
          {/* Type 1: Festival Wishes Slide (Dhanteras, Diwali, Chhath Puja) - NO badge tag overlay */}
          {!slide.type && (
            <div className="slide-festival-content">
              <div className="slide-photo-wrap">
                <img src={slide.image} alt={slide.title} className="slide-hero-img" />
              </div>

              <div className="slide-body">
                <div className="slide-icon-large">{slide.icon}</div>
                <h2 className="slide-title shimmer-text">{slide.title}</h2>
                <div className="slide-ornament">✧ ───── ❈ ───── ✧</div>
                <p className="slide-main-text">{slide.text}</p>
                {slide.subtext && <p className="slide-subtext">{slide.subtext}</p>}
                <div className="slide-diyas-wrap">
                  <Diyas />
                </div>
              </div>
            </div>
          )}

          {/* Type 2: WhatsApp Local Video Slide (after Chhath Puja) */}
          {slide.type === 'video' && (
            <div className="slide-video-content">
              <div className="slide-video-header">
                <div className="slide-tag-badge-inline">
                  <Sparkles size={12} /> {slide.tag}
                </div>
                <h2 className="slide-title shimmer-text">{slide.title}</h2>
                <p className="slide-video-desc">{slide.text}</p>
              </div>

              <FestivalVideoPlayer src={slide.videoSrc} poster={slide.poster} />

              <div className="slide-video-note">
                <span>🪔</span> Special Moments of Celebration <span>🪔</span>
              </div>
            </div>
          )}

          {/* Type 3: YouTube Video Slide */}
          {slide.type === 'youtube' && (
            <div className="slide-video-content">
              <div className="slide-video-header">
                <div className="slide-tag-badge-inline">
                  <Sparkles size={12} /> {slide.tag}
                </div>
                <h2 className="slide-title shimmer-text">{slide.title}</h2>
                <p className="slide-video-desc">{slide.text}</p>
              </div>

              <div className="youtube-video-shell">
                {youtubeId && youtubeId !== 'YOUR_VIDEO_ID' ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
                    title="Festival Celebration Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="video-placeholder">
                    <div className="video-thumb">
                      <div className="video-fire">✺ ✦ ✺</div>
                      <h2 className="shimmer-text">
                        Happy <em>Diwali</em>
                      </h2>
                      <h3>Celebration</h3>
                      <button
                        className="play-pulse-btn"
                        onClick={() =>
                          window.open(
                            'https://www.youtube.com/results?search_query=Happy+Diwali+celebration',
                            '_blank'
                          )
                        }
                        title="Play Celebration Video"
                      >
                        <Play fill="currentColor" size={24} />
                      </button>
                    </div>
                    <div className="video-controls">
                      <span>▶　◖))　0:00 / 4:02</span>
                      <span>⚙　YouTube　⛶</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="slide-diyas-wrap">
                <Diyas />
              </div>
            </div>
          )}

          {/* Bottom Interactive Navigation on every slide */}
          <div className={`slide-bottom-nav ${currentSlide === 0 ? 'slide-nav-dhanteras' : ''}`}>
            {currentSlide > 0 && (
              <button className="nav-btn nav-btn-prev" onClick={goPrev}>
                <ChevronLeft size={18} />
                <span>Previous</span>
              </button>
            )}

            {currentSlide < total - 1 ? (
              <button
                className={`nav-btn nav-btn-next ${currentSlide === 0 ? 'nav-btn-centered' : ''}`}
                onClick={goNext}
              >
                <span>{slide.nextLabel || 'Next'}</span>
                <ChevronRight size={18} />
              </button>
            ) : (
              <button className="nav-btn nav-btn-next nav-btn-replay" onClick={goNext}>
                <RotateCcw size={16} />
                <span>Replay from Start</span>
              </button>
            )}
          </div>
        </div>
      </section>

      <footer className="dash-footer-compact">
        <span>✨ Wishing you &amp; your family a Happy &amp; Prosperous Diwali ✨</span>
      </footer>
    </main>
  );
}

export default function App() {
  const [intro, setIntro] = useState(true);
  const [user, setUser] = useState(null);

  if (intro) return <Intro done={() => setIntro(false)} />;
  return user ? (
    <Dashboard user={user} onLogout={() => setUser(null)} />
  ) : (
    <Login onLogin={setUser} />
  );
}
