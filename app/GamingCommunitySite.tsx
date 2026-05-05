'use client';
import { useEffect, useState, useRef } from "react";

export default function GamingCommunitySite() {
  const [members, setMembers] = useState<number | string>("...");
  const [online, setOnline] = useState<number | string>("...");
  const [showStaff, setShowStaff] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    let p = Array.from({length: 40}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      s: Math.random() * 10 + 10,
      o: Math.random() * 0.4,
      c: ['S','G','D','∆'][Math.floor(Math.random() * 4)]
    }));
    let anim = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ff0000";
      p.forEach(i => {
        ctx.globalAlpha = i.o;
        ctx.font = `bold ${i.s}px sans-serif`;
        ctx.fillText(i.c, i.x, i.y);
        i.y -= 0.3;
        if (i.y < 0) i.y = canvas.height;
      });
      requestAnimationFrame(anim);
    };
    anim();
  }, []);

  const Title = ({ text }: { text: string }) => (
    <h2 style={{ color: '#ff0000', fontSize: '1.2rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '25px', borderLeft: '4px solid #ff0000', paddingLeft: '12px' }}>
      {text}
    </h2>
  );

  return (
    <main style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', overflowX: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }} />

      <nav style={{ padding: '20px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #300', zIndex: 100 }}>
        <div style={{ fontWeight: '900', fontSize: '1.5rem', color: '#ff0000', letterSpacing: '2px' }}>SPARSE</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setShowStaff(!showStaff)} style={{ background: 'none', color: '#fff', border: '1px solid #ff0000', padding: '8px 12px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' }}>
            {showStaff ? 'HQ' : 'TEAM'}
          </button>
          <button onClick={() => window.open("https://discord.gg/DS6uGNvpNE")} style={{ background: '#ff0000', color: '#fff', border: 'none', padding: '8px 15px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.7rem' }}>
            JOIN
          </button>
        </div>
      </nav>

      {!showStaff ? (
        <div style={{ position: 'relative', zIndex: 1, padding: '0 5%' }}>
          <section style={{ textAlign: 'center', padding: '80px 0 40px' }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)', fontWeight: '900', margin: 0 }}>SPARSE <span style={{ color: '#ff0000' }}>GAMING</span></h1>
            <p style={{ fontSize: '1rem', color: '#888', marginTop: '10px', letterSpacing: '4px', fontWeight: 'bold' }}>PRECISION. POWER. PERFORMANCE.</p>
          </section>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '60px' }}>
            <div style={{ textAlign: 'center' }}><span style={{ color: '#ff0000', display: 'block', fontSize: '0.7rem' }}>MEMBERS</span><span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{members}</span></div>
            <div style={{ textAlign: 'center' }}><span style={{ color: '#00ff00', display: 'block', fontSize: '0.7rem' }}>ONLINE</span><span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{online}</span></div>
          </div>

          <Title text="Operations" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '60px' }}>
            {[
              { n: 'Deadside', i: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400' },
              { n: 'Battlefield 6', i: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400' },
              { n: 'Ready or Not', i: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400' },
              { n: 'Minecraft', i: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400', s: 'ACTIVE REALM' }
            ].map(g => (
              <div key={g.n} style={{ position: 'relative', height: '180px', border: '1px solid #222' }}>
