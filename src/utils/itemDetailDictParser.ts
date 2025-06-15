import importItemsDetailDict from "./itemsDetailDict.json";
import { ItemDetail, ItemDetailDictionary, TransmuteDropItem } from "./types";

// @ts-ignore
const itemsDetailDict: ItemDetailDictionary = importItemsDetailDict as ItemDetailDictionary

export function itemKeyToName(itemKey: string) {
    const itemDetail = itemsDetailDict[itemKey];
    if (itemDetail) {
        return itemDetail.name;
    } else {
        console.error("Item not found: " + itemKey);
        return "Unknown";
    }
}

export function itemNameToKey(itemName: string) {
    for (const itemKey in itemsDetailDict) {
        if (itemsDetailDict[itemKey].name == itemName) {
            return itemKey;
        }
    }
    console.error("Item not found: " + itemName);
    return "Unknown";
}

export function getItemAlchemyDetails(itemKey: string) {
    return itemsDetailDict[itemKey].alchemyDetail;
}

/**
 * Returns the item's level or 1 if undefined for any reason.
 */
export function getRequiredLevel(itemKey: string): number {
    return itemsDetailDict[itemKey].itemLevel || 1;
}

/**
 * Returns the item's transmute success rate or 0.5 if undefined for any reason
 */
export function getTransmuteBaseSuccessRate(itemKey: string): number {
    return getItemAlchemyDetails(itemKey)?.transmuteSuccessRate ?? 0.5;
}

export function getDropTable(itemKey: string) {
    return itemsDetailDict[itemKey].alchemyDetail?.transmuteDropTable ?? [];
}

export function getItemNameList() {
    return Object.values(itemsDetailDict)
        .map((detail: ItemDetail) => {
            return detail.name;
        })
        // Name must be not be falsy
        .filter((name: string) => { return name; });
}

export function getTransmutableList() {
    return Object.keys(itemsDetailDict)
        .filter((key: string) => {
            // Must be non-null and defined
            return itemsDetailDict[key].alchemyDetail?.transmuteDropTable;
        })
        .map(itemKeyToName);
}

export function getItemListTransmutesInto(itemName: string): string[] {
    const targetKey = itemNameToKey(itemName);
    const transmutesIntoTarget = getTransmutesIntoItemPredicate(targetKey);
    return Object.keys(itemsDetailDict)
        .filter(transmutesIntoTarget)
        .map(itemKeyToName);
}

/**
 * Creates a predicate function that determines if a given item can be transmuted into the pre-selected target item.
 * 
 * @param targetKey - The key of the target item for the predicate (will be baked into the returned predicate)
 * @returns A predicate that takes an item key and determines if it can be transmuted into the predicate's target item.
 */
function getTransmutesIntoItemPredicate(targetKey: string) {
    return (givenKey: string) => {
        const table = getDropTable(givenKey);
        return table.find((x: TransmuteDropItem) => { return targetKey == x.itemHrid }) !== undefined;
    }
}

export function getObtainableViaTransmutationList() {
    return Object.keys(itemsDetailDict)
        .filter(isObtainableViaTransmutation)
        .map(itemKeyToName);
}

function isObtainableViaTransmutation(itemKey: string) {
    const options = getItemListTransmutesInto(itemKeyToName(itemKey));
    return options.length > 0;
}

export function getMatchedItem(input: string): string | undefined {
    return Object.values(itemsDetailDict).find((entry) => {
        return input.toLowerCase() == entry.name.toLowerCase();
    })?.name;
}
