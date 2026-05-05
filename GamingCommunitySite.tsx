'use client';
import { useEffect, useState, useRef } from "react";

export default function GamingCommunitySite() {
  const [members, setMembers] = useState<number | string>("...");
  const [online, setOnline] = useState<number | string>("...");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fetch Discord Stats
  useEffect(() => {
    fetch("https://discord.com/api/guilds/1487208919695753286/widget.json")
      .then(res => res.json())
      .then(data => {
        setMembers(data.members?.length || "N/A");
        setOnline(data.presence_count || "N/A");
      })
      .catch(() => {
        setMembers("N/A");
        setOnline("N/A");
      });
  }, []);

  // Handle Particle Animation safely in React
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: { x: number; y: number; dx: number; dy: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 1
      });
    }

    let animationFrameId: number;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "red";
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;

        // Bounce particles off edges
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const playClick = () => {
    const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");
    audio.volume = 0.2;
    audio.play();
  };

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", textAlign: "center", padding: "20px" }}>
      
      {/* Ref-based Canvas (much safer than <script>) */}
      <canvas 
        ref={canvasRef} 
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: 'none' }} 
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 style={{ color: "red", fontSize: "40px" }}>SPARSE GAMING DIVISION</h1>
        <p>Squad up. Dominate. Have fun.</p>

        <button 
          onClick={() => { playClick(); window.open("https://discord.gg/DS6uGNvpNE") }}
          style={{ padding: "10px 20px", background: "red", border: "none", borderRadius: "10px", cursor: "pointer", color: "white", fontWeight: "bold" }}>
          Join Discord
        </button>

        <h2 style={{ marginTop: "40px", color: "red" }}>Live Discord</h2>

        <div>
          <p>Members: {members}</p>
          <p>Online: {online}</p>
        </div>

        <iframe
          src="https://discord.com/widget?id=1487208919695753286&theme=dark"
          width="350"
          height="500"
          style={{ border: "1px solid red", borderRadius: "10px" }}
        ></iframe>
      </div>
    </div>
  );
}
