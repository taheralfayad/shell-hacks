import React from 'react';
import './HeroSection.css'



export default function HeroSection(){
    return(
        <div className="hero-container" style={{display: 'flex', marginRight: 100, flexDirection: 'column', width: '60%'}}>
            <h1 id = 'hero-title' style={{}}>Sustain.io</h1>
            <p className = 'hero-desc'>
Explore Sustain.io, a comprehensive website that meticulously assesses and compares the sustainability practices of major American corporations against an industry-standard benchmark. Our user-friendly platform provides a transparent and insightful glimpse into the ecosocial-conscious efforts of these companies, helping users make informed choices and support businesses committed to a greener future. Stay updated on corporate sustainability progress and make future-proof investments with Sustain.io.</p>
        </div>
    )
}   