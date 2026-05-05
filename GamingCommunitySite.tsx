'use client';
import { useEffect, useState } from "react";

export default function GamingCommunitySite() {
  const [members, setMembers] = useState("...");
  const [online, setOnline] = useState("...");

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

  const playClick = () => {
    const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");
    audio.volume = 0.2;
    audio.play();
  };

  return (
    <div style={{background:"#000", color:"#fff", minHeight:"100vh", textAlign:"center", padding:"20px"}}>

      {/* Particle background */}
      <canvas id="particles" style={{position:"fixed", top:0, left:0, width:"100%", height:"100%", zIndex:0}} />

      <div style={{position:"relative", zIndex:1}}>
        <h1 style={{color:"red", fontSize:"40px"}}>SPARSE GAMING DIVISION</h1>
        <p>Squad up. Dominate. Have fun.</p>

        <button onClick={() => {playClick(); window.open("https://discord.gg/DS6uGNvpNE")}}
          style={{padding:"10px 20px", background:"red", border:"none", borderRadius:"10px"}}>
          Join Discord
        </button>

        <h2 style={{marginTop:"40px", color:"red"}}>Live Discord</h2>

        <div>
          <p>Members: {members}</p>
          <p>Online: {online}</p>
        </div>

        <iframe
          src="https://discord.com/widget?id=1487208919695753286&theme=dark"
          width="350"
          height="500"
          style={{border:"1px solid red", borderRadius:"10px"}}
        ></iframe>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        const canvas = document.getElementById('particles');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        for(let i=0;i<80;i++){
          particles.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            dx: (Math.random()-0.5)*1,
            dy: (Math.random()-0.5)*1
          });
        }

        function draw(){
          ctx.clearRect(0,0,canvas.width,canvas.height);
          ctx.fillStyle = "red";
          particles.forEach(p=>{
            ctx.beginPath();
            ctx.arc(p.x,p.y,2,0,Math.PI*2);
            ctx.fill();
            p.x+=p.dx;
            p.y+=p.dy;
          });
          requestAnimationFrame(draw);
        }
        draw();
      `}} />

    </div>
  );
}
