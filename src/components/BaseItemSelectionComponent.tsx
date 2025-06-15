import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './MaterialStyles.css';
import InfoButton from './InfoButton';

interface BaseItemSelectionProps {
    onSubmit: (itemName: string, quantity: number, alpha: string, level: number, catalyticTea: boolean, catalyst: boolean, primeCatalyst: boolean) => void;
    title: string;
    itemLabel: string;
    itemOptions: string[];
    submitButtonText: string;
    itemSelectPlaceholder: string;
    itemSelectId: string;
    quantityId: string;
    alphaId: string;
}

const BaseItemSelectionComponent: React.FC<BaseItemSelectionProps> = ({
    onSubmit,
    title,
    itemLabel,
    itemOptions,
    submitButtonText,
    itemSelectPlaceholder,
    itemSelectId,
    quantityId,
    alphaId,
}) => {
    const [selectedItem, setSelectedItem] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [alphaLevel, setAlphaLevel] = useState<string>('0.05');
    const [level, setLevel] = useState<number>(1);
    const [catalyticTea, setCatalyticTea] = useState<boolean>(false);
    const [catalyst, setCatalyst] = useState<boolean>(false);
    const [primeCatalyst, setPrimeCatalyst] = useState<boolean>(false);
    const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false);
    const [focusedItemIndex, setFocusedItemIndex] = useState<number>(-1);
    const { theme } = useContext(ThemeContext);

    // Get filtered suggestions
    const getFilteredSuggestions = () => {
        return itemOptions.filter((item) => {
            return selectedItem === ''
                || item.toLowerCase().includes(selectedItem.toLowerCase());
        });
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        const suggestions = getFilteredSuggestions();
        
        // Arrow down
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setFocusedItemIndex(prevIndex => 
                prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
            );
        }
        // Arrow up
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocusedItemIndex(prevIndex => 
                prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
            );
        }
        // Enter key
        else if (e.key === 'Enter' && focusedItemIndex >= 0 && showAutocomplete) {
            e.preventDefault();
            if (suggestions[focusedItemIndex]) {
                setSelectedItem(suggestions[focusedItemIndex]);
                setShowAutocomplete(false);
                setFocusedItemIndex(-1);
            }
        }
        // Escape key
        else if (e.key === 'Escape') {
            setShowAutocomplete(false);
            setFocusedItemIndex(-1);
        }
    };

    const handleItemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedItem(event.target.value);
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value));
    };

    const handleAlphaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAlphaLevel(event.target.value);
    };

    const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLevel(Number(event.target.value));
    };

    const handleCatalyticTeaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCatalyticTea(event.target.checked);
    };

    const handleCatalystChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCatalyst(event.target.checked);
    };

    const handlePrimeCatalystChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrimeCatalyst(event.target.checked);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItem && quantity > 0) {
            onSubmit(
                selectedItem,
                quantity,
                alphaLevel,
                level,
                catalyticTea,
                catalyst,
                primeCatalyst
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`material-form ${theme}`}>
            <h3>{title}</h3>
            <div className="form-group">
                <label htmlFor={itemSelectId} className={`material-label ${theme}`}>
                    {itemLabel}
                </label>                <div className="autocomplete-container">
                    <input
                        id={itemSelectId}
                        type="text"
                        value={selectedItem}                        onChange={(e) => {
                            setSelectedItem(e.target.value);
                            setShowAutocomplete(true);
                            setFocusedItemIndex(-1);
                        }}
                        onFocus={() => setShowAutocomplete(true)}
                        onBlur={() => {
                            // Delay hiding to allow for click on dropdown item
                            setTimeout(() => setShowAutocomplete(false), 200);
                        }}
                        placeholder={itemSelectPlaceholder}
                        className={`material-input ${theme}`}
                        autoComplete="off"
                        onKeyDown={handleKeyDown}
                    />
                    {showAutocomplete && (
                        <div className={`autocomplete-dropdown ${theme}`}>
                            {getFilteredSuggestions().map((item, index) => (
                                <div
                                    key={item}
                                    className={`autocomplete-item ${
                                        focusedItemIndex === index ? 'focused' : ''
                                    }`}
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setShowAutocomplete(false);
                                    }}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="form-group">
                <label htmlFor={quantityId} className={`material-label ${theme}`}>
                    Quantity:
                </label>
                <input
                    type="number"
                    id={quantityId}
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    className={`material-input ${theme}`}
                />
            </div>
            <div className="form-group">
                <label htmlFor={alphaId} className={`material-label ${theme}`}>
                    Confidence Level:
                    <InfoButton
                        content={
                            <div>
                                <p>
                                    Percent chance that the result is inside the confidence interval. (1 - α)
                                </p>
                            </div>
                        }
                        position="bottom"
                    />
                </label>
                <select
                    id={alphaId}
                    value={alphaLevel}
                    onChange={handleAlphaChange}
                    className={`material-select ${theme}`}
                >
                    <option value="0.005">99.5%</option>
                    <option value="0.01">99%</option>
                    <option value="0.05">95%</option>
                    <option value="0.1">90%</option>                </select>
            </div>
            <div className="form-group">
                <label htmlFor="level" className={`material-label ${theme}`}>
                    Alchemy Level:
                    <InfoButton
                        content={
                            <div>
                                <p>
                                    Character's alchemy level affects transmutation success chance.
                                </p>
                            </div>
                        }
                        position="bottom"
                    />
                </label>
                <input
                    type="number"
                    id="level"
                    value={level}
                    onChange={handleLevelChange}
                    min="1"
                    max="100"
                    className={`material-input ${theme}`}
                />
            </div>
            <div className="form-group">
                <label className={`material-label ${theme}`}>
                    Catalysts:
                    <InfoButton
                        content={
                            <div>
                                <p>
                                    These items increase transmutation success chance.
                                </p>
                            </div>
                        }
                        position="bottom"
                    />
                </label>
                <div className="checkbox-group">
                    <label className={`material-checkbox ${theme}`}>
                        <input
                            type="checkbox"
                            checked={catalyticTea}
                            onChange={handleCatalyticTeaChange}
                        />
                        Catalytic Tea
                    </label>
                    <label className={`material-checkbox ${theme}`}>
                        <input
                            type="checkbox"
                            checked={catalyst}
                            onChange={handleCatalystChange}
                        />
                        Catalyst
                    </label>
                    <label className={`material-checkbox ${theme}`}>
                        <input
                            type="checkbox"
                            checked={primeCatalyst}
                            onChange={handlePrimeCatalystChange}
                        />
                        Prime Catalyst
                    </label>
                </div>
            </div>

            <button type="submit" className={`material-button ${theme}`}>{submitButtonText}</button>
        </form>
    );
};

export default BaseItemSelectionComponent;
