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
    let particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5
      });
    }
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
      particles.forEach(p => {
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.rect(p.x, p.y, p.size, p.size); 
        ctx.fill();
        p.y -= p.speed;
        if (p.y < 0) p.y = canvas.height;
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ color: '#ff0000', fontSize: '1.5rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '30px', borderLeft: '4px solid #ff0000', paddingLeft: '15px' }}>
      {children}
    </h2>
  );

  return (
    <main style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', overflowX: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }} />

      <nav style={{ padding: '20px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #200', zIndex: 100 }}>
        <div style={{ fontWeight: '900', fontSize: '1.5rem', color: '#ff0000', letterSpacing: '2px' }}>SPARSE</div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => { playClick(); setShowStaff(!showStaff); }} style={{ background: 'none', color: '#fff', border: '1px solid #ff0000', padding: '8px 12px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>
            {showStaff ? 'BACK TO HQ' : '🎖️ MEET THE TEAM'}
          </button>
          <button onClick={() => { playClick(); window.open("https://discord.gg/DS6uGNvpNE"); }} style={{ background: '#ff0000', color: '#fff', border: 'none', padding: '8px 18px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem' }}>
            JOIN NOW
          </button>
        </div>
      </nav>

      {!showStaff ? (
        <div style={{ position: 'relative', zIndex: 1, padding: '0 5%' }}>
          
          <section style={{ textAlign: 'center', padding: '80px 0 40px' }}>
            <h1 style={{ fontSize: 'clamp(2rem, 10vw, 4.5rem)', fontWeight: '900', margin: 0, lineHeight: 1, textShadow: '0 0 20px rgba(255,0,0,0.5)' }}>
              SPARSE <span style={{ color: '#ff0000' }}>GAMING</span><br/>DIVISION
            </h1>
            <p style={{ fontSize: '1rem', color: '#888', marginTop: '15px', letterSpacing: '3px', fontWeight: 'bold' }}>JUMP IN. PICK YOUR ROLE. START PLAYING.</p>
          </section>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '60px' }}>
            <div style={{ textAlign: 'center' }}><span style={{ color: '#ff0000', display: 'block', fontSize: '0.7rem', fontWeight: 'bold' }}>MEMBERS</span><span style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{members}</span></div>
            <div style={{ textAlign: 'center' }}><span style={{ color: '#00ff00', display: 'block', fontSize: '0.7rem', fontWeight: 'bold' }}>ONLINE</span><span style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{online}</span></div>
          </div>

          <section style={{ marginBottom: '80px' }}>
            <SectionTitle>What we're playing</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {[
                { name: 'Deadside', img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=400', icon: '🪖' },
                { name: 'Battlefield 6', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400', icon: '💥' },
                { name: 'Ready or Not', img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=400', icon: '🛡️' },
                { name: 'Minecraft (Bedrock)', img: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=400', icon: '🧱', status: 'ACTIVE WORLD' }
              ].map((game) => (
                <div key={game.name} style={{ position: 'relative', height: '180px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #222' }}>
                  <img src={game.img} alt={game.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '15px', background: 'linear-gradient(transparent, #000)' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{game.icon} {game.name}</div>
                    {game.status && <div style={{ color: '#00ff00', fontSize: '0.65rem', fontWeight: 'bold' }}>{game.status}</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '80px' }}>
            <section>
              <SectionTitle>What you get</SectionTitle>
              <div style={{ background: '#080808', padding: '25px', border: '1px solid #111', borderRadius: '4px', height: '100%' }}>
                <ul style={{ listStyle: 'none', padding: 0, color: '#aaa', margin: 0, lineHeight: '2' }}>
                  <li>👥 Regular game sessions & squad play</li>
                  <li>🤝 Friendly, non-toxic community</li>
                  <li>📦 Active Minecraft realm with progress</li>
                  <li>➕ Request new games anytime</li>
                </ul>
              </div>
            </section>

            <section>
              <SectionTitle>How to Join Realm</SectionTitle>
              <div style={{ background: 'rgba(255,0,0,0.05)', padding: '25px', border: '1px solid #ff0000', borderRadius: '4px' }}>
                <p style={{ margin: '0 0 10px', fontSize: '0.85rem' }}>1. <span style={{color: '#ff0000', fontWeight: 'bold'}}>Discord is required</span> to remain in the Realm.</p>
                <p style={{ margin: '0 0 10px', fontSize: '0.85rem' }}>2. Open Minecraft & select <strong>Join Realm</strong>.</p>
                <p style={{ margin: '0 0 15px', fontSize: '0.85rem' }}>3. Enter Invite Code:</p>
                <div style={{ background: '#000', padding: '10px', textAlign: 'center', border: '1px dashed #ff0000', fontWeight: 'bold', color: '#ff0000', letterSpacing: '2px', marginBottom: '15px' }}>
                  VN9YgHYHLBCKCus
                </div>
                <button onClick={() => window.open("https://discord.gg/DS6uGNvpNE")} style={{ width: '100%', background: '#ff0000', color: '#fff', border: 'none', padding: '10px', fontWeight: 'bold', cursor: 'pointer' }}>JOIN DISCORD FIRST</button>
              </div>
            </section>
          </div>

          <section style={{ paddingBottom: '80px' }}>
             <SectionTitle>Live Intel Feed</SectionTitle>
             <iframe src="https://discord.com/widget?id=1487208919695753286&theme=dark" width="100%" height="450" style={{ border: '1px solid #222', borderRadius: '4px' }} allowTransparency={true}></iframe>
          </section>

          <footer style={{ textAlign: 'center', padding: '40px', borderTop: '1px solid #111', color: '#444', fontSize: '0.8rem', letterSpacing: '2px' }}>
            NO APPLICATIONS NEEDED. JOIN. PLAY. BELONG. <br/> #SPARSEGAMING
          </footer>
        </div>
      ) : (
        <div style={{ position: 'relative', zIndex: 10, padding: '40px 5%', animation: 'fadeIn 0.4s ease' }}>
          <SectionTitle>Meet The Team</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'rgba(255,0,0,0.05)', border: '1px solid #ff0000', padding: '25px' }}>
              <div style={{ color: '#ff0000', fontWeight: 'bold', fontSize: '0.7rem' }}>👑 OWNER</div>
              <h3 style={{ margin: '10px 0', fontSize: '1.4rem' }}>MostPalone3796</h3>
              <p style={{ fontSize: '0.8rem', color: '#888' }}>Management of the Discord, Minecraft Realm, and community platforms.</p>
            </div>
            <div style={{ background: '#050505', border: '1px solid #222', padding: '25px' }}>
              <div style={{ color: '#ff0000', fontWeight: 'bold', fontSize: '0.7rem' }}>🛡️ COMMUNITY SUPPORT</div>
              <h3 style={{ margin: '10px 0', fontSize: '1.2rem' }}>Barktheunlucky</h3>
              <h3 style={{ margin: '0 0 10px', fontSize: '1.2rem' }}>H1ltxn02</h3>
              <p style={{ fontSize: '0.8rem', color: '#888' }}>Senior leadership. Handles events, ban appeals, and server experience.</p>
            </div>
            <div style={{ background: '#050505', border: '1px solid #222', padding: '25px' }}>
              <div style={{ color: '#ff0000', fontWeight: 'bold', fontSize: '0.7rem' }}>🌍 REALM SUPPORT</div>
              <h3 style={{ margin: '10px 0', fontSize: '1.2rem' }}>Tipanwolf15</h3>
              <div style={{ color: '#444', fontSize: '0.75rem', fontWeight: 'bold', margin: '10px 0' }}>⚠️ RECRUITING: 1 VACANCY</div>
              <p style={{ fontSize: '0.8rem', color: '#888' }}>Focused on the Minecraft Realm. Handles support tickets and in-game issues.</p>
            </div>
            <div style={{ background: '#050505', border: '1px solid #222', padding: '25px' }}>
              <div style={{ color: '#ff0000', fontWeight: 'bold', fontSize: '0.7rem' }}>🎮 BF6 COMMUNITY MANAGER</div>
              <h3 style={{ margin: '10px 0', fontSize: '1.2rem' }}>coldvalor26</h3>
              <div style={{ color: '#444', fontSize: '0.75rem', fontWeight: 'bold', margin: '10px 0' }}>⚠️ RECRUITING: 1 VACANCY</div>
              <p style={{ fontSize: '0.8rem', color: '#888' }}>Responsible for growing and managing our Battlefield 6 community.</p>
            </div>
            <div style={{ background: '#050505', border: '1px solid #222', padding: '25px' }}>
              <div style={{ color: '#ff0000', fontWeight: 'bold', fontSize: '0.7rem' }}>🔧 STAFF</div>
              <div style={{ color: '#ff0000', fontSize: '0.8rem', fontWeight: 'bold', margin: '10px 0' }}>3 POSITIONS VACANT</div>
              <p style={{ fontSize: '0.8rem', color: '#888' }}>Support the community through moderation and maintaining a safe environment.</p>
              <button onClick={() => window.open("https://discord.gg/DS6uGNvpNE")} style={{ background: '#ff0000', color: '#fff', border: 'none', padding: '6px 12px', marginTop: '10px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer' }}>APPLY VIA DISCORD</button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        body { margin: 0; padding: 0; background: #000; color: #fff; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </main>
  );
}

