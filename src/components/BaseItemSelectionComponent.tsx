import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './MaterialStyles.css';
import InfoButton from './InfoButton';

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
            onSelect(
                selectedItem,
                quantity,
                alphaLevel,
                (() => {
                    if (successModifier.toString() == "NaN") {
                        setSuccessModifier(1);
                        return 1;
                    } else {
                        return successModifier;
                    }
                })()
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`material-form ${theme}`}>
            <h3>{title}</h3>
            <div className="form-group">
                <label htmlFor={itemSelectId} className={`material-label ${theme}`}>
                    {itemLabel}
                    {/* <InfoButton
                        content={
                            <div>
                                <p>
                                    TODO
                                </p>
                            </div>
                        }
                        position="bottom"
                    /> */}
                </label>
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
                <label htmlFor={quantityId} className={`material-label ${theme}`}>
                    Quantity:
                    {/* <InfoButton
                        content={
                            <div>
                                <p>
                                    TODO - or scrap
                                </p>
                            </div>
                        }
                        position="bottom"
                    /> */}
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
                    <option value="0.1">90%</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor={`${itemSelectId}-success-modifier`} className={`material-label ${theme}`}>
                    Success Modifier:
                    <InfoButton
                        content={
                            <div>
                                <p>
                                    The percentage modifier for your transmutation success rate.
                                    (Can be lower than 100% to indicate that there is a penalty to success chance)
                                </p>
                            </div>
                        }
                        position="bottom"
                    />
                </label>
                <div className={`${theme}`}>
                    <input
                        type="text"
                        id={`${itemSelectId}-success-modifier`}
                        value={`${Math.round(successModifier * 100)}%`}
                        onChange={(e) => {
                            // Remove any non-numeric characters except decimal point
                            let value = e.target.value.replace(/[^\d.]/g, '');
                            const numericValue = parseFloat(value);
                            if (!isNaN(numericValue)) {
                                setSuccessModifier(numericValue / 100);
                            } else if (value === '' || value === '.') {
                                // Allow empty input or just decimal point
                                setSuccessModifier(0);
                            }
                        }}
                        onKeyDown={(e) => {
                            // Handle backspace when cursor is at the end (after %)
                            if (e.key === 'Backspace' && 
                                e.currentTarget.selectionStart === e.currentTarget.value.length) {
                                const currentValue = Math.round(successModifier * 100);
                                // Remove last digit
                                const newValue = Math.floor(currentValue / 10);
                                setSuccessModifier(newValue / 100);
                                e.preventDefault();
                            }
                        }}
                        className={`material-input ${theme}`}
                    />
                </div>
            </div>

            <button type="submit" className={`material-button ${theme}`}>{submitButtonText}</button>
        </form>
    );
};

export default BaseItemSelectionComponent;
