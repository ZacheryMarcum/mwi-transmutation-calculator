import React from 'react';
import { getTransmutableList } from '../utils/itemDetailDictParser';
import BaseItemSelectionComponent from './BaseItemSelectionComponent';

interface TransmuteFromSelectProps {
    onSelect: (itemName: string, quantity: number, alpha: string, successModifier: number) => void;
}

const TransmuteFromSelect: React.FC<TransmuteFromSelectProps> = ({ onSelect }) => {
    return (
        <BaseItemSelectionComponent 
            onSelect={onSelect}
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
