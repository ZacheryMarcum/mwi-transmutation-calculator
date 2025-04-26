export interface EnhancementCost {
    itemHrid: string;
    count: number;
}

export interface DecomposeItem {
    itemHrid: string;
    count: number;
}

export interface TransmuteDropItem {
    itemHrid: string;
    dropRate: number;
    minCount: number;
    maxCount: number;
    minEliteTier: number;
}

export interface AlchemyDetail {
    bulkMultiplier: number;
    isCoinifiable: boolean;
    decomposeItems: DecomposeItem[] | null;
    transmuteSuccessRate: number;
    transmuteDropTable: TransmuteDropItem[] | null;
}

export interface LevelRequirement {
    skillHrid: string;
    level: number;
}

export interface EquipmentDetail {
    type: string;
    levelRequirements: LevelRequirement[];
    combatStats: { [key: string]: number };
    noncombatStats: { [key: string]: number };
    combatEnhancementBonuses: { [key: string]: number };
    noncombatEnhancementBonuses: { [key: string]: number };
}

export interface Buff {
    uniqueHrid: string;
    typeHrid: string;
    ratioBoost: number;
    ratioBoostLevelBonus: number;
    flatBoost: number;
    flatBoostLevelBonus: number;
    startTime: string;
    duration: number;
}

export interface CombatTrigger {
    dependencyHrid: string;
    conditionHrid: string;
    comparatorHrid: string;
    value: number;
}

export interface ConsumableDetail {
    cooldownDuration: number;
    usableInActionTypeMap: { [actionType: string]: boolean };
    hitpointRestore: number;
    manapointRestore: number;
    recoveryDuration: number;
    buffs: Buff[] | null;
    defaultCombatTriggers: CombatTrigger[] | null;
}

export interface AbilityBookDetail {
    abilityHrid: string;
    levelRequirements: LevelRequirement[];
    experienceGain: number;
}

export interface ItemDetail {
    hrid: string;
    name: string;
    description: string;
    categoryHrid: string;
    sellPrice: number;
    isTradable?: boolean;
    itemLevel?: number;
    enhancementCosts?: EnhancementCost[];
    protectionItemHrids?: string[];
    alchemyDetail?: AlchemyDetail;
    equipmentDetail?: EquipmentDetail;
    consumableDetail?: ConsumableDetail;
    abilityBookDetail?: AbilityBookDetail;
    isOpenable?: boolean;
    sortIndex: number;
}

export interface ItemDetailDictionary {
    [key: string]: ItemDetail;
}
