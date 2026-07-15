import { Metadata } from 'next';
import { MonumentLoot } from '@/components/MonumentLoot';

export const metadata: Metadata = {
  title: '据点地图与爆率分析',
  description: 'Rust 资源点地图详解、卡片门禁要求及各个据点物资爆率分析。',
};

export default function MonumentsPage() {
  return <MonumentLoot />;
}
