import React from 'react';
import { ItemNumberInterval } from '../utils/transmutationCalculator';
import BaseResultsDisplayComponent from './BaseResultsDisplayComponent';

const RequiredItemsDisplayComponent: React.FC<{ 
    results: ItemNumberInterval[],
    targetItem?: string,
    quantity?: number
}> = ({ results, targetItem, quantity }) => {
    return (
        <BaseResultsDisplayComponent
            results={results}
            title="Required Items for Target"
            itemName={targetItem}
            quantity={quantity}
            itemDescription="transmutation-target"
            noResultsMessage="No required items calculated."
            itemLabel="Item"
            quantityLabel="Average Required Quantity"
            intervalLabel="Confidence Interval"
            itemNamePrefix="Creating:"
        />
    );
};

export default RequiredItemsDisplayComponent;
