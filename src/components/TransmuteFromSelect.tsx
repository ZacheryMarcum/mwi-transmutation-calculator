import React from 'react';
import { getTransmutableList } from '../utils/itemDetailDictParser';
import BaseItemSelectionComponent from './BaseItemSelectionComponent';

interface TransmuteFromSelectProps {
    onSubmit: (itemName: string, quantity: number, alpha: string, level: number, catalyticTea: boolean, catalyst: boolean, primeCatalyst: boolean) => void;
}

const TransmuteFromSelect: React.FC<TransmuteFromSelectProps> = ({ onSubmit }) => {
    return (
        <BaseItemSelectionComponent 
            onSubmit={onSubmit}
            title="Transmute from Current Items"
            itemLabel="Select Item:"
            itemOptions={getTransmutableList()}
            submitButtonText="Calculate"
            itemSelectPlaceholder="--Please choose an item--"
            itemSelectId="item-select"
            quantityId="quantity"
            alphaId="alpha-level"
        />
    );
};

export default TransmuteFromSelect;
