"use client";
import React from "react";

export default function Page() {
  return (
    <main style={{ 
      backgroundColor: "#050505", 
      color: "#fff", 
      minHeight: "100vh", 
      fontFamily: "system-ui, sans-serif", 
      padding: "0", 
      margin: "0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      {/* Hero Section */}
      <section style={{ 
        width: "100%", 
        padding: "80px 20px", 
        background: "linear-gradient(to bottom, #1a0000 0%, #050505 100%)",
        borderBottom: "1px solid #300",
        textAlign: "center"
      }}>
        <h1 style={{ 
          fontSize: "clamp(2.5rem, 8vw, 4rem)", 
          fontWeight: "900", 
          margin: "0", 
          letterSpacing: "-1px",
          textTransform: "uppercase"
        }}>
          SPARSE <span style={{ color: "#ff0000", textShadow: "0 0 20px rgba(255,0,0,0.5)" }}>DIVISION</span>
        </h1>
        <p style={{ 
          fontSize: "0.9rem", 
          letterSpacing: "5px", 
          color: "#888", 
          marginTop: "10px",
          fontWeight: "bold" 
        }}>
          EST. 2026 // GLOBAL OPERATIONS
        </p>
      </section>

      {/* Main Content */}
      <div style={{ maxWidth: "800px", width: "100%", padding: "40px 20px" }}>
        
        {/* Minecraft Intel */}
        <div style={{ 
          background: "#0a0a0a", 
          border: "1px solid #222", 
          borderLeft: "4px solid #ff0000",
          padding: "30px", 
          marginBottom: "30px",
          position: "relative",
          overflow: "hidden"
        }}>
          <h2 style={{ fontSize: "0.8rem", color: "#ff0000", margin: "0 0 10px 0", letterSpacing: "2px" }}>ACTIVE REALM ACCESS</h2>
          <p style={{ fontSize: "1.8rem", fontWeight: "bold", margin: "0", fontFamily: "monospace" }}>VN9YgHYHLBCKCus</p>
          <p style={{ fontSize: "0.8rem", color: "#555", marginTop: "10px" }}>REQUIRED: VERIFIED DISCORD MEMBERSHIP</p>
        </div>

        {/* Command Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "40px" }}>
          <div style={{ background: "#0a0a0a", border: "1px solid #222", padding: "20px" }}>
            <h3 style={{ fontSize: "0.7rem", color: "#666", margin: "0 0 5px 0" }}>COMMANDER</h3>
            <p style={{ margin: "0", fontWeight: "bold" }}>MostPalone3796</p>
          </div>
          <div style={{ background: "#0a0a0a", border: "1px solid #222", padding: "20px" }}>
            <h3 style={{ fontSize: "0.7rem", color: "#666", margin: "0 0 5px 0" }}>SUPPORT UNIT</h3>
            <p style={{ margin: "0", fontWeight: "bold" }}>Barktheunlucky</p>
          </div>
          <div style={{ background: "#0a0a0a", border: "1px solid #222", padding: "20px" }}>
            <h3 style={{ fontSize: "0.7rem", color: "#666", margin: "0 0 5px 0" }}>SUPPORT UNIT</h3>
            <p style={{ margin: "0", fontWeight: "bold" }}>H1ltxn02</p>
          </div>
          <div style={{ background: "#0a0a0a", border: "1px solid #222", padding: "20px" }}>
            <h3 style={{ fontSize: "0.7rem", color: "#666", margin: "0 0 5px 0" }}>RECRUITMENT</h3>
            <p style={{ margin: "0", fontWeight: "bold" }}>Open</p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <a href="https://discord.gg/DS6uGNvpNE" style={{ 
            display: "inline-block",
            background: "#ff0000", 
            color: "#fff", 
            padding: "18px 40px", 
            textDecoration: "none", 
            fontWeight: "900", 
            fontSize: "1rem",
            letterSpacing: "1px",
            boxShadow: "0 10px 30px rgba(255,0,0,0.3)"
          }}>
            JOIN THE DISCORD
          </a>
        </div>

      </div>

      <footer style={{ marginTop: "auto", padding: "40px", color: "#333", fontSize: "0.7rem", letterSpacing: "2px" }}>
        TERMINAL ACCESS // SPARSE GAMING DIVISION
      </footer>
    </main>
  );
}
