import { Metadata } from 'next';
import { Budget } from '@/components/Budget';

export const metadata: Metadata = {
  title: '战术资源规划与蓝图模拟',
  description: 'Rust 蓝图研究、工作台升级及核心资源规划模拟工具。',
};

export default function BudgetPage() {
  return <Budget />;
}
