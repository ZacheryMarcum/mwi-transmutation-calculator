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
    return itemList
}
