import React, { useState } from 'react';
import chroma from 'chroma-js';
import './app.css'

const ColorPaletteGenerator = () => {
  const [currentPalette, setCurrentPalette] = useState([]);
  const [savedPalettes, setSavedPalettes] = useState([]);

  const generateAnalogousPalette = () => {
    const baseColor = chroma.random();
    const analogousPalette = chroma
      .scale([baseColor, baseColor.set('hsl.h', '+30').saturate(2), baseColor.set('hsl.h', '-30').saturate(2)])
      .mode('lab')
      .colors(5);

    setCurrentPalette(analogousPalette);
  };

  const savePalette = () => {
    setSavedPalettes(prevPalettes => [...prevPalettes, currentPalette]);
  };

  const deletePalette = (index) => {
    setSavedPalettes(prevPalettes => prevPalettes.filter((_, i) => i !== index));
  };

  return (
    <div className="color-palette-generator">
      <div className="palette-section">
        <button onClick={generateAnalogousPalette}>Generate Palette</button>
        <div id="current-palette">
          {currentPalette.map((color, index) => (
            <div key={index} style={{ backgroundColor: color }}>
              {color}
            </div>
          ))}
          <button onClick={savePalette}>Save Palette</button>
        </div>
      </div>

      <div className="saved-palettes-section">
        <div className="saved-palette-container">
          {savedPalettes.map((palette, index) => (
            <div key={index} className="saved-palette">
              {palette.map((color, colorIndex) => (
                <div key={colorIndex} style={{ backgroundColor: color }}>
                  {color}
                </div>
              ))}
              <button onClick={() => deletePalette(index)} className="delete-palette-button">
                Delete Palette
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteGenerator;
