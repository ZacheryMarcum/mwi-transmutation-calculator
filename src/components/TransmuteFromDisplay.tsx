import React from 'react';
import { ItemNumberInterval } from '../utils/transmutationCalculator';
import BaseResultsDisplayComponent from './BaseResultsDisplayComponent';

const TransmuteFromDisplay: React.FC<{ 
    results: ItemNumberInterval[],
    transmutedItem?: string,
    quantity?: number
}> = ({ results, transmutedItem, quantity }) => {
    return (
        <BaseResultsDisplayComponent
            results={results}
            title="Transmutation Outcomes"
            itemName={transmutedItem}
            quantity={quantity}
            itemDescription="transmutation-source"
            noResultsMessage="No results available."
            itemLabel="Item"
            quantityLabel="Average Result"
            intervalLabel="Confidence Interval"
            itemNamePrefix="Transmuting:"
        />
    );
};

export default TransmuteFromDisplay;
