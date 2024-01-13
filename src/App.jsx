import React, { useState } from 'react';
import chroma from 'chroma-js';

const ColorPaletteGenerator = () => {
  const [currentPalette, setCurrentPalette] = useState([]);
  const [savedPalettes, setSavedPalettes] = useState([]);

  const generateAnalogousPalette = () => {
    // Generate a base color
    const baseColor = chroma.random();

    // Generate an array of 5 analogous colors
    const analogousPalette = chroma
      .scale([baseColor, baseColor.set('hsl.h', '+30').saturate(2), baseColor.set('hsl.h', '-30').saturate(2)])
      .mode('lab')
      .colors(5);

    setCurrentPalette(analogousPalette);
  };

  const savePalette = () => {
    // Save the current palette to the list of saved palettes
    setSavedPalettes(prevPalettes => [...prevPalettes, currentPalette]);
  };

  const deletePalette = (index) => {
    // Delete the selected palette from the list of saved palettes
    setSavedPalettes(prevPalettes => prevPalettes.filter((_, i) => i !== index));
  };

  return (
    <div>
      <button onClick={generateAnalogousPalette}>Generate Palette</button>
      <div id="current-palette">
        {currentPalette.map((color, index) => (
          <div key={index} style={{ backgroundColor: color }}>
            {color}
          </div>
        ))}
        <button onClick={savePalette}>Save Palette</button>
      </div>

      <div id="saved-palettes">
        {savedPalettes.map((palette, index) => (
          <div key={index}>
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
  );
};

export default ColorPaletteGenerator;
