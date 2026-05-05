'use client';
import { useEffect, useState, useRef } from "react";

export default function GamingCommunitySite() {
  const [members, setMembers] = useState<number | string>("...");
  const [online, setOnline] = useState<number | string>("...");
  const [showStaff, setShowStaff] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Audio effect for tactical clicks
  const playClick = () => {
    const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");
    audio.volume = 0.1;
    audio.play().catch(() => {}); // Prevents errors if browser blocks auto-play
  };

  // Discord Stats Fetch - Will work once widget is enabled in Discord settings
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

  // Branded "Matrix/HUD" Particle Background (Red, with logo shapes)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles: { x: number; y: number; size: number; speed: number; opacity: number; char: string }[] = [];
    const characters = 'SGD∆∑∇Ω†'.split(''); // Special shapes including 'SGD'

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 6, // Slightly larger for clarity
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.4,
        char: characters[Math.floor(Math.random() * characters.length)]
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 0, 0, 0.4)"; // Bright red
      particles.forEach(p => {
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px monospace`;
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
    <h2 style={{ color: '#ff0000', fontSize: '1.4rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '30px', borderLeft: '5px solid #ff0000', paddingLeft: '15px', textShadow: '0 0 10px rgba(255,0,0,0.5)' }}>
      {children}
    </h2>
  );

  const GameCard = ({ name, img, icon, status, desc }: { name: string; img: string; icon: string; status?: string; desc: string }) => (
    <div style={{ position: 'relative', height: '220px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #222', transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer' }}
         className="game-card">
      <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, transition: '0.3s' }} className="game-img" />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.9))', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{icon} {name}</div>
        {desc && <div style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '5px' }}>{desc}</div>}
        {status && <div style={{ color: '#00ff00', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '3px' }}>{status}</div>}
      </div>
    </div>
  );

  return (
    <main style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'Orbitron, sans-serif', overflowX: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }} />

      {/* Branded CSS for effects */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        body { margin: 0; padding: 0; background: #000; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .game-card:hover { transform: translateY(-5px) scale(1.02); border-color: #ff0000; box-shadow: 0 0 30px rgba(255,0,0,0.3); }
        .game-card:hover .game-img { opacity: 0.8; }
        .stat-glow { text-shadow: 0 0 15px rgba(255,0,0,0.7); }
      `}</style>

      {/* Header / Nav */}
      <nav style={{ padding: '20px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(15px)', borderBottom: '1px solid #300', zIndex: 100 }}>
        <div style={{ fontWeight: '900', fontSize: '1.6rem', color: '#ff0000', letterSpacing: '3px', textShadow: '0 0 10px #ff0000' }}>SPARSE</div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => { playClick(); setShowStaff(!showStaff); }} style={{ background: 'none', color: '#fff', border: '1px solid #ff0000', padding: '10px 15px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>
            {showStaff ? 'COMMAND CENTER' : '🎖️ MEET THE TEAM'}
          </button>
          <button onClick={() => { playClick(); window.open("https://discord.gg/DS6uGNvpNE"); }} style={{ background: '#ff0000', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', boxShadow: '0 0 15px rgba(255,0,0,0.5)' }}>
            JOIN NOW
          </button>
        </div>
      </nav>

      {!showStaff ? (
        <div style={{ position: 'relative', zIndex: 1, padding: '0 5%' }}>
          
          {/* Hero Section */}
          <section style={{ textAlign: 'center', padding: '100px 0 50px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              {/* Optional: Add a simple text version of the logo shape or just leave blank */}
              <div style={{ border: '2px solid #ff0000', padding: '10px', textShadow: '0 0 5px #ff0000' }}>[ SGD HUD ]</div>
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 12vw, 5rem)', fontWeight: '900', margin: 0, lineHeight: 0.9, textTransform: 'uppercase', textShadow: '0 0 30px rgba(255,0,0,0.5)' }}>
              SPARSE <span style={{ color: '#ff0000' }}>GAMING</span><br/>DIVISION
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#888', marginTop: '20px', letterSpacing: '5px', fontWeight: 'bold' }}>PRECISION. POWER. PERFORMANCE.</p>
          </section>

          {/* Stats Row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginBottom: '80px' }}>
            <div style={{ textAlign: 'center' }}><span style={{ color: '#ff0000', display: 'block', fontSize: '0.8rem', fontWeight: 'bold' }}>MEMBERS</span><span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{members}</span></div>
            <div style={{ textAlign: 'center' }}><span style={{ color: '#00ff00', display: 'block', fontSize: '0.8rem', fontWeight: 'bold' }}>ONLINE</span><span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{online}</span></div>
          </div>

          {/* What We're Playing Grid - Updated with specific game images and descriptions */}
          <section style={{ marginBottom: '100px' }}>
            <SectionTitle>Tactical Operations</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
              {[
                { name: 'Deadside', img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=600', icon: '🪖', desc: 'Hardcore PvP/PvE Survival. Full loot. No mercy.' },
                { name: 'Battlefield 6', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600', icon: '💥', desc: 'Modern warfare. High-scale destruction. Large scale squad play.' },
                { name: 'Ready or Not', img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=600', icon: '🛡️', desc: 'Tactical SWAT shooter. Realism. Communication is key.' },
                { name: 'Minecraft (Bedrock)', img: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=600', icon: '🧱', desc: 'Community survival realm. Build. Survive. Dominate.', status: 'ACTIVE WORLD' }
              ].map((game) => (
                <GameCard key={game.name} {...game} />
              ))}
            </div>
          </section>

          {/* Minecraft Realm Guide & Perks */}
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
            </section>

            <section>
              <SectionTitle>Join the Realm</SectionTitle>
              <div style={{ background: 'rgba(255,0,0,0.05)', padding: '30px', border: '1px solid #ff0000', borderRadius: '4px', textAlign: 'center' }}>
                <p style={{ margin: '0 0 10px', fontSize: '0.9rem' }}>1. <span style={{color: '#ff0000', fontWeight: 'bold'}}>Discord is required</span> for realm membership.</p>
                <p style={{ margin: '0 0 20px', fontSize: '0.9rem' }}>2. Open Minecraft Bedrock & enter this Invite Code:</p>
                <div style={{ background: '#000', padding: '15px', textAlign: 'center', border: '2px dashed #ff0000', fontWeight: 'bold', color: '#ff0000', letterSpacing: '3px', fontSize: '1.2rem', marginBottom: '20px', textShadow: '0 0 10px rgba(255,0,0,0.5)' }}>
                  VN9YgHYHLBCKCus
                </div>
                <button onClick={() => { playClick(); window.open("https://discord.gg/DS6uGNvpNE"); }} style={{ width: '100%', background: '#ff0000', color: '#fff', border: 'none', padding: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>JOIN DISCORD FOR ACCESS</button>
              </div>
            </section>
          </div>

          {/* Discord Feed - Widget will work once enabled in Discord */}
          <section style={{ paddingBottom: '100px' }}>
             <SectionTitle>Live Intel Feed</SectionTitle>
             <iframe src="https://discord.com/widget?id=1487208919695753286&theme=dark" width="100%" height="500" style={{ border: '1px solid #222', borderRadius: '4px' }} allowTransparency={true}></iframe>
          </section>

          <footer style={{ textAlign: 'center', padding: '40px', borderTop: '1px solid #111', color: '#444', fontSize: '0.8rem', letterSpacing: '2px', fontFamily: 'Orbitron, sans-serif' }}>
            NO APPLICATIONS NEEDED. JOIN. PLAY. BELONG. <br/> ESTABLISHED FOR DOMINANCE. #SPARSEGAMING
          </footer>
        </div>
      ) : (
        /* STAFF DIRECTORY - MEET THE TEAM */
        <div style={{ position: 'relative', zIndex: 10, padding: '40px 5%', animation: 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <SectionTitle>COMMAND HIERARCHY</SectionTitle>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
            
            {[
              { role: '👑 OWNER', name: 'MostPalone3796', desc: 'Management of the Discord, Minecraft Realm, and community platforms.', primary: true },
              { role: '🛡️ COMMUNITY SUPPORT', names: ['Barktheunlucky', 'H1ltxn02'], desc: 'Senior leadership. Handles events, ban appeals, and server experience.' },
              { role: '🌍 REALM SUPPORT', name: 'Tipanwolf15', vacancies: 1, desc: 'Focused on the Minecraft Realm. Handles support tickets and in-game issues.' },
              { role: '🎮 BF6 COMMUNITY MANAGER', name: 'coldvalor26', vacancies: 1, desc: 'Responsible for growing and managing our Battlefield 6 community.' },
              { role: '🔧 STAFF', vacancies: 3, desc: 'Support the community through moderation and maintaining a safe environment.' }
            ].map(staff => (
              <div key={staff.role} style={{ background: staff.primary ? 'rgba(255,0,0,0.08)' : '#050505', border: staff.primary ? '1px solid #ff0000' : '1px solid #222', padding: '30px', boxShadow: staff.primary ? '0 0 20px rgba(255,0,0,0.2)' : 'none' }}>
                <div style={{ color: '#ff0000', fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '2px' }}>{staff.role}</div>
                {staff.name && <h3 style={{ margin: '15px 0', fontSize: '1.4rem' }}>{staff.name}</h3>}
                {staff.names && staff.names.map(name => <h3 key={name} style={{ margin: '0 0 10px', fontSize: '1.2rem' }}>{name}</h3>)}
                {staff.vacancies && (
                  <div style={{ color: staff.primary ? '#ff4444' : '#666', fontSize: '0.75rem', fontWeight: 'bold', margin: '15px 0' }}>⚠️ {staff.vacancies === 1 ? '1 VACANCY' : `${staff.vacancies} POSITIONS VACANT`}</div>
                )}
                <p style={{ fontSize: '0.85rem', color: '#aaa', lineHeight: '1.6', marginTop: '15px' }}>{staff.desc}</p>
                {staff.vacancies && <button onClick={() => window.open("https://discord.gg/DS6uGNvpNE")} style={{ background: '#ff0000', color: '#fff', border: 'none', padding: '8px 15px', marginTop: '15px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer' }}>APPLY IN DISCORD</button>}
              </div>
            ))}
          }
          </div>
        </div>
      )}
    </main>
  );
}
