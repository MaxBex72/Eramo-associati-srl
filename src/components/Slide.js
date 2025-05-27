// src/components/Slide.js
import React from 'react';
import './Slide.css'; // Crea un file CSS per lo stile

const Slide = ({ title, children, slideNumber, totalSlides }) => {
  return (
    <div className="slide">
      {title && <h2 className="slide-title">{title}</h2>}
      <div className="slide-content">
        {children}
      </div>
      <div className="slide-footer">
        Slide {slideNumber} di {totalSlides}
      </div>
    </div>
  );
};

export default Slide;