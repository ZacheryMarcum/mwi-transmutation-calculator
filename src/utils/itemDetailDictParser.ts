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
    const itemNameList: string[] = [];
    for (const itemKey in itemsDetailDict) {
        const itemDetail = itemsDetailDict[itemKey];
        if (itemDetail.name) {
            itemNameList.push(itemDetail.name);
        }
    }
    return itemNameList;
}

export function getTransmutableList() {
    const itemNameList: string[] = [];
    for (const itemKey in itemsDetailDict) {
        const itemDetail = itemsDetailDict[itemKey];
        if (itemDetail.name && itemDetail.alchemyDetail?.transmuteDropTable) {
            itemNameList.push(itemDetail.name);
        }
    }
    return itemNameList;
}

export function getItemListTransmutesInto(itemName: string): string[] {
    const itemList: string[] = [];
    const targetKey = itemNameToKey(itemName);
    for (const itemKey in itemsDetailDict) {
        const table = getDropTable(itemKey);
        if (table.find((x: TransmuteDropItem) => { return targetKey == x.itemHrid })) {
            itemList.push(itemKeyToName(itemKey));
        }
    }
    return itemList;
}

export function getObtainableViaTransmutationList() {
    const itemNameList: string[] = [];
    for (const itemKey in itemsDetailDict) {
        const options = getItemListTransmutesInto(itemKeyToName(itemKey));
        if (options.length > 0) {
            itemNameList.push(itemKeyToName(itemKey));
        }
    }
    return itemNameList;
}
