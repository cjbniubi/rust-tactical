import { Metadata } from 'next';
import { Home } from '@/components/Home';

export const metadata: Metadata = {
  title: '战术指挥大厅',
  description: 'Rust 战术指挥中心首页，提供全方位的生存辅助和最新动态。',
};

export default function HomePage() {
  return <Home />;
}
