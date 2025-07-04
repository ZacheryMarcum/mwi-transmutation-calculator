import React from 'react';
import { getItemNameList, getObtainableViaTransmutationList } from '../utils/itemDetailDictParser';
import BaseItemSelectionComponent from './BaseItemSelectionComponent';

interface ItemSelectionProps {
    onSubmit: (itemName: string, quantity: number, alpha: string, level: number, catalyticTea: boolean, catalyst: boolean, primeCatalyst: boolean) => void;
}

const TransmuteToSelect: React.FC<ItemSelectionProps> = ({ onSubmit }) => {
    return (
        <BaseItemSelectionComponent 
            onSubmit={onSubmit}
            title="Set Item Production Target"
            itemLabel="Select Target Item:"
            itemOptions={getObtainableViaTransmutationList()}
            submitButtonText="Set Target"
            itemSelectPlaceholder="--Please choose a target item--"
            itemSelectId="target-item-select"
            quantityId="target-quantity"
            alphaId="target-alpha-level"
        />
    );
};

export default TransmuteToSelect;
