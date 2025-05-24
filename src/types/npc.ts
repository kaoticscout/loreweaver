export enum NPCStatus {
    ALIVE = 'alive',
    DEAD = 'dead',
    MISSING = 'missing',
    UNKNOWN = 'unknown'
}

export enum RelationshipStatus {
    UNMET = 'unmet',
    MET = 'met',
    FRIENDLY = 'friendly',
    CLOSE_FRIENDS = 'close_friends',
    ALLY = 'ally',
    RIVAL = 'rival',
    ENEMY = 'enemy'
}

export interface NPC {
    id: string;
    name: string;
    role: string;
    location: string;
    description: string;
    level?: number;
    faction?: string;
    status: NPCStatus;
    questGiver: boolean;
    relationshipStatus: RelationshipStatus;
    notes?: {
        id: string;
        text: string;
        timestamp: string;
    }[];
    schedule?: {
        time: string;
        location: string;
        activity: string;
    }[];
    dialogue?: NPCDialogue[];
    inventory?: NPCItem[];
    skills?: NPCSkill[];
    relationships?: NPCRelationship[];
    createdAt: string;
    updatedAt: string;
}

export interface NPCDialogue {
    id: string;
    text: string;
    conditions?: {
        quest?: string;
        reputation?: number;
        timeOfDay?: string[];
        weather?: string[];
    };
    options?: {
        text: string;
        nextDialogueId?: string;
        consequence?: string;
        requirements?: {
            quest?: string;
            reputation?: number;
            item?: string;
        };
    }[];
}

export interface NPCItem {
    name: string;
    description: string;
    quantity: number;
    forSale: boolean;
    price?: number;
    rarity?: 'COMMON' | 'UNCOMMON' | 'RARE' | 'VERY_RARE' | 'LEGENDARY';
}

export interface NPCSkill {
    name: string;
    level: number;
    description: string;
}

export interface NPCRelationship {
    npcId: string;
    type: 'BUSINESS' | 'FRIEND' | 'ENEMY' | 'NEUTRAL' | 'FAMILY';
    description: string;
    reputation: number;
} 