'use client';
import React, { useEffect, useState } from "react";

export default function GamingCommunitySite() {
  const [data, setData] = useState({ m: "...", o: "..." });

  useEffect(() => {
    fetch("https://discord.com/api/guilds/1487208919695753286/widget.json")
      .then(res => res.json())
      .then(d => setData({ m: d.members?.length || "0", o: d.presence_count || "0" }))
      .catch(() => setData({ m: "LIVE", o: "LIVE" }));
  }, []);

  const s = {
    card: { background: '#111', padding: '20px', border: '1px solid #333', marginBottom: '20px' },
    red: { color: '#ff0000', fontWeight: 'bold' }
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px' }}>
      <h1 style={s.red}>SPARSE GAMING</h1>
      
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <h2 style={{ fontSize: '2.5rem' }}>DIVISION HQ</h2>
        <p>MEMBERS: {data.m} | ONLINE: <span style={{color:'#0f0'}}>{data.o}</span></p>
      </div>

      <div style={s.card}>
        <h3 style={s.red}>MINECRAFT REALM</h3>
        <p>Invite Code: <span style={{fontSize:'1.2rem', letterSpacing:'1px'}}>VN9YgHYHLBCKCus</span></p>
        <p style={{fontSize:'0.8rem', opacity:0.6}}>*Discord is required.</p>
      </div>

      <div style={s.card}>
        <h3 style={s.red}>COMMAND</h3>
        <p>Owner: MostPalone3796</p>
        <p>Support: Barktheunlucky / H1ltxn02</p>
      </div>

      <center>
        <a href="https://discord.gg/DS6uGNvpNE" style={{ background: '#ff0000', color: '#fff', padding: '10px 20px', textDecoration: 'none', fontWeight: 'bold' }}>JOIN DISCORD</a>
      </center>
    </div>
  );
}
