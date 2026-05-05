'use client';
import { useEffect, useState, useRef } from "react";

export default function GamingCommunitySite() {
  const [members, setMembers] = useState<number | string>("...");
  const [online, setOnline] = useState<number | string>("...");
  const [showStaff, setShowStaff] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const playClick = () => {
    const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");
    audio.volume = 0.1;
    audio.play().catch(() => {}); 
  };

  useEffect(() => {
    fetch("https://discord.com/api/guilds/1487208919695753286/widget.json")
      .then(res => res.json())
      .then(data => {
        setMembers(data.members?.length || "0");
        setOnline(data.presence_count || "0");
      })
      .catch(() => {
        setMembers("ERR");
        setOnline("ERR");
      });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles: { x: number; y: number; size: number; speed: number; opacity: number; char: string }[] = [];
    const characters = 'SGD∆∑∇Ω'.split(''); 

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 10,
        speed: Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.4,
        char: characters[Math.floor(Math.random() * characters.length)]
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ff0000";
      particles.forEach(p => {
        ctx.globalAlpha = p.opacity;
        ctx.font = `bold ${p.size}px sans-serif`;
        ctx.fillText(p.char, p.x, p.y);
        p.y -= p.speed;
        if (p.y < 0) p.y = canvas.height;
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ color: '#ff0000', fontSize: '1.4rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '30px', borderLeft: '5px solid #ff0000', paddingLeft: '15px' }}>
      {children}
    </h2>
  );

  return (
    <main style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', overflowX: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }} />

      <nav style={{ padding: '20px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(15px)', borderBottom: '1px solid #300', zIndex: 100 }}>
        <div style={{ fontWeight: '900', fontSize: '1.6rem', color: '#ff0000', letterSpacing: '3px' }}>SPARSE</div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => { playClick(); setShowStaff(!showStaff); }} style={{ background: 'none', color: '#fff', border: '1px solid #ff0000', padding: '10px 15px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>
            {showStaff ? 'COMMAND CENTER' : '🎖️ MEET THE TEAM'}
          </button>
          <button onClick={() => { playClick(); window.open("https://discord.gg/DS6uGNvpNE"); }} style={{ background: '#ff0000', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}>
            JOIN NOW
          </button>
        </div>
      </nav>

      {!showStaff ? (
        <div style={{ position: 'relative', zIndex: 1, padding: '0 5%' }}>
          
          <section style={{ textAlign: 'center', padding: '100px 0 50px' }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 12vw, 5rem)', fontWeight: '900', margin: 0, lineHeight: 0.9, textTransform: 'uppercase' }}>
              SPARSE <span style={{ color: '#ff0000' }}>GAMING</span><br/>DIVISION
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#888', marginTop: '20px', letterSpacing: '5px', fontWeight: 'bold' }}>PRECISION. POWER. PERFORMANCE.</p>
          </section>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginBottom: '80px' }}>
            <div style={{ textAlign: 'center' }}><span style={{ color: '#ff0000', display: 'block', fontSize: '0.8rem', fontWeight: 'bold' }}>MEMBERS</span><span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{members}</span></div>
            <div style={{ textAlign: 'center' }}><span style={{ color: '#00ff00', display: 'block', fontSize: '0.8rem', fontWeight: 'bold' }}>ONLINE</span><span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{online}</span></div>
          </div>

          <section style={{ marginBottom: '100px' }}>
            <SectionTitle>Tactical Operations</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
              {[
                { name: 'Deadside', img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=600', icon: '🪖', desc: 'Hardcore PvP/PvE Survival. Full loot.' },
                { name: 'Battlefield 6', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600', icon: '💥', desc: 'Modern warfare. High-scale destruction.' },
                { name: 'Ready or Not', img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=600', icon: '🛡️', desc: 'Tactical SWAT shooter. Realism.' },
                { name: 'Minecraft (Bedrock)', img: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=600', icon: '🧱', desc: 'Community survival realm. Build and survive.', status: 'ACTIVE WORLD' }
              ].map((game) => (
                <div key={game.name} style={{ position: 'relative', height: '220px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #222' }}>
                  <img src={game.img} alt={game.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '20px', background: 'linear-gradient(transparent, #000)' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{game.icon} {game.name}</div>
                    <div style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '5px' }}>{game.desc}</div>
                    {game.status && <div style={{ color: '#00ff00', fontSize: '0.7rem', fontWeight: 'bold', marginTop: '3px' }}>{game.status}</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', marginBottom: '100px' }}>
            <section>
              <SectionTitle>What you get</SectionTitle>
              <div style={{ background: '#080808', padding: '30px', border: '1px solid #111', borderRadius: '4px', height: '100%' }}>
                <ul style={{ listStyle: 'none', padding: 0, color: '#aaa', margin: 0, lineHeight: '2.5' }}>
                  <li>👥 Regular game sessions & squad play</li>
                  <li>🤝 Friendly, non-toxic community</li>
                  <li>📦 Active Minecraft realm with progress</li>
                  <li>➕ Request new games anytime</li>
                </ul>
              </div>
