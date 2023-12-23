import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [rateSpeed, setRateSpeed] = useState(1);
  const [speaking, setSpeaking] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handlePronounce = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rateSpeed;
    speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handlePronounce();
    }
  };

  const handleReset = () => {
    setText('');
  };

  const handleRateSpeed = (event) => {
    setRateSpeed(event.target.value);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="container">
      <header className="header">
        <nav className="navbar">
          <a href="https://www.financingfix.com" target="_blank" rel="noopener noreferrer" className="nav-link">
            Visit Our Website
          </a>
        </nav>
        <div className="ribbon">
          <h1 className="title">Word Reader</h1>
        </div>
      </header>
      <main className="main">
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter word or text"
            value={text}
            onChange={handleTextChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handlePronounce} disabled={speaking}>
            Pronounce
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div className="rate-speed-container">
          <label htmlFor="rate-speed">Speed:</label>
          <select id="rate-speed" name="rate-speed" value={rateSpeed} onChange={handleRateSpeed}>
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
        {speaking && <button onClick={handleStop}>Stop</button>}
      </main>
    </div>
  );
}

export default App;
