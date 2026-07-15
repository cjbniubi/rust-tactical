export interface ExplosiveCost {
    sulfur: number;
    charcoal: number;
    metalFrags: number;
    lgf: number;
    cloth: number;
    techTrash: number;
    pipes: number;
    rope: number;
    customImgName?: string;
}

export const ExplosiveTypes: Record<string, ExplosiveCost> = {
    c4: { sulfur: 2200, charcoal: 3000, metalFrags: 200, lgf: 60, cloth: 5, techTrash: 2, pipes: 0, rope: 0, customImgName: '/rust-icon/tools/explosive.timed.png' },
    rocket: { sulfur: 1400, charcoal: 1950, metalFrags: 100, lgf: 30, cloth: 0, techTrash: 0, pipes: 2, rope: 0 },
    satchel: { sulfur: 480, charcoal: 720, metalFrags: 80, lgf: 0, cloth: 10, techTrash: 0, pipes: 0, rope: 1 },
    expAmmo: { sulfur: 25, charcoal: 30, metalFrags: 5, lgf: 0, cloth: 0, techTrash: 0, pipes: 0, rope: 0 }
};

export interface EcoMix {
    c4: number;
    rocket: number;
    satchel: number;
    expAmmo: number;
}

export interface TargetItem {
    id: string;
    name: string;
    category: string;
    iconName: string; // fallback icon name (Lucide react or similar)
    iconColor: string;
    customImgName?: string;
    
    c4: number;
    rocket: number;
    satchel: number;
    expAmmo: number;
    
    ecoMix: EcoMix;
}

// Generate unique IDs for targets
const generateId = () => Math.random().toString(36).substring(2, 11);

