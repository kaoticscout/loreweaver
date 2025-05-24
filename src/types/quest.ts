export interface Quest {
    id: string;
    title: string;
    description: string;
    level: number;
    type: QuestType;
    status: QuestStatus;
    rewards: QuestReward[];
    requirements: QuestRequirement[];
    location: string;
    npcs: string[];
    objectives: QuestObjective[];
    createdAt: string;
    updatedAt: string;
    
    // Additional detailed fields
    difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | 'EPIC';
    timeEstimate?: number; // in minutes
    recommendedPartySize?: number;
    minPartySize?: number;
    maxPartySize?: number;
    recommendedClasses?: string[];
    recommendedLevels?: number[];
    questChain?: {
        previous?: string;
        next?: string;
    };
    detailedLocations?: QuestLocation[];
    detailedNPCs?: QuestNPC[];
    lore?: QuestLore;
    consequences?: QuestConsequence;
    specialConditions?: {
        timeOfDay?: string[];
        weather?: string[];
        season?: string[];
        moonPhase?: string[];
    };
    hiddenObjectives?: QuestObjective[];
    alternativeEndings?: {
        description: string;
        requirements: QuestRequirement[];
        rewards: QuestReward[];
    }[];
    reputationChanges?: {
        faction: string;
        amount: number;
        condition: 'SUCCESS' | 'FAILURE' | 'SPECIAL';
    }[];
    skillChecks?: {
        skill: string;
        difficulty: number;
        success: string;
        failure: string;
    }[];
    environmentalHazards?: {
        type: string;
        description: string;
        damage?: number;
        effect?: string;
    }[];
    questItems?: {
        name: string;
        description: string;
        required: boolean;
        consumable: boolean;
    }[];
}

export enum QuestType {
    MAIN = 'MAIN',
    SIDE = 'SIDE',
    FACTION = 'FACTION',
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    EVENT = 'EVENT'
}

export enum QuestStatus {
    AVAILABLE = 'AVAILABLE',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED'
}

export enum RewardType {
    GOLD = 'GOLD',
    EXPERIENCE = 'EXPERIENCE',
    ITEM = 'ITEM',
    REPUTATION = 'REPUTATION'
}

export enum RequirementType {
    LEVEL = 'LEVEL',
    ITEM = 'ITEM',
    QUEST = 'QUEST',
    REPUTATION = 'REPUTATION',
    SKILL = 'SKILL'
}

export enum ObjectiveType {
    KILL = 'KILL',
    COLLECT = 'COLLECT',
    ESCORT = 'ESCORT',
    EXPLORE = 'EXPLORE',
    TALK = 'TALK',
    CRAFT = 'CRAFT'
}

export interface QuestReward {
    type: RewardType;
    amount: number;
    item?: string;
    reputation?: {
        faction: string;
        amount: number;
    };
}

export interface QuestRequirement {
    type: RequirementType;
    value: number | string;
    skill?: string;
    level?: number;
}

export interface QuestObjective {
    id: string;
    description: string;
    type: ObjectiveType;
    target: string;
    amount: number;
    completed: boolean;
    optional?: boolean;
    timeLimit?: number; // in minutes
    failureCondition?: string;
}

export interface QuestDialogue {
    id: string;
    npc: string;
    text: string;
    options?: {
        text: string;
        nextDialogueId?: string;
        consequence?: string;
    }[];
}

export interface QuestLocation {
    name: string;
    coordinates?: {
        x: number;
        y: number;
    };
    description: string;
    hazards?: string[];
    secrets?: string[];
}

export interface QuestNPC {
    name: string;
    role: string;
    location: string;
    schedule?: {
        time: string;
        location: string;
    }[];
    dialogue?: QuestDialogue[];
    questGiver?: boolean;
    questTarget?: boolean;
}

export interface QuestLore {
    background: string;
    relatedQuests?: string[];
    historicalSignificance?: string;
    culturalImpact?: string;
    rumors?: string[];
}

export interface QuestConsequence {
    success: {
        immediate: string[];
        longTerm: string[];
        worldState?: Record<string, any>;
    };
    failure: {
        immediate: string[];
        longTerm: string[];
        worldState?: Record<string, any>;
    };
} 