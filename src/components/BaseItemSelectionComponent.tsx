import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './MaterialStyles.css';

interface BaseItemSelectionProps {
    onSelect: (itemName: string, quantity: number, alpha: string, successModifier: number) => void;
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
    onSelect,
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
    const [successModifier, setSuccessModifier] = useState<number>(1);
    const { theme } = useContext(ThemeContext);

    const handleItemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedItem(event.target.value);
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value));
    };

    const handleAlphaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAlphaLevel(event.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItem && quantity > 0) {
            onSelect(selectedItem, quantity, alphaLevel, successModifier);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`material-form ${theme}`}>
            <h3>{title}</h3>
            <div className="form-group">
                <label htmlFor={itemSelectId} className={`material-label ${theme}`}>{itemLabel}</label>
                <select
                    id={itemSelectId}
                    value={selectedItem}
                    onChange={handleItemChange}
                    className={`material-select ${theme}`}
                >
                    <option value="">{itemSelectPlaceholder}</option>
                    {itemOptions.map((itemName) => (
                        <option key={itemName} value={itemName}>
                            {itemName}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor={quantityId} className={`material-label ${theme}`}>Quantity:</label>
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
                <label htmlFor={alphaId} className={`material-label ${theme}`}>Alpha Level:</label>
                <select
                    id={alphaId}
                    value={alphaLevel}
                    onChange={handleAlphaChange}
                    className={`material-select ${theme}`}
                >
                    <option value="0.005">0.005</option>
                    <option value="0.01">0.01</option>
                    <option value="0.05">0.05</option>
                    <option value="0.1">0.1</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor={`${itemSelectId}-success-modifier`} className={`material-label ${theme}`}>Success Modifier:</label>
                <input
                    type="number"
                    id={`${itemSelectId}-success-modifier`}
                    value={successModifier}
                    onChange={(e) => setSuccessModifier(Math.max(0.1, parseFloat(e.target.value) || 1))}
                    step="0.1"
                    min="0.1"
                    className={`material-input ${theme}`}
                />
            </div>

            <button type="submit" className={`material-button ${theme}`}>{submitButtonText}</button>
        </form>
    );
};

export default BaseItemSelectionComponent;
