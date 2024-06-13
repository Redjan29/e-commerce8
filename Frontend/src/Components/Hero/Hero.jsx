import React from 'react';
import './Hero.css'

import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import accueil_image from '../Assets/accueil_image.jpg'

//la fonction qui permet de scroller
const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

const Hero= () => {
    return (
     <div className='hero'>
       <div className="hero-left">
             <h2>New ARRIVALS ONLY</h2>
             <div>

             <div className="hand-hand-icon">
                  <p>new</p>
                  <img src={hand_icon} alt="" />
            </div>
            <p>collections</p>
            <p>for everyone</p>
        </div>
        <div className="hero-latest-btn" onClick={() => scrollToSection('latest-collection')}>
        <div>Latest Collection</div>
        <img src={arrow_icon} alt="" />
      </div>
    </div>
        <div className='hero-right'>
          <img src={accueil_image} alt="" />
        </div>
        </div>
    );
};

export default Hero;
