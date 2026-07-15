export interface LootItem {
    name: string;
    englishName: string;
    shortname: string;
    chance: number; // percentage
    quantity: string;
    type: 'Weapon' | 'Explosive' | 'Component' | 'Resource' | 'Armor';
}

export interface CrateType {
    id: string;
    name: string;
    color: string; // Tailwind hex
    count: number | string; // e.g. "2-3" or 3
    lootTable: LootItem[];
}

export interface Monument {
    id: string;
    name: string;
    englishName: string;
    type: 'Tier 3' | 'Tier 2' | 'Tier 1';
    radiation: 'High' | 'Medium' | 'Low' | 'None';
    cardsRequired: ('Green' | 'Blue' | 'Red')[];
    description: string;
    crates: CrateType[];
}

// Simulated high-precision database for Rust Loot Tables
// Note: Rust loot tables are nested and complex. This is a flattened, highly readable representation for the UI.

const eliteCrateLoot: LootItem[] = [
    { name: '突击步枪 (AK47)', englishName: 'Assault Rifle', shortname: 'rifle.ak', chance: 3.0, quantity: '1', type: 'Weapon' },
    { name: '装甲板 (金属面罩)', englishName: 'Metal Facemask', shortname: 'metal.facemask', chance: 4.0, quantity: '1', type: 'Armor' },
    { name: 'C4 炸药', englishName: 'Timed Explosive Charge', shortname: 'explosive.timed', chance: 2.5, quantity: '1', type: 'Explosive' },
    { name: '火箭筒', englishName: 'Rocket Launcher', shortname: 'rocket.launcher', chance: 2.0, quantity: '1', type: 'Weapon' },
    { name: '火箭弹', englishName: 'Rocket', shortname: 'ammo.rocket.basic', chance: 5.0, quantity: '2-3', type: 'Explosive' },
    { name: '瞄准镜 (8x)', englishName: '8x Zoom Scope', shortname: 'weapon.mod.8x.scope', chance: 3.5, quantity: '1', type: 'Weapon' },
    { name: '科技零件', englishName: 'Tech Trash', shortname: 'techparts', chance: 15.0, quantity: '1-3', type: 'Component' },
    { name: '高金', englishName: 'High Quality Metal', shortname: 'metal.refined', chance: 25.0, quantity: '20-40', type: 'Resource' },
];

const militaryCrateLoot: LootItem[] = [
    { name: '冲锋枪 (Custom SMG)', englishName: 'Custom SMG', shortname: 'smg.2', chance: 4.0, quantity: '1', type: 'Weapon' },
    { name: '半自动步枪 (SAR)', englishName: 'Semi-Automatic Rifle', shortname: 'rifle.semiauto', chance: 3.0, quantity: '1', type: 'Weapon' },
    { name: '爆炸子弹', englishName: 'Explosive 5.56 Rifle Ammo', shortname: 'ammo.rifle.explosive', chance: 5.0, quantity: '10-20', type: 'Explosive' },
    { name: '医疗针', englishName: 'Medical Syringe', shortname: 'syringe.medical', chance: 12.0, quantity: '1-2', type: 'Resource' },
    { name: '金属管', englishName: 'Metal Pipe', shortname: 'metalpipe', chance: 15.0, quantity: '1-2', type: 'Component' },
    { name: '齿轮', englishName: 'Gears', shortname: 'gears', chance: 14.0, quantity: '1-2', type: 'Component' },
];

const lockedCrateLoot: LootItem[] = [
    { name: 'M249 班用机枪', englishName: 'M249', shortname: 'm249', chance: 5.0, quantity: '1', type: 'Weapon' },
    { name: 'L96 狙击步枪', englishName: 'L96 Rifle', shortname: 'rifle.l96', chance: 8.0, quantity: '1', type: 'Weapon' },
    { name: '突击步枪 (AK47)', englishName: 'Assault Rifle', shortname: 'rifle.ak', chance: 15.0, quantity: '1', type: 'Weapon' },
    { name: 'C4 炸药', englishName: 'Timed Explosive Charge', shortname: 'explosive.timed', chance: 12.0, quantity: '1-2', type: 'Explosive' },
    { name: '装甲门', englishName: 'Armored Door', shortname: 'door.hinged.t3', chance: 10.0, quantity: '1', type: 'Resource' },
];

