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
    let p = Array.from({length: 30}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      s: Math.random() * 10 + 10,
      o: Math.random() * 0.3,
      c: ['S','G','D'][Math.floor(Math.random() * 3)]
    }));
    let anim = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ff0000";
      p.forEach(i => {
        ctx.globalAlpha = i.o;
        ctx.font = "bold 15px sans-serif";
        ctx.fillText(i.c, i.x, i.y);
        i.y -= 0.5;
        if (i.y < 0) i.y = canvas.height;
      });
      requestAnimationFrame(anim);
    };
    anim();
  }, []);

  return (
    <main style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', overflowX: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }} />

      <nav style={{ padding: '20px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'rgba(0,0,0,0.9)', borderBottom: '1px solid #300', zIndex: 100 }}>
        <div style={{ fontWeight: '900', fontSize: '1.5rem', color: '#ff0000' }}>SPARSE</div>
        <div>
          <button onClick={() => setShowStaff(!showStaff)} style={{ background: 'none', color: '#fff', border: '1px solid #ff0000', padding: '8px 12px', marginRight: '10px' }}>{showStaff ? 'HQ' : 'TEAM'}</button>
          <button onClick={() => window.open("https://discord.gg/DS6uGNvpNE")} style={{ background: '#ff0000', color: '#fff', border: 'none', padding: '8px 15px' }}>JOIN</button>
        </div>
      </nav>

      {!showStaff ? (
        <div style={{ position: 'relative', zIndex: 1, padding: '20px 5%' }}>
          <section style={{ textAlign: 'center', padding: '60px 0' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: 0 }}>SPARSE <span style={{ color: '#ff0000' }}>GAMING</span></h1>
            <p style={{ color: '#888', letterSpacing: '2px' }}>PRECISION. POWER. PERFORMANCE.</p>
          </section>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '40px' }}>
            <div style={{ textAlign: 'center' }}><span style={{ color: '#ff0000', fontSize: '0.7rem' }}>MEMBERS</span><div style={{ fontSize: '1.5rem' }}>{members}</div></div>
            <div style={{ textAlign: 'center' }}><span style={{ color: '#00ff00', fontSize: '0.7rem' }}>ONLINE</span><div style={{ fontSize: '1.5rem' }}>{online}</div></div>
          </div>

          <h2 style={{ color: '#ff0000', borderLeft: '4px solid #ff0000', paddingLeft: '10px' }}>OPERATIONS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginBottom: '40px' }}>
            <div style={{ height: '150px', border: '1px solid #222', position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} alt="Deadside" />
              <div style={{ position: 'absolute', bottom: 10, left: 10 }}>Deadside</div>
            </div>
            <div style={{ height: '150px', border: '1px solid #222', position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} alt="Battlefield" />
              <div style={{ position: 'absolute', bottom: 10, left: 10 }}>Battlefield 6</div>
            </div>
            <div style={{ height: '150px', border: '1px solid #222', position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} alt="Minecraft" />
              <div style={{ position: 'absolute', bottom: 10, left: 10 }}>Minecraft Realm</div>
            </div>
          </div>

          <h2 style={{ color: '#ff0000', borderLeft: '4px solid #ff0000', paddingLeft: '10px' }}>MINECRAFT CODE</h2>
          <div style={{ background: 'rgba(255,0,0,0.1)', padding: '20px', border: '1px solid #ff0000', textAlign: 'center', marginBottom: '40px' }}>
            <p>Discord Required. Invite Code:</p>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ff0000' }}>VN9YgHYHLBCKCus</div>
          </div>

          <h2 style={{ color: '#ff0000', borderLeft: '4px solid #ff0000', paddingLeft: '10px' }}>INTEL FEED</h2>
          <iframe src="https://discord.com/widget?id=1487208919695753286&theme=dark" width="100%" height="400" style={{ border: '1px solid #222' }}></iframe>
        </div>
      ) : (
        <div style={{ padding: '20px 5%' }}>
          <h2 style={{ color: '#ff0000', borderLeft: '4px solid #ff0000', paddingLeft: '10px' }}>COMMAND</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div style={{ background: '#111', padding: '15px' }}>OWNER: MostPalone3796</div>
            <div style={{ background: '#111', padding: '15px' }}>SUPPORT: Barktheunlucky</div>
            <div style={{ background: '#111', padding: '15px' }}>SUPPORT: H1ltxn02</div>
            <div style={{ background: '#111', padding: '15px' }}>REALM: Tipanwolf15</div>
            <div style={{ background: '#111', padding: '15px' }}>BF6 CM: coldvalor26</div>
          </div>
        </div>
      )}
    </main>
  );
}
