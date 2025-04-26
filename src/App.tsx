import React, { useState, useEffect, useContext } from 'react';
import TransmuteFromSelect from './components/TransmuteFromSelect';
import TransmuteFromDisplay from './components/TransmuteFromDisplay';
import TransmuteToSelect from './components/TransmuteToSelect';
import RequiredItemsDisplayComponent from './components/TransmuteToDisplay';
import ThemeSwitcher from './components/ThemeSwitcher';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import './App.css';
import './components/MaterialStyles.css';
import { ItemNumberInterval, calculateExpectedOutputByItemName, calculateRequiredTransmutations } from './utils/transmutationCalculator';

const AppContent: React.FC = () => {
    // State for transmutation item, target item, alpha level, and results
    const [transmutationItem, setTransmutationItem] = useState<string>('');
    const [transmutationQuantity, setTransmutationQuantity] = useState<number>(1);
    const [targetItem, setTargetItem] = useState<string>('');
    const [targetQuantity, setTargetQuantity] = useState<number>(1);
    const [alphaLevel, setAlphaLevel] = useState<number>(0.05);
    const [successModifier, setSuccessModifier] = useState<number>(1);
    const [transmutationResults, setTransmutationResults] = useState<ItemNumberInterval[]>([]);
    const [requiredItemsResults, setRequiredItemsResults] = useState<ItemNumberInterval[]>([]);
    const [activeView, setActiveView] = useState<'transmuteFrom' | 'transmuteTo'>('transmuteFrom');
    const { theme } = useContext(ThemeContext);

    // Add this effect to apply theme to body element
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const handleViewToggle = (selectionView: 'transmuteFrom' | 'transmuteTo') => {
        setActiveView(selectionView);
    };

    const handleItemSelect = (itemName: string, quantity: number, alpha: string, successMod: number) => {
        if (itemName && quantity > 0) {
            setTransmutationItem(itemName);
            setTransmutationQuantity(quantity);
            setAlphaLevel(parseFloat(alpha));
            setSuccessModifier(successMod);
            setActiveView('transmuteFrom');
        }
    };

    const handleTargetItemSelect = (item: string, quantity: number, alpha: string, successMod: number) => {
        setTargetItem(item);
        setTargetQuantity(quantity);
        if (alpha) {
            setAlphaLevel(parseFloat(alpha));
        }
        setSuccessModifier(successMod);
        setActiveView('transmuteTo');
    };

    // Calculate results whenever inputs change
    useEffect(() => {
        if (transmutationItem) {
            // Calculate what items can be created with current inventory
            const transResults = calculateExpectedOutputByItemName(
                transmutationItem, 
                transmutationQuantity, 
                alphaLevel, 
                successModifier
            );
            setTransmutationResults(transResults);
        }
        
        if (targetItem) {
            // Calculate what items are required to create target item
            const reqResults = calculateRequiredTransmutations(
                targetItem, 
                targetQuantity, 
                alphaLevel, 
                successModifier
            );
            setRequiredItemsResults(reqResults);
        }
    }, [transmutationItem, targetItem, transmutationQuantity, targetQuantity, alphaLevel, successModifier]);

    return (
        <div className={`app-container ${theme}`}>
            <header className="app-header">
                <h1>MWI Transmutation Calculator</h1>
                <ThemeSwitcher />
            </header>
            <main className="app-content">
                <div className={`content-section material-card ${theme}`}>
                    <div className="selection-header">
                        <h2>Item Selection</h2>
                        <div className="view-toggle">
                            <button 
                                className={activeView === 'transmuteFrom' ? 'active' : ''} 
                                onClick={() => handleViewToggle('transmuteFrom')}
                            >
                                Transmute From
                            </button>
                            <button 
                                className={activeView === 'transmuteTo' ? 'active' : ''} 
                                onClick={() => handleViewToggle('transmuteTo')}
                            >
                                Transmute To
                            </button>
                        </div>
                    </div>
                    
                    {activeView === 'transmuteFrom' ? (
                        <TransmuteFromSelect 
                            onSelect={handleItemSelect} 
                        />
                    ) : (
                        <TransmuteToSelect 
                            onSelect={handleTargetItemSelect}
                        />
                    )}
                </div>
                
                {(transmutationResults.length > 0 || requiredItemsResults.length > 0) && (
                    <div className={`content-section material-card ${theme}`}>
                        <div className="results-header">
                            <h2>Results</h2>
                            {transmutationResults.length > 0 && requiredItemsResults.length > 0 && (
                                <div className="view-toggle">
                                    <button 
                                        className={activeView === 'transmuteFrom' ? 'active' : ''} 
                                        onClick={() => handleViewToggle('transmuteFrom')}
                                    >
                                        Transmutation Results
                                    </button>
                                    <button 
                                        className={activeView === 'transmuteTo' ? 'active' : ''} 
                                        onClick={() => handleViewToggle('transmuteTo')}
                                    >
                                        Required Items
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        <div className={`results-container ${theme}`}>
                            {activeView === 'transmuteFrom' && transmutationResults.length > 0 ? (
                                <TransmuteFromDisplay 
                                    results={transmutationResults} 
                                    transmutedItem={transmutationItem}
                                    quantity={transmutationQuantity}
                                />
                            ) : activeView === 'transmuteTo' && requiredItemsResults.length > 0 ? (
                                <RequiredItemsDisplayComponent 
                                    results={requiredItemsResults}
                                    targetItem={targetItem}
                                    quantity={targetQuantity}
                                />
                            ) : null}
                        </div>
                    </div>
                )}
            </main>
            <footer className="app-footer">
                <p>© 2025 MWI Transmutation Calculator</p>
            </footer>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
};

export default App;
