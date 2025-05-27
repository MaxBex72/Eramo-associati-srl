// src/App.js
import React, { useState } from 'react';
import './App.css';
import Slide from './components/Slide';
import { slides as allSlidesData } from './slidesData'; // Importa i dati

function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % allSlidesData.length);
  };

  const goToPreviousSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? allSlidesData.length - 1 : prevIndex - 1
    );
  };

  const currentSlideData = allSlidesData[currentSlideIndex];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Presentazione Zurigò Auto</h1>
      </header>
      <main>
        <Slide
          title={currentSlideData.title}
          slideNumber={currentSlideIndex + 1}
          totalSlides={allSlidesData.length}
        >
          {currentSlideData.content()} {/* Esegui la funzione per ottenere il JSX */}
        </Slide>
        <div className="navigation-buttons">
          <button onClick={goToPreviousSlide} disabled={currentSlideIndex === 0}>
            Precedente
          </button>
          <button onClick={goToNextSlide} disabled={currentSlideIndex === allSlidesData.length - 1}>
            Successiva
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;