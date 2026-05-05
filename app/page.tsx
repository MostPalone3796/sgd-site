"use client";
import React, { useState, useEffect } from "react";

export default function Page() {
  const [tab, setTab] = useState("ops"); // "ops" or "team"
  const [stats, setStats] = useState({ m: "...", o: "..." });

  useEffect(() => {
    fetch("https://discord.com/api/guilds/1487208919695753286/widget.json")
      .then(res => res.json())
      .then(d => setStats({ m: d.members?.length || "0", o: d.presence_count || "0" }))
      .catch(() => setStats({ m: "ACT", o: "ACT" }));
  }, []);

  const Box = ({ children, style = {} }: any) => (
    <div style={{ background: "#0a0a0a", border: "1px solid #222", padding: "20px", position: "relative", ...style }}>
      {children}
    </div>
  );

  return (
    <main style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh", fontFamily: "sans-serif", margin: 0 }}>
      {/* Dynamic Header */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 5%", borderBottom: "1px solid #300", background: "rgba(0,0,0,0.8)", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ fontWeight: "900", letterSpacing: "2px", color: "#ff0000" }}>SPARSE</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setTab("ops")} style={{ background: tab === "ops" ? "#ff0000" : "none", color: "#fff", border: "1px solid #ff0000", padding: "8px 15px", cursor: "pointer", fontSize: "0.7rem", fontWeight: "bold" }}>OPERATIONS</button>
          <button onClick={() => setTab("team")} style={{ background: tab === "team" ? "#ff0000" : "none", color: "#fff", border: "1px solid #ff0000", padding: "8px 15px", cursor: "pointer", fontSize: "0.7rem", fontWeight: "bold" }}>TEAM</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{ textAlign: "center", padding: "60px 20px", background: "radial-gradient(circle at top, #200 0%, #000 70%)" }}>
        <h1 style={{ fontSize: "clamp(2.5rem, 10vw, 5rem)", margin: 0, fontWeight: "900", textTransform: "uppercase" }}>
          SPARSE <span style={{ color: "#ff0000" }}>GAMING</span>
        </h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginTop: "20px" }}>
          <div><small style={{ color: "#ff0000", display: "block" }}>MEMBERS</small><b>{stats.m}</b></div>
          <div><small style={{ color: "#0f0", display: "block" }}>ONLINE</small><b>{stats.o}</b></div>
        </div>
      </header>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
        {tab === "ops" ? (
          <>
            {/* Game Grid */}
            <h2 style={{ fontSize: "0.8rem", letterSpacing: "3px", color: "#ff0000", marginBottom: "20px" }}>// CURRENT OPERATIONS</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              {[
                { n: "Deadside", img: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500", s: "PvP/PvE Survival" },
                { n: "Battlefield 6", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500", s: "Tactical Conquest" },
                { n: "Minecraft", img: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500", s: "Active Realm" }
              ].map(g => (
                <div key={g.n} style={{ height: "200px", position: "relative", overflow: "hidden", border: "1px solid #333" }}>
                  <img src={g.img} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} alt={g.n} />
                  <div style={{ position: "absolute", bottom: 20, left: 20 }}>
                    <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{g.n}</div>
                    <div style={{ color: "#ff0000", fontSize: "0.7rem", letterSpacing: "1px" }}>{g.s}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Realm Invite */}
            <Box style={{ marginTop: "40px", textAlign: "center", border: "2px solid #ff0000" }}>
              <h3 style={{ margin: 0, color: "#ff0000" }}>MINECRAFT ACCESS CODE</h3>
              <p style={{ fontSize: "2rem", fontWeight: "900", margin: "15px 0", letterSpacing: "2px" }}>VN9YgHYHLBCKCus</p>
              <a href="https://discord.gg/DS6uGNvpNE" style={{ color: "#fff", fontSize: "0.8rem", textDecoration: "underline" }}>Join Discord to Authenticate</a>
            </Box>
          </>
        ) : (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            <h2 style={{ fontSize: "0.8rem", letterSpacing: "3px", color: "#ff0000", marginBottom: "20px" }}>// COMMAND HIERARCHY</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
              {[
                { r: "OWNER", n: "MostPalone3796" },
                { r: "SUPPORT", n: "Barktheunlucky" },
                { r: "SUPPORT", n: "H1ltxn02" },
                { r: "REALM LEAD", n: "Tipanwolf15" },
                { r: "BF6 CM", n: "coldvalor26" }
              ].map(p => (
                <Box key={p.n}>
                  <div style={{ color: "#ff0000", fontSize: "0.6rem", fontWeight: "bold" }}>{p.r}</div>
                  <div style={{ fontSize: "1rem", marginTop: "5px" }}>{p.n}</div>
                </Box>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer style={{ textAlign: "center", padding: "60px 20px", color: "#444", fontSize: "0.7rem", letterSpacing: "2px" }}>
        EST. 2026 // SPARSE GAMING DIVISION // UNYIELDING PERFORMANCE
      </footer>
    </main>
  );
}
