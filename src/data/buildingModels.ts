export interface BuildCost {
    wood: number;
    stone: number;
    metalFrags: number;
    hqm: number;
    gears?: number;
}

export type MaterialType = 'wood' | 'stone' | 'metal' | 'hqm' | 'misc';

export type Position3D = [number, number, number];
export type Rotation3D = [number, number, number];

export type BuilderShape = 'foundation' | 'wall' | 'floor' | 'triangle_foundation' | 'triangle_floor' | 'half_wall' | 'low_wall' | 'door';

export interface PlacedBlock {
    uid: string;
    blockId: string;
    blockType: BuilderShape; // Determines structural role (foundation, wall, floor, etc.)
    position: Position3D;
    rotation?: Rotation3D;
}

export type BlockShape = 'square' | 'triangle' | 'door';
export type HeightType = 'full' | 'half' | 'low';

export interface BuildingBlock {
    id: string;
    name: string;
    category: string;
    material: MaterialType;
    iconColor: string;
    customImgName?: string;
    cost: BuildCost;
    shape: BlockShape;
    heightType: HeightType;
    isHalfBlock?: boolean; // Determines block count weight for upkeep (1 vs 0.5)
}

const generateBlocks = (
    matPrefix: string,
    matName: string,
    catName: string,
    material: MaterialType,
    color: string,
    baseCost: BuildCost
): BuildingBlock[] => {
    // Base cost is for full square wall/foundation
    const costHalf = {
        wood: Math.floor(baseCost.wood / 2),
        stone: Math.floor(baseCost.stone / 2),
        metalFrags: Math.floor(baseCost.metalFrags / 2),
        hqm: Math.ceil(baseCost.hqm / 2),
    };

    return [
        {
            id: `${matPrefix}_full`,
            name: `${matName}全方块`,
            category: catName,
            material,
            iconColor: color,
            cost: baseCost,
            shape: 'square',
            heightType: 'full'
        },
        {
            id: `${matPrefix}_triangle`,
            name: `${matName}三角`,
            category: catName,
            material,
            iconColor: color,
            cost: costHalf,
            shape: 'triangle',
            heightType: 'full',
            isHalfBlock: true
        },
        {
            id: `${matPrefix}_half`,
            name: `${matName}半墙`,
            category: catName,
            material,
            iconColor: color,
            cost: costHalf,
            shape: 'square',
            heightType: 'half',
            isHalfBlock: true
        },
        {
            id: `${matPrefix}_low`,
            name: `${matName}矮墙`,
            category: catName,
            material,
            iconColor: color,
            cost: costHalf,
            shape: 'square',
            heightType: 'low',
            isHalfBlock: true
        }
    ];
};

export const BuildingBlocks: BuildingBlock[] = [
    ...generateBlocks("wood", "木", "木制", "wood", "#8b5a2b", { wood: 200, stone: 0, metalFrags: 0, hqm: 0 }),
    ...generateBlocks("stone", "石", "石制", "stone", "#808080", { wood: 0, stone: 300, metalFrags: 0, hqm: 0 }),
    ...generateBlocks("metal", "铁", "铁制", "metal", "#a9a9a9", { wood: 0, stone: 0, metalFrags: 200, hqm: 0 }),
    ...generateBlocks("hqm", "钢", "钢制", "hqm", "#ffffff", { wood: 0, stone: 0, metalFrags: 0, hqm: 25 }),

    // DOORS
    {
        id: "door_wood",
        name: "木门",
        category: "门窗",
        material: "misc",
        iconColor: "#8b5a2b",
        customImgName: "/rust-icon/construction/door.hinged.wood.png",
        cost: { wood: 300, stone: 0, metalFrags: 0, hqm: 0 },
        shape: 'door',
        heightType: 'full'
    },
    {
        id: "door_metal",
        name: "铁门",
        category: "门窗",
        material: "misc",
        iconColor: "#a9a9a9",
        customImgName: "/rust-icon/construction/door.hinged.metal.png",
        cost: { wood: 0, stone: 0, metalFrags: 150, hqm: 0 },
        shape: 'door',
        heightType: 'full'
    },
    {
        id: "door_garage",
        name: "卷帘门",
        category: "门窗",
        material: "misc",
        iconColor: "#a9a9a9",
        customImgName: "/rust-icon/construction/wall.frame.garagedoor.png",
        cost: { wood: 0, stone: 0, metalFrags: 300, hqm: 0, gears: 2 },
        shape: 'door',
        heightType: 'full'
    },
    {
        id: "door_hqm",
        name: "钢门",
        category: "门窗",
        material: "misc",
        iconColor: "#ffffff",
        customImgName: "/rust-icon/construction/door.hinged.toptier.png",
        cost: { wood: 0, stone: 0, metalFrags: 0, hqm: 20, gears: 5 },
        shape: 'door',
        heightType: 'full'
    }
];
