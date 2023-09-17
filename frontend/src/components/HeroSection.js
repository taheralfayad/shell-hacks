import React from 'react';
import './HeroSection.css'



export default function HeroSection(){
    return(
        <div className="hero-container" style={{display: 'flex', marginRight: 100, flexDirection: 'column', width: '60%'}}>
            <h1 id = 'hero-title' style={{}}>Sustain.io</h1>
            <p className = 'hero-desc'>
            
Discover Sustain.io, a website that takes a deep dive into the sustainability efforts of leading American corporations, measuring them against industry standards. Our platform offers a clear and insightful look into how these companies are contributing to a greener future. Stay informed about corporate sustainability progress and make smart investment choices with Sustain.io.</p>
        </div>
    )
}   