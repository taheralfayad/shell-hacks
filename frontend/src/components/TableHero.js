import React from 'react';
import './HeroSection.css'


export default function HeroSection(){
    return(
        <div className="hero-container" style={{display: 'flex', marginRight: 100, flexDirection: 'row', width: '100%', alignItems: 'center'}}>
            <h1 id = 'rank-title' >Clear, Unbiased, Data-Driven Rankings</h1>
        </div>
    );
}