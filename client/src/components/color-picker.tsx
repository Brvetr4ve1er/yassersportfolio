import { useState, useEffect } from 'react';
import { Palette, X } from 'lucide-react';

const colorPresets = [
  { name: 'Green', value: 'hsl(142, 76%, 36%)' },
  { name: 'Blue', value: 'hsl(221, 83%, 53%)' },
  { name: 'Purple', value: 'hsl(262, 83%, 58%)' },
  { name: 'Pink', value: 'hsl(330, 81%, 60%)' },
  { name: 'Orange', value: 'hsl(25, 95%, 53%)' },
  { name: 'Red', value: 'hsl(0, 72%, 51%)' },
  { name: 'Yellow', value: 'hsl(45, 93%, 58%)' },
  { name: 'Teal', value: 'hsl(173, 58%, 39%)' },
  { name: 'Indigo', value: 'hsl(231, 48%, 48%)' },
  { name: 'Rose', value: 'hsl(351, 83%, 61%)' },
  { name: 'Emerald', value: 'hsl(160, 84%, 39%)' },
  { name: 'Sky', value: 'hsl(199, 89%, 48%)' },
];

export default function ColorPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState('hsl(142, 76%, 36%)');
  const [customColor, setCustomColor] = useState('#22c55e');

  useEffect(() => {
    // Load saved color from localStorage
    const savedColor = localStorage.getItem('accent-color');
    if (savedColor) {
      setCurrentColor(savedColor);
      updateAccentColor(savedColor);
    }
  }, []);

  const updateAccentColor = (color: string) => {
    // Update CSS variable
    document.documentElement.style.setProperty('--brand-accent', color);
    document.documentElement.style.setProperty('--accent', color);
    
    // Save to localStorage
    localStorage.setItem('accent-color', color);
    setCurrentColor(color);
  };

  const handlePresetClick = (color: string) => {
    updateAccentColor(color);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    setCustomColor(hex);
    
    // Convert hex to HSL
    const hsl = hexToHsl(hex);
    updateAccentColor(hsl);
  };

  const hexToHsl = (hex: string): string => {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    const sum = max + min;
    const l = sum / 2;
    
    let h = 0;
    let s = 0;
    
    if (diff !== 0) {
      s = l > 0.5 ? diff / (2 - sum) : diff / sum;
      
      switch (max) {
        case r:
          h = ((g - b) / diff + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / diff + 2) / 6;
          break;
        case b:
          h = ((r - g) / diff + 4) / 6;
          break;
      }
    }
    
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  return (
    <>
      <button
        className="color-picker-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open color picker"
        title="Customize accent color"
      >
        <Palette className="absolute inset-0 m-auto text-white mix-blend-difference" size={24} />
      </button>

      <div className={`color-picker-panel ${isOpen ? '' : 'hidden'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="color-picker-title">Accent Color</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-brand-secondary hover:text-brand-primary"
            aria-label="Close color picker"
          >
            <X size={20} />
          </button>
        </div>

        <div className="color-palette">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              className={`color-option ${currentColor === preset.value ? 'active' : ''}`}
              style={{ backgroundColor: preset.value }}
              onClick={() => handlePresetClick(preset.value)}
              aria-label={`Select ${preset.name} color`}
              title={preset.name}
            />
          ))}
        </div>

        <div className="color-input-section">
          <label htmlFor="custom-color" className="color-input-label">
            Custom Color
          </label>
          <input
            id="custom-color"
            type="color"
            value={customColor}
            onChange={handleCustomColorChange}
            className="color-input"
            style={{ height: '40px', cursor: 'pointer' }}
          />
        </div>

        <div className="mt-4 text-center">
          <div className="text-xs text-brand-secondary">
            Current: {currentColor}
          </div>
        </div>
      </div>

      {/* Overlay to close panel when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-999"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}