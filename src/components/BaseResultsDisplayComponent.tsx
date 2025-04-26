import React, { useContext } from 'react';
import { ItemNumberInterval } from '../utils/transmutationCalculator';
import './MaterialStyles.css';
import { ThemeContext } from '../context/ThemeContext';

interface BaseResultsDisplayProps {
    results: ItemNumberInterval[];
    title: string;
    itemName?: string;
    quantity?: number;
    itemDescription: string;
    noResultsMessage: string;
    itemLabel: string;
    quantityLabel: string;
    intervalLabel: string;
    itemNamePrefix: string;
}

const BaseResultsDisplayComponent: React.FC<BaseResultsDisplayProps> = ({
    results,
    title,
    itemName,
    quantity,
    itemDescription,
    noResultsMessage,
    itemLabel,
    quantityLabel,
    intervalLabel,
    itemNamePrefix,
}) => {
    const { theme } = useContext(ThemeContext);

    if (results.length === 0) {
        return <p className={theme}>{noResultsMessage}</p>;
    }

    return (
        <div className={theme}>
            <h3>{title}</h3>
            {itemName && (
                <p className={itemDescription}>
                    {itemNamePrefix} {itemName}{quantity && quantity > 1 ? ` x${quantity}` : ''}
                </p>
            )}
            <div className="table-container">
                <table className={`material-table ${theme}`}>
                    <thead>
                        <tr>
                            <th>{itemLabel}</th>
                            <th>{quantityLabel}</th>
                            <th>{intervalLabel}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={index}>
                                <td>{result.itemName}</td>
                                <td>{result.expectedOutput.toFixed(3)}</td>
                                <td>{result.confidenceInterval[0].toFixed(3)} - {result.confidenceInterval[1].toFixed(3)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BaseResultsDisplayComponent;