const apcCrateLoot: LootItem[] = [
    { name: 'M249 班用机枪', englishName: 'M249', shortname: 'm249', chance: 9.0, quantity: '1', type: 'Weapon' },
    { name: 'L96 狙击步枪', englishName: 'L96 Rifle', shortname: 'rifle.l96', chance: 9.0, quantity: '1', type: 'Weapon' },
    { name: 'C4 炸药', englishName: 'Timed Explosive Charge', shortname: 'explosive.timed', chance: 18.0, quantity: '1-2', type: 'Explosive' },
    { name: '火箭筒', englishName: 'Rocket Launcher', shortname: 'rocket.launcher', chance: 12.0, quantity: '1', type: 'Weapon' },
    { name: '高金', englishName: 'High Quality Metal', shortname: 'metal.refined', chance: 100.0, quantity: '40-100', type: 'Resource' },
    { name: '科技零件', englishName: 'Tech Trash', shortname: 'techparts', chance: 40.0, quantity: '1-3', type: 'Component' },
];

export const monumentsData: Monument[] = [
    {
        id: 'launch-site',
        name: '火箭发射基地',
        englishName: 'Launch Site',
        type: 'Tier 3',
        radiation: 'High',
        cardsRequired: ['Green', 'Red'],
        description: '全图最顶级的资源点之一，拥有最高的辐射等级，由布雷德利装甲车 (Bradley APC) 巡逻守卫。红卡房位于主楼顶层。',
        crates: [
            { id: 'apc', name: '步战车残骸箱 (APC Crate)', color: '#ef4444', count: '2-3', lootTable: apcCrateLoot },
            { id: 'elite', name: '精英物资箱 (Elite Crate)', color: '#8b5cf6', count: 3, lootTable: eliteCrateLoot },
            { id: 'military', name: '军用物资箱 (Military Crate)', color: '#10b981', count: '4-6', lootTable: militaryCrateLoot },
        ]
    },
    {
        id: 'large-oil-rig',
        name: '大型钻井平台',
        englishName: 'Large Oil Rig',
        type: 'Tier 3',
        radiation: 'None',
        cardsRequired: ['Green', 'Blue', 'Red'],
        description: '海上的终极堡垒，由大量科学家 NPC 把守。刷卡后将触发重型科学家 (Heavy Scientists) 乘坐直升机降落。',
        crates: [
            { id: 'locked', name: '骇客密码箱 (Locked Crate)', color: '#f59e0b', count: 1, lootTable: lockedCrateLoot },
            { id: 'elite', name: '精英物资箱 (Elite Crate)', color: '#8b5cf6', count: 1, lootTable: eliteCrateLoot },
            { id: 'military', name: '军用物资箱 (Military Crate)', color: '#10b981', count: '8-12', lootTable: militaryCrateLoot },
        ]
    },
    {
        id: 'military-tunnels',
        name: '军事隧道',
        englishName: 'Military Tunnels',
        type: 'Tier 3',
        radiation: 'Medium',
        cardsRequired: ['Green', 'Blue', 'Red'],
        description: '地下错综复杂的隧道网络，科学家 NPC 密度极高，近战交火极为频繁，是获取中后期武器的绝佳去处。',
        crates: [
            { id: 'elite', name: '精英物资箱 (Elite Crate)', color: '#8b5cf6', count: 3, lootTable: eliteCrateLoot },
            { id: 'military', name: '军用物资箱 (Military Crate)', color: '#10b981', count: '5-7', lootTable: militaryCrateLoot },
        ]
    },
    {
        id: 'cargo-ship',
        name: '货船',
        englishName: 'Cargo Ship',
        type: 'Tier 3',
        radiation: 'None',
        cardsRequired: [],
        description: '全图移动的动态资源点，会定时刷新在地图边缘并环绕航行。拥有高密度的军用物资箱和3个定时解锁的骇客密码箱。',
        crates: [
            { id: 'locked', name: '骇客密码箱 (Locked Crate)', color: '#f59e0b', count: 3, lootTable: lockedCrateLoot },
            { id: 'military', name: '军用物资箱 (Military Crate)', color: '#10b981', count: '6-9', lootTable: militaryCrateLoot },
        ]
    },
    {
        id: 'train-yard',
        name: '火车站',
        englishName: 'Train Yard',
        type: 'Tier 2',
        radiation: 'Medium',
        cardsRequired: ['Green', 'Blue'],
        description: '中立的大型工业设施，拥有蓝卡解谜和丰富的组件刷新点。适合中期玩家过渡发育。',
        crates: [
            { id: 'military', name: '军用物资箱 (Military Crate)', color: '#10b981', count: '2-4', lootTable: militaryCrateLoot },
        ]
    }
];