export const RaidTargets: TargetItem[] = [
    // Doors
    {
        id: generateId(),
        name: "木门", category: "门", iconName: "DoorOpen", iconColor: "#8b5a2b", customImgName: "/rust-icon/construction/door.hinged.wood.png",
        c4: 1, rocket: 1, satchel: 2, expAmmo: 19,
        ecoMix: { c4: 0, rocket: 0, satchel: 2, expAmmo: 0 }
    },
    {
        id: generateId(),
        name: "铁门", category: "门", iconName: "DoorClosed", iconColor: "#a9a9a9", customImgName: "/rust-icon/construction/door.hinged.metal.png",
        c4: 1, rocket: 2, satchel: 4, expAmmo: 63,
        ecoMix: { c4: 0, rocket: 1, satchel: 0, expAmmo: 8 }
    },
    {
        id: generateId(),
        name: "卷帘门", category: "门", iconName: "Menu", iconColor: "#a9a9a9", customImgName: "/rust-icon/construction/wall.frame.garagedoor.png",
        c4: 2, rocket: 3, satchel: 9, expAmmo: 150,
        ecoMix: { c4: 1, rocket: 0, satchel: 0, expAmmo: 40 }
    },
    {
        id: generateId(),
        name: "钢门", category: "门", iconName: "Lock", iconColor: "#d3d3d3", customImgName: "/rust-icon/construction/door.hinged.toptier.png",
        c4: 2, rocket: 4, satchel: 12, expAmmo: 200,
        ecoMix: { c4: 2, rocket: 0, satchel: 0, expAmmo: 0 }
    },


    // Walls
    {
        id: generateId(),
        name: "木墙", category: "墙壁", iconName: "Grid", iconColor: "#8b5a2b", customImgName: "/rust-icon/construction/wall.wood.png",
        c4: 1, rocket: 2, satchel: 3, expAmmo: 49,
        ecoMix: { c4: 0, rocket: 0, satchel: 3, expAmmo: 0 }
    },
    {
        id: generateId(),
        name: "石墙", category: "墙壁", iconName: "Square", iconColor: "#808080", customImgName: "/rust-icon/construction/wall.stone.png",
        c4: 2, rocket: 4, satchel: 10, expAmmo: 185,
        ecoMix: { c4: 2, rocket: 0, satchel: 0, expAmmo: 0 }
    },
    {
        id: generateId(),
        name: "铁墙", category: "墙壁", iconName: "Shield", iconColor: "#808080", customImgName: "/rust-icon/construction/wall.metal.png",
        c4: 4, rocket: 8, satchel: 23, expAmmo: 400,
        ecoMix: { c4: 4, rocket: 0, satchel: 0, expAmmo: 0 }
    },
    {
        id: generateId(),
        name: "钢墙", category: "墙壁", iconName: "ShieldAlert", iconColor: "#ffffff", customImgName: "/rust-icon/construction/wall.armored.png",
        c4: 8, rocket: 15, satchel: 46, expAmmo: 799,
        ecoMix: { c4: 8, rocket: 0, satchel: 0, expAmmo: 0 }
    },
    
    // High Walls (External)
    {
        id: generateId(),
        name: "木制高墙", category: "外围", iconName: "Grid", iconColor: "#8b5a2b", customImgName: "/rust-icon/construction/wall.external.high.png",
        c4: 2, rocket: 3, satchel: 6, expAmmo: 98,
        ecoMix: { c4: 1, rocket: 0, satchel: 2, expAmmo: 0 }
    },
    {
        id: generateId(),
        name: "石制高墙", category: "外围", iconName: "Square", iconColor: "#808080", customImgName: "/rust-icon/construction/wall.external.high.stone.png",
        c4: 2, rocket: 4, satchel: 10, expAmmo: 185,
        ecoMix: { c4: 2, rocket: 0, satchel: 0, expAmmo: 0 }
    },
    {
        id: generateId(),
        name: "木制外门", category: "外围", iconName: "DoorOpen", iconColor: "#8b5a2b", customImgName: "/rust-icon/construction/gates.external.high.wood.png",
        c4: 2, rocket: 3, satchel: 6, expAmmo: 98,
        ecoMix: { c4: 1, rocket: 0, satchel: 2, expAmmo: 0 }
    },
    {
        id: generateId(),
        name: "石制外门", category: "外围", iconName: "DoorClosed", iconColor: "#808080", customImgName: "/rust-icon/construction/gates.external.high.stone.png",
        c4: 2, rocket: 4, satchel: 10, expAmmo: 185,
        ecoMix: { c4: 2, rocket: 0, satchel: 0, expAmmo: 0 }
    },

    // Windows

    // Misc
    {
        id: generateId(),
        name: "领地柜", category: "杂项", iconName: "Box", iconColor: "#ffa500", customImgName: "/rust-icon/construction/cupboard.tool.png",
        c4: 1, rocket: 1, satchel: 1, expAmmo: 9,
        ecoMix: { c4: 0, rocket: 0, satchel: 0, expAmmo: 9 }
    },
    {
        id: generateId(),
        name: "防空炮", category: "杂项", iconName: "Target", iconColor: "#008000", customImgName: "/rust-icon/traps/samsite.png",
        c4: 1, rocket: 2, satchel: 3, expAmmo: 50,
        ecoMix: { c4: 0, rocket: 0, satchel: 3, expAmmo: 0 }
    },
    {
        id: generateId(),
        name: "自动炮台", category: "杂项", iconName: "Video", iconColor: "#ff0000", customImgName: "/rust-icon/electrical/autoturret.png",
        c4: 1, rocket: 2, satchel: 3, expAmmo: 40,
        ecoMix: { c4: 0, rocket: 0, satchel: 3, expAmmo: 0 }
    },
    {
        id: generateId(),
        name: "售货机", category: "杂项", iconName: "Box", iconColor: "#808080", customImgName: "/rust-icon/items/vending.machine.png",
        c4: 3, rocket: 10, satchel: 24, expAmmo: 250,
        ecoMix: { c4: 2, rocket: 2, satchel: 0, expAmmo: 0 }
    },

    // Facilities
    {
        id: generateId(),
        name: "三级工作台", category: "设施", iconName: "Hammer", iconColor: "#ff4444", customImgName: "/rust-icon/items/workbench3.png",
        c4: 4, rocket: 8, satchel: 23, expAmmo: 400,
        ecoMix: { c4: 4, rocket: 0, satchel: 0, expAmmo: 0 }
    },
    {
        id: generateId(),
        name: "二级工作台", category: "设施", iconName: "Hammer", iconColor: "#ffa500", customImgName: "/rust-icon/items/workbench2.png",
        c4: 3, rocket: 6, satchel: 17, expAmmo: 300,
        ecoMix: { c4: 2, rocket: 2, satchel: 0, expAmmo: 0 }
    },
    {
        id: generateId(),
        name: "大熔炉", category: "设施", iconName: "Flame", iconColor: "#cd4916", customImgName: "/rust-icon/items/furnace.large.png",
        c4: 2, rocket: 4, satchel: 12, expAmmo: 200,
        ecoMix: { c4: 1, rocket: 2, satchel: 0, expAmmo: 0 }
    },
    {
        id: generateId(),
        name: "大木箱", category: "设施", iconName: "Archive", iconColor: "#8b5a2b", customImgName: "/rust-icon/items/box.wooden.large.png",
        c4: 1, rocket: 1, satchel: 2, expAmmo: 30,
        ecoMix: { c4: 0, rocket: 0, satchel: 1, expAmmo: 0 }
    },

    // Traps
    {
        id: generateId(),
        name: "霰弹枪陷阱", category: "陷阱", iconName: "Crosshair", iconColor: "#808080", customImgName: "/rust-icon/traps/guntrap.png",
        c4: 1, rocket: 2, satchel: 3, expAmmo: 40,
        ecoMix: { c4: 0, rocket: 0, satchel: 2, expAmmo: 0 }
    },
    {
        id: generateId(),
        name: "烈焰炮台", category: "陷阱", iconName: "Flame", iconColor: "#cd4916", customImgName: "/rust-icon/traps/flameturret.png",
        c4: 1, rocket: 2, satchel: 3, expAmmo: 40,
        ecoMix: { c4: 0, rocket: 0, satchel: 2, expAmmo: 0 }
    }
];

export const Categories = Array.from(new Set(RaidTargets.map(t => t.category)));
