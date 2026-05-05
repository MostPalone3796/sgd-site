"use client";
import React, { useState, useEffect } from "react";

export default function Page() {
  const [stats, setStats] = useState({ m: "...", o: "..." });

  useEffect(() => {
    fetch("https://discord.com/api/guilds/1487208919695753286/widget.json")
      .then(res => res.json())
      .then(d => setStats({ m: d.members?.length || "0", o: d.presence_count || "0" }))
      .catch(() => setStats({ m: "ACT", o: "ACT" }));
  }, []);

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ 
      color: "#ff0000", 
      fontSize: "1rem", 
      letterSpacing: "4px", 
      textTransform: "uppercase", 
      borderLeft: "4px solid #ff0000", 
      paddingLeft: "15px", 
      margin: "40px 0 20px 0",
      fontWeight: "900"
    }}>
      {children}
    </h2>
  );

  return (
    <main style={{ 
      backgroundColor: "#000", 
      backgroundImage: "radial-gradient(circle at center, #1a0000 0%, #000 80%)",
      color: "#fff", 
      minHeight: "100vh", 
      fontFamily: "sans-serif", 
      padding: "0 0 100px 0" 
    }}>
      {/* Top Navigation */}
      <nav style={{ padding: "20px 5%", display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,0,0,0.2)", backdropFilter: "blur(10px)" }}>
        <div style={{ fontWeight: "900", color: "#ff0000", letterSpacing: "2px" }}>SPARSE</div>
        <a href="https://discord.gg/DS6uGNvpNE" style={{ color: "#fff", textDecoration: "none", fontSize: "0.8rem", border: "1px solid #ff0000", padding: "5px 15px", fontWeight: "bold" }}>ACCESS GRANTED</a>
      </nav>

      {/* Hero Section */}
      <header style={{ textAlign: "center", padding: "80px 20px" }}>
        <h1 style={{ fontSize: "clamp(3rem, 12vw, 6rem)", margin: 0, fontWeight: "900", letterSpacing: "-2px" }}>
          SPARSE <span style={{ color: "#ff0000", textShadow: "0 0 30px rgba(255,0,0,0.4)" }}>GAMING</span>
        </h1>
        <p style={{ letterSpacing: "8px", color: "#888", fontSize: "0.8rem", marginTop: "10px" }}>PRECISION // POWER // PERFORMANCE</p>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "40px" }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ color: "#ff0000", display: "block", fontSize: "0.7rem", fontWeight: "bold" }}>TOTAL UNITS</span>
            <span style={{ fontSize: "2.5rem", fontWeight: "900" }}>{stats.m}</span>
          </div>
          <div style={{ textAlign: "center" }}>
            <span style={{ color: "#00ff00", display: "block", fontSize: "0.7rem", fontWeight: "bold" }}>ACTIVE NOW</span>
            <span style={{ fontSize: "2.5rem", fontWeight: "900" }}>{stats.o}</span>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Operations Section */}
        <SectionTitle>Current Operations</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {[
            { n: "Deadside", img: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600", desc: "Hardcore Survival" },
            { n: "Battlefield 6", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600", desc: "Tactical Combat" },
            { n: "Minecraft", img: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600", desc: "Active Realm" }
          ].map(game => (
            <div key={game.n} style={{ height: "250px", position: "relative", border: "1px solid #222", overflow: "hidden", borderRadius: "4px" }}>
              <img src={game.img} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} alt={game.n} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px", background: "linear-gradient(transparent, #000)" }}>
                <h3 style={{ margin: 0, fontSize: "1.5rem" }}>{game.n}</h3>
                <p style={{ color: "#ff0000", margin: 0, fontSize: "0.8rem", fontWeight: "bold" }}>{game.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Access Code Section */}
        <div style={{ margin: "60px 0", padding: "40px", border: "1px solid #ff0000", background: "rgba(255,0,0,0.05)", textAlign: "center" }}>
          <h3 style={{ color: "#ff0000", letterSpacing: "3px", fontSize: "0.9rem" }}>MINECRAFT REALM ACCESS CODE</h3>
          <div style={{ fontSize: "2.5rem", fontWeight: "900", margin: "20px 0", letterSpacing: "5px", color: "#fff" }}>VN9YgHYHLBCKCus</div>
          <p style={{ color: "#666", fontSize: "0.8rem" }}>AUTHENTICATION VIA DISCORD REQUIRED FOR ENTRY</p>
        </div>

        {/* Command Roster Section */}
        <SectionTitle>Meet The Team</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "15px" }}>
          {[
            { rank: "👑 OWNER", name: "MostPalone3796", color: "#ff0000" },
            { rank: "🛡️ SUPPORT", name: "Barktheunlucky", color: "#fff" },
            { rank: "🛡️ SUPPORT", name: "H1ltxn02", color: "#fff" },
            { rank: "⛏️ REALM LEAD", name: "Tipanwolf15", color: "#fff" },
            { rank: "🔫 BF6 CM", name: "coldvalor26", color: "#fff" }
          ].map(member => (
            <div key={member.name} style={{ background: "#0a0a0a", border: "1px solid #222", padding: "20px", borderRadius: "2px" }}>
              <div style={{ color: member.color, fontSize: "0.7rem", fontWeight: "bold", letterSpacing: "1px", marginBottom: "5px" }}>{member.rank}</div>
              <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{member.name}</div>
            </div>
          ))}
        </div>

      </div>

      <footer style={{ marginTop: "100px", textAlign: "center", borderTop: "1px solid #111", padding: "40px" }}>
        <p style={{ color: "#333", fontSize: "0.7rem", letterSpacing: "3px" }}>SPARSE GAMING DIVISION // TERMINAL 2026</p>
      </footer>
    </main>
  );
}
