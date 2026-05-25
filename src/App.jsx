import { useEffect, useMemo, useRef, useState } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("story");
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    fullName: "",
    phone: "",
    service: "Portfolio Website",
    description: "",
  });
  const [orders, setOrders] = useState([]);

  const cursorRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const animationFrame = useRef(null);

  const particles = useMemo(() => Array.from({ length: 150 }), []);
  const comets = useMemo(() => Array.from({ length: 12 }), []);
  const mist = useMemo(() => Array.from({ length: 10 }), []);

  useEffect(() => {
    const savedOrders = localStorage.getItem("mh-orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mh-orders", JSON.stringify(orders));
  }, [orders]);

  function handleMouseMove(e) {
    targetMouse.current = { x: e.clientX, y: e.clientY };

    if (animationFrame.current) return;

    const animateCursor = () => {
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.12;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentMouse.current.x - 10}px, ${currentMouse.current.y - 10}px, 0)`;
      }

      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate3d(${currentMouse.current.x - 48}px, ${currentMouse.current.y - 48}px, 0)`;
      }

      const dx = Math.abs(targetMouse.current.x - currentMouse.current.x);
      const dy = Math.abs(targetMouse.current.y - currentMouse.current.y);

      if (dx > 0.5 || dy > 0.5) {
        animationFrame.current = requestAnimationFrame(animateCursor);
      } else {
        animationFrame.current = null;
      }
    };

    animationFrame.current = requestAnimationFrame(animateCursor);
  }

  function handleOrderChange(e) {
    const { name, value } = e.target;
    setOrderForm((prev) => ({ ...prev, [name]: value }));
  }

  function placeOrder(e) {
    e.preventDefault();

    const newOrder = {
      id: `MH-${Date.now().toString().slice(-6)}`,
      fullName: orderForm.fullName,
      phone: orderForm.phone,
      service: orderForm.service,
      description: orderForm.description,
      status: "Order Received",
      createdAt: new Date().toLocaleString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setOrderForm({
      fullName: "",
      phone: "",
      service: "Portfolio Website",
      description: "",
    });
  }

  const orderSteps = ["Order Received", "Working", "Sent", "Delivered"];

  const orderTypes = [
    "Portfolio Website",
    "Landing Page",
    "Animated Greeting Page",
    "Business Website",
    "Custom Website",
  ];

  const skills = [
    "React",
    "Tailwind CSS",
    "JavaScript",
    "Responsive Design",
    "UI Animation",
    "Landing Pages",
    "Portfolio Websites",
    "Modern Frontend",
  ];

  const stats = [
    { number: "React", label: "Frontend Framework" },
    { number: "4K", label: "Visual Direction" },
    { number: "UI", label: "Design Focus" },
  ];

  const services = [
    {
      icon: "✦",
      title: "Modern Website Design",
      text: "I create clean, premium websites with strong spacing, beautiful sections, smooth colors, and professional layouts.",
    },
    {
      icon: "◈",
      title: "Animated User Interface",
      text: "I add motion that makes the website feel alive: glowing backgrounds, floating particles, hover effects, and smooth transitions.",
    },
    {
      icon: "◇",
      title: "Personal Branding Pages",
      text: "I build pages that introduce a person, skill, idea, or project with a strong identity and memorable design.",
    },
  ];

  const projects = [
    {
      title: "Premium Personal Portfolio",
      text: "A professional personal website with hero, about, skills, services, projects, and contact sections.",
    },
    {
      title: "Animated Landing Page",
      text: "A modern landing page concept using glowing visuals, smooth motion, and responsive layouts.",
    },
    {
      title: "Creative Greeting Website",
      text: "A custom animated page made with beautiful typography, effects, and emotional presentation.",
    },
    {
      title: "Anime-Inspired Web UI",
      text: "A cinematic interface concept with night-glow backgrounds, soft particles, and futuristic UI cards.",
    },
  ];

  const tabs = {
    story: {
      label: "Story",
      title: "I create websites that look polished and feel alive.",
      text: "I am Mahmudul Hasan. I enjoy building modern websites with creative visuals, smooth animations, and clean user interface design. My goal is to make every page feel professional, detailed, and memorable.",
    },
    work: {
      label: "Work Style",
      title: "Clean structure, premium visuals, smooth motion.",
      text: "I focus on strong layouts, readable content, responsive design, glowing visual systems, and animations that support the website instead of making it messy.",
    },
    contact: {
      label: "Contact",
      title: "Available for creative web projects.",
      text: "Email: hasanhridoy5191@gmail.com • TikTok: @hasanhridoy5191 • Location: Bangladesh",
    },
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#02000a] text-white font-sans cursor-none"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Cinzel:wght@500;600;700;800;900&display=swap');

        html {
          scroll-behavior: smooth;
          overflow-x: hidden;
          overflow-y: auto;
        }

        body {
          margin: 0;
          background: #02000a;
          overflow-x: hidden;
          overflow-y: auto;
        }

        #root {
          min-height: 100vh;
          overflow-x: hidden;
        }

        * { scroll-behavior: smooth; }
        a, button { cursor: none; }

        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: .25; }
          50% { transform: translateY(-38px) translateX(18px) scale(1.7); opacity: 1; }
        }

        @keyframes cometMove {
          0% { transform: translate3d(-20vw, -12vh, 0) rotate(-24deg); opacity: 0; }
          12% { opacity: 1; }
          100% { transform: translate3d(125vw, 95vh, 0) rotate(-24deg); opacity: 0; }
        }

        @keyframes heroEnter {
          0% { opacity: 0; transform: translateY(80px) scale(.94); filter: blur(16px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: .48; transform: scale(1); }
          50% { opacity: .95; transform: scale(1.1); }
        }

        @keyframes cardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes scanLine {
          0% { transform: translateX(-150%) skewX(-18deg); opacity: 0; }
          40% { opacity: .8; }
          100% { transform: translateX(150%) skewX(-18deg); opacity: 0; }
        }

        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 35px rgba(149, 76, 255, .22), inset 0 0 35px rgba(255,255,255,.035); }
          50% { box-shadow: 0 0 95px rgba(190, 96, 255, .36), inset 0 0 75px rgba(255,255,255,.075); }
        }

        @keyframes mistMove {
          0%, 100% { transform: translateX(-6%) translateY(0) rotate(-4deg); opacity: .18; }
          50% { transform: translateX(7%) translateY(-18px) rotate(4deg); opacity: .55; }
        }

        @keyframes navGlow {
          0%, 100% { box-shadow: 0 0 0 rgba(157, 90, 255, 0); }
          50% { box-shadow: 0 0 45px rgba(157, 90, 255, .22); }
        }

        @keyframes scrollWheel {
          0% { transform: translateY(0); opacity: 0; }
          35% { opacity: 1; }
          100% { transform: translateY(30px); opacity: 0; }
        }

        @keyframes orderBgMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes optionPulse {
          0%, 100% { box-shadow: 0 0 18px rgba(168,85,247,.12), inset 0 0 20px rgba(255,255,255,.025); }
          50% { box-shadow: 0 0 35px rgba(236,72,153,.25), inset 0 0 35px rgba(255,255,255,.06); }
        }

        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .hero-enter { animation: heroEnter 1.05s cubic-bezier(.16,1,.3,1) both; }

        .glow-text {
          background: linear-gradient(90deg, #ffffff, #d8c2ff, #a855f7, #f0abfc, #ffffff, #c4b5fd);
          background-size: 380% 380%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientMove 8s ease infinite;
          text-shadow: 0 0 45px rgba(168, 85, 247, .35);
        }

        .glass-card {
          background: linear-gradient(135deg, rgba(255,255,255,.105), rgba(123,63,228,.07), rgba(255,255,255,.025));
          border: 1px solid rgba(216, 180, 254, .18);
          backdrop-filter: blur(24px);
          animation: borderGlow 6s ease-in-out infinite;
        }

        .premium-border {
          position: relative;
          z-index: 1;
        }

        .premium-border::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: linear-gradient(120deg, rgba(168,85,247,.95), rgba(236,72,153,.8), rgba(255,255,255,.55), rgba(99,102,241,.9), rgba(168,85,247,.95));
          background-size: 330% 330%;
          animation: gradientMove 7s ease infinite;
          z-index: -1;
        }

        .scan-card {
          position: relative;
          overflow: hidden;
        }

        .scan-card::after {
          content: '';
          position: absolute;
          top: -15%;
          left: 0;
          width: 42%;
          height: 130%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.24), transparent);
          animation: scanLine 5s ease-in-out infinite;
        }

        .noise {
          background-image: radial-gradient(rgba(255,255,255,.09) 1px, transparent 1px);
          background-size: 9px 9px;
          opacity: .08;
        }
      `}</style>

      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-5 w-5 rounded-full border border-purple-100/80 bg-white/20 shadow-[0_0_25px_rgba(216,180,254,.95)] backdrop-blur-sm md:block"
      />
      <div
        ref={cursorGlowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-24 w-24 rounded-full bg-purple-400/20 blur-xl md:block"
      />

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(88,28,135,.45),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(126,34,206,.38),transparent_33%),radial-gradient(circle_at_50%_95%,rgba(67,56,202,.32),transparent_45%),linear-gradient(180deg,#050014_0%,#03000c_45%,#090012_100%)]" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(216,180,254,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(216,180,254,.045)_1px,transparent_1px)] bg-[size:82px_82px] opacity-45" />
      <div className="noise fixed inset-0" />
      <div className="fixed inset-0 shadow-[inset_0_0_260px_rgba(0,0,0,.98)]" />

      <div className="fixed left-[-14%] top-[8%] h-[520px] w-[520px] rounded-full bg-purple-600/24 blur-3xl" style={{ animation: "pulseGlow 6s ease-in-out infinite" }} />
      <div className="fixed right-[-12%] top-[15%] h-[560px] w-[560px] rounded-full bg-fuchsia-500/22 blur-3xl" style={{ animation: "pulseGlow 7s ease-in-out infinite reverse" }} />
      <div className="fixed bottom-[-18%] left-[26%] h-[620px] w-[620px] rounded-full bg-indigo-600/24 blur-3xl" style={{ animation: "pulseGlow 8s ease-in-out infinite" }} />

      {mist.map((_, i) => (
        <span
          key={`mist-${i}`}
          className="fixed h-32 w-[680px] rounded-full bg-gradient-to-r from-transparent via-purple-400/20 to-transparent blur-2xl"
          style={{
            left: `${-25 + Math.random() * 120}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${-20 + Math.random() * 40}deg)`,
            animation: `mistMove ${7 + Math.random() * 8}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {particles.map((_, i) => (
        <span
          key={`particle-${i}`}
          className="fixed rounded-full bg-purple-100 shadow-[0_0_18px_rgba(216,180,254,.95)]"
          style={{
            width: `${1 + Math.random() * 4}px`,
            height: `${1 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `floatParticle ${2.5 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {comets.map((_, i) => (
        <span
          key={`comet-${i}`}
          className="fixed h-px w-32 bg-gradient-to-r from-transparent via-purple-100 to-fuchsia-200 shadow-[0_0_22px_rgba(216,180,254,.95)]"
          style={{
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 60}%`,
            animation: `cometMove ${7 + Math.random() * 7}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}

      <header className="fixed left-0 right-0 top-0 z-50 px-5 py-5">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-purple-200/15 bg-[#050014]/55 px-5 py-3 backdrop-blur-2xl" style={{ animation: "navGlow 5s ease-in-out infinite" }}>
          <a href="#home" className="font-cinzel text-lg font-black tracking-[4px] glow-text">MH</a>

          <div className="hidden items-center gap-7 text-sm text-purple-100/70 md:flex">
            <a className="hover:text-white transition" href="#about">About</a>
            <a className="hover:text-white transition" href="#services">Services</a>
            <a className="hover:text-white transition" href="#orders">Order</a>
            <a className="hover:text-white transition" href="#work">Work</a>
            <a className="hover:text-white transition" href="#contact">Contact</a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden rounded-full border border-purple-200/15 px-4 py-2 text-sm">
            Menu
          </button>
        </nav>

        {menuOpen && (
          <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-purple-200/15 bg-[#050014]/75 p-5 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-4 text-purple-100/75">
              <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
              <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
              <a href="#orders" onClick={() => setMenuOpen(false)}>Order</a>
              <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </header>

      <section id="home" className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 pb-20 pt-32">
        <div className="w-full max-w-5xl">
          <div className="hero-enter">
            <p className="font-cinzel text-sm tracking-[10px] text-purple-100/80">
              CREATED BY MAHMUDUL HASAN
            </p>

            <h1 className="mt-6 font-cinzel text-6xl font-black leading-[.9] md:text-8xl lg:text-9xl glow-text">
              Mahmudul
              <span className="block">Hasan</span>
            </h1>

            <p className="mt-7 max-w-2xl text-xl font-semibold text-purple-100/90 md:text-2xl">
              Frontend developer creating premium websites with clean UI, strong details, and smooth animation.
            </p>

            <p className="mt-6 max-w-2xl text-base leading-8 text-purple-50/62 md:text-lg">
              I created this website to present my work, skills, and creative direction in a real portfolio format. It uses dark luxury visuals, purple glow, glassmorphism, responsive sections, and professional web structure.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#about" className="rounded-full bg-purple-50 px-7 py-4 text-sm font-black tracking-[3px] text-[#130020] shadow-[0_0_45px_rgba(216,180,254,.42)] transition hover:scale-105">EXPLORE</a>
              <a href="#contact" className="rounded-full border border-purple-200/20 bg-purple-100/8 px-7 py-4 text-sm font-black tracking-[3px] text-white backdrop-blur-xl transition hover:scale-105 hover:bg-purple-100/15">CONTACT</a>
            </div>
          </div>
        </div>

        <a href="#about" className="absolute bottom-9 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-purple-100/60 md:flex">
          <span className="text-xs font-bold tracking-[5px]">SCROLL</span>
          <span className="relative h-14 w-8 rounded-full border border-purple-100/25">
            <span className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-purple-100" style={{ animation: "scrollWheel 1.8s ease-in-out infinite" }} />
          </span>
        </a>
      </section>

      <section className="relative z-20 mx-auto max-w-7xl px-5 pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {stats.map((item, i) => (
            <div key={item.label} className="glass-card rounded-[34px] p-8 text-center" style={{ animation: `cardFloat ${5 + i}s ease-in-out infinite` }}>
              <h3 className="text-4xl font-black glow-text md:text-5xl">{item.number}</h3>
              <p className="mt-3 text-purple-50/60 tracking-[3px]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="relative z-20 mx-auto max-w-7xl px-5 py-24">
        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="font-cinzel text-sm tracking-[10px] text-fuchsia-100/80">ABOUT ME</p>
            <h2 className="mt-5 font-cinzel text-5xl font-black md:text-7xl glow-text">A real portfolio with personality.</h2>
          </div>

          <div className="glass-card rounded-[38px] p-7 md:p-10">
            <div className="mb-7 flex flex-wrap gap-3">
              {Object.entries(tabs).map(([key, tab]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`rounded-full px-5 py-3 text-sm font-bold tracking-[2px] transition ${activeTab === key ? "bg-purple-50 text-[#130020]" : "border border-purple-100/15 bg-purple-100/8 text-purple-50/70 hover:text-white"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <h3 className="text-3xl font-black md:text-5xl">{tabs[activeTab].title}</h3>
            <p className="mt-5 text-lg leading-9 text-purple-50/65">{tabs[activeTab].text}</p>
          </div>
        </div>
      </section>

      <section id="services" className="relative z-20 mx-auto max-w-7xl px-5 py-24">
        <div className="text-center">
          <p className="font-cinzel text-sm tracking-[10px] text-purple-100/80">WHAT I DO</p>
          <h2 className="mt-5 font-cinzel text-5xl font-black md:text-7xl glow-text">Services & Features</h2>
        </div>

        <div className="mt-14 grid gap-7 lg:grid-cols-3">
          {services.map((service, i) => (
            <div key={service.title} className="glass-card scan-card rounded-[36px] p-8 transition duration-500 hover:-translate-y-4" style={{ animation: `cardFloat ${6 + i * 0.5}s ease-in-out infinite` }}>
              <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-100/15 bg-purple-100/10 text-4xl text-purple-100 shadow-[0_0_35px_rgba(168,85,247,.3)]">
                {service.icon}
              </div>
              <h3 className="text-2xl font-black">{service.title}</h3>
              <p className="mt-4 leading-8 text-purple-50/60">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-20 mx-auto max-w-7xl px-5 py-24">
        <div className="glass-card rounded-[42px] p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] items-center">
            <div>
              <p className="font-cinzel text-sm tracking-[10px] text-fuchsia-100/80">SKILLS</p>
              <h2 className="mt-5 font-cinzel text-5xl font-black glow-text">Tools & Style</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill) => (
                <span key={skill} className="rounded-full border border-purple-100/15 bg-purple-100/8 px-5 py-3 text-purple-50/75 backdrop-blur-xl transition hover:scale-105 hover:bg-purple-100/15">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="orders" className="relative z-20 mx-auto max-w-7xl px-5 py-24">
        <div className="text-center">
          <p className="font-cinzel text-sm tracking-[10px] text-fuchsia-100/80">ORDER</p>
          <h2 className="mt-5 font-cinzel text-5xl font-black md:text-7xl glow-text">Place a Website Order</h2>
          <p className="mx-auto mt-6 max-w-2xl text-purple-50/62 leading-8">
            Fill the form with your full name, phone number with country code, website type, and description. After placing an order, you can see the order status below.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <form onSubmit={placeOrder} className="glass-card rounded-[42px] p-7 md:p-10">
            <div className="grid gap-5">
              <div>
                <label className="text-sm font-bold uppercase tracking-[3px] text-purple-200/70">Full Name</label>
                <input
                  required
                  name="fullName"
                  value={orderForm.fullName}
                  onChange={handleOrderChange}
                  placeholder="Enter your full name"
                  className="mt-3 w-full rounded-2xl border border-purple-100/15 bg-black/30 px-5 py-4 text-white outline-none transition placeholder:text-purple-100/35 focus:border-purple-200/50"
                />
              </div>

              <div>
                <label className="text-sm font-bold uppercase tracking-[3px] text-purple-200/70">Phone Number With Country Code</label>
                <input
                  required
                  name="phone"
                  value={orderForm.phone}
                  onChange={handleOrderChange}
                  placeholder="Example: +8801XXXXXXXXX"
                  className="mt-3 w-full rounded-2xl border border-purple-100/15 bg-black/30 px-5 py-4 text-white outline-none transition placeholder:text-purple-100/35 focus:border-purple-200/50"
                />
              </div>

              <div>
                <label className="text-sm font-bold uppercase tracking-[3px] text-purple-200/70">Order Type</label>

                <div className="mt-3 rounded-[28px] border border-purple-100/15 bg-gradient-to-r from-purple-950/70 via-fuchsia-950/40 to-indigo-950/70 bg-[length:300%_300%] p-3 shadow-[0_0_35px_rgba(168,85,247,.18)]" style={{ animation: "orderBgMove 7s ease infinite" }}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {orderTypes.map((type) => {
                      const selected = orderForm.service === type;

                      return (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setOrderForm((prev) => ({ ...prev, service: type }))}
                          className={`relative overflow-hidden rounded-2xl border px-4 py-4 text-left font-bold transition duration-300 hover:-translate-y-1 ${selected ? "border-purple-100/50 bg-purple-100/20 text-white" : "border-purple-100/10 bg-black/25 text-purple-50/65 hover:bg-purple-100/12"}`}
                          style={selected ? { animation: "optionPulse 2.6s ease-in-out infinite" } : undefined}
                        >
                          <span className="relative z-10">{type}</span>
                          {selected && (
                            <span className="absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-purple-100 shadow-[0_0_18px_rgba(216,180,254,.95)]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold uppercase tracking-[3px] text-purple-200/70">Description</label>
                <textarea
                  required
                  name="description"
                  value={orderForm.description}
                  onChange={handleOrderChange}
                  rows="5"
                  placeholder="Describe what you want... colors, pages, features, deadline, examples, etc."
                  className="mt-3 w-full resize-none rounded-2xl border border-purple-100/15 bg-black/30 px-5 py-4 text-white outline-none transition placeholder:text-purple-100/35 focus:border-purple-200/50"
                />
              </div>

              <button className="rounded-full bg-purple-50 px-7 py-4 text-sm font-black tracking-[3px] text-[#130020] transition hover:scale-105">
                PLACE ORDER
              </button>
            </div>
          </form>

          <div className="glass-card rounded-[42px] p-7 md:p-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-cinzel text-sm tracking-[8px] text-purple-100/70">STATUS</p>
                <h3 className="mt-3 text-3xl font-black">Order Tracking</h3>
              </div>
              <span className="rounded-full border border-purple-100/15 bg-purple-100/8 px-4 py-2 text-sm text-purple-50/70">
                {orders.length} Orders
              </span>
            </div>

            <div className="mt-8 space-y-5">
              {orders.length === 0 && (
                <div className="rounded-3xl border border-purple-100/12 bg-black/25 p-6 text-purple-50/60">
                  No order placed yet. Submit the form to create your first order.
                </div>
              )}

              {orders.map((order) => (
                <div key={order.id} className="rounded-3xl border border-purple-100/12 bg-black/25 p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[3px] text-purple-200/70">{order.id}</p>
                      <h4 className="mt-2 text-2xl font-black">{order.service}</h4>
                      <p className="mt-2 text-sm text-purple-50/55">{order.fullName} • {order.phone}</p>
                    </div>
                    <span className="rounded-full bg-purple-50 px-4 py-2 text-xs font-black tracking-[2px] text-[#130020]">
                      {order.status}
                    </span>
                  </div>

                  <p className="mt-4 text-purple-50/62 leading-7">{order.description}</p>
                  <p className="mt-3 text-xs text-purple-50/40">Placed: {order.createdAt}</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-4">
                    {orderSteps.map((step) => {
                      const active = orderSteps.indexOf(step) <= orderSteps.indexOf(order.status);
                      return (
                        <div key={step} className={`rounded-2xl border p-3 text-center text-xs font-bold tracking-[1px] ${active ? "border-purple-200/40 bg-purple-100/15 text-white" : "border-purple-100/10 bg-black/20 text-purple-50/35"}`}>
                          {step}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="relative z-20 mx-auto max-w-7xl px-5 py-24">
        <div className="text-center">
          <p className="font-cinzel text-sm tracking-[10px] text-purple-100/80">PROJECTS</p>
          <h2 className="mt-5 font-cinzel text-5xl font-black md:text-7xl glow-text">Selected Work</h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <div key={project.title} className="group relative overflow-hidden rounded-[36px] border border-purple-100/12 bg-purple-100/8 p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-3">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/14 via-transparent to-fuchsia-500/14 opacity-0 transition group-hover:opacity-100" />
              <p className="relative font-cinzel text-sm tracking-[7px] text-purple-50/45">PROJECT 0{i + 1}</p>
              <h3 className="relative mt-4 text-3xl font-black">{project.title}</h3>
              <p className="relative mt-4 text-purple-50/58 leading-8">{project.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="relative z-20 mx-auto max-w-7xl px-5 py-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="premium-border rounded-[46px]">
            <div className="glass-card rounded-[45px] p-8 md:p-12">
              <p className="font-cinzel text-sm tracking-[10px] text-fuchsia-100/80">CONTACT</p>
              <h2 className="mt-5 font-cinzel text-5xl font-black leading-tight md:text-7xl glow-text">
                Let’s create your next website.
              </h2>
              <p className="mt-6 text-purple-50/65 leading-8">
                Want a portfolio, landing page, animated greeting page, or premium personal website? Send me a message and tell me what you want to build.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <a href="mailto:hasanhridoy5191@gmail.com" className="group rounded-3xl border border-purple-100/15 bg-purple-100/8 p-5 text-left transition hover:-translate-y-2 hover:bg-purple-100/14">
                  <p className="text-3xl">✉</p>
                  <h3 className="mt-4 text-xl font-black">Email</h3>
                  <p className="mt-2 break-all text-sm text-purple-50/60">hasanhridoy5191@gmail.com</p>
                </a>

                <a href="https://www.tiktok.com/@hasanhridoy5191" target="_blank" rel="noreferrer" className="group rounded-3xl border border-purple-100/15 bg-purple-100/8 p-5 text-left transition hover:-translate-y-2 hover:bg-purple-100/14">
                  <p className="text-3xl">♪</p>
                  <h3 className="mt-4 text-xl font-black">TikTok</h3>
                  <p className="mt-2 text-sm text-purple-50/60">@hasanhridoy5191</p>
                </a>

                <a href="https://www.facebook.com/hasanhridoy5191" target="_blank" rel="noreferrer" className="group rounded-3xl border border-purple-100/15 bg-purple-100/8 p-5 text-left transition hover:-translate-y-2 hover:bg-purple-100/14">
                  <p className="text-3xl">f</p>
                  <h3 className="mt-4 text-xl font-black">Facebook</h3>
                  <p className="mt-2 text-sm text-purple-50/60">@hasanhridoy5191</p>
                </a>

                <a href="https://www.instagram.com/hasanhridoy5191" target="_blank" rel="noreferrer" className="group rounded-3xl border border-purple-100/15 bg-purple-100/8 p-5 text-left transition hover:-translate-y-2 hover:bg-purple-100/14">
                  <p className="text-3xl">◎</p>
                  <h3 className="mt-4 text-xl font-black">Instagram</h3>
                  <p className="mt-2 text-sm text-purple-50/60">@hasanhridoy5191</p>
                </a>

                <a href="https://wa.me/8800000000000" target="_blank" rel="noreferrer" className="group rounded-3xl border border-purple-100/15 bg-purple-100/8 p-5 text-left transition hover:-translate-y-2 hover:bg-purple-100/14 sm:col-span-2">
                  <p className="text-3xl">☏</p>
                  <h3 className="mt-4 text-xl font-black">WhatsApp</h3>
                  <p className="mt-2 text-sm text-purple-50/60">Replace 8800000000000 with your number</p>
                </a>
              </div>
            </div>
          </div>

          <div className="glass-card scan-card rounded-[46px] p-8 md:p-12">
            <p className="font-cinzel text-sm tracking-[8px] text-purple-100/70">PROJECT REQUEST</p>
            <div className="mt-7 space-y-4">
              <div className="rounded-3xl border border-purple-100/12 bg-black/25 p-5">
                <p className="text-sm font-bold uppercase tracking-[3px] text-purple-200/70">Website Type</p>
                <p className="mt-2 text-lg font-bold">Portfolio / Landing Page / Custom Animation</p>
              </div>
              <div className="rounded-3xl border border-purple-100/12 bg-black/25 p-5">
                <p className="text-sm font-bold uppercase tracking-[3px] text-purple-200/70">Style</p>
                <p className="mt-2 text-lg font-bold">Premium • Dark • Glowing • Responsive</p>
              </div>
              <div className="rounded-3xl border border-purple-100/12 bg-black/25 p-5">
                <p className="text-sm font-bold uppercase tracking-[3px] text-purple-200/70">Built With</p>
                <p className="mt-2 text-lg font-bold">React + Tailwind CSS + Custom Animations</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="mailto:hasanhridoy5191@gmail.com" className="rounded-full bg-purple-50 px-7 py-4 text-sm font-black tracking-[3px] text-[#130020] transition hover:scale-105">EMAIL</a>
              <a href="https://www.facebook.com/hasanhridoy5191" target="_blank" rel="noreferrer" className="rounded-full border border-purple-100/20 bg-purple-100/8 px-7 py-4 text-sm font-black tracking-[3px] text-white transition hover:scale-105 hover:bg-purple-100/15">FACEBOOK</a>
              <a href="https://www.instagram.com/hasanhridoy5191" target="_blank" rel="noreferrer" className="rounded-full border border-purple-100/20 bg-purple-100/8 px-7 py-4 text-sm font-black tracking-[3px] text-white transition hover:scale-105 hover:bg-purple-100/15">INSTAGRAM</a>
              <a href="https://wa.me/8800000000000" target="_blank" rel="noreferrer" className="rounded-full border border-purple-100/20 bg-purple-100/8 px-7 py-4 text-sm font-black tracking-[3px] text-white transition hover:scale-105 hover:bg-purple-100/15">WHATSAPP</a>
              <a href="#home" className="rounded-full border border-purple-100/20 bg-purple-100/8 px-7 py-4 text-sm font-black tracking-[3px] text-white transition hover:scale-105 hover:bg-purple-100/15">BACK TO TOP</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
