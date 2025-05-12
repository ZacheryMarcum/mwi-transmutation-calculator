import React, { useState, useRef, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

interface InfoButtonProps {
    content: React.ReactNode;
    position?: 'top' | 'right' | 'bottom' | 'left';
    iconSize?: number;
}

const InfoButton: React.FC<InfoButtonProps> = ({ 
    content, 
    position = 'top',
    iconSize = 16
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);
    const { theme } = useContext(ThemeContext);

    return (
        <div className="info-button-container" ref={buttonRef}>
            <div 
                className="info-icon"
                style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
            </div>
            
            {isVisible && (
                <div className={`info-button-content ${position} ${theme}`}>
                    {content}
                </div>
            )}
        </div>
    );
};

export default InfoButton;
