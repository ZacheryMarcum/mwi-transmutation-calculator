import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './MaterialStyles.css';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === 'dark';

  return (
    <div className="theme-switch-wrapper">
      <span className="material-label">
        {darkMode ? '🌙' : '☀️'}
      </span>
      <label className="theme-switch">
        <input 
          type="checkbox" 
          checked={darkMode} 
          onChange={toggleTheme} 
        />
        <span className="theme-slider"></span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
