import { Metadata } from 'next';
import { Simulator } from '@/components/Simulator';

export const metadata: Metadata = {
  title: '抄家炸药消耗计算器 (C4/火箭弹)',
  description: '精确计算 Rust 抄家所需的 C4、火箭弹、爆炸子弹等物资消耗，最强拆家助手。',
};

export default function SimulatorPage() {
  return <Simulator />;
}
