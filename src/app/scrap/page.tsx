import { Metadata } from 'next';
import { Scrap } from '@/components/Scrap';

export const metadata: Metadata = {
  title: '废料换算与黑市经济',
  description: 'Rust 废料计算、营地/前哨站兑换比例及黑市经济模拟器。',
};

export default function ScrapPage() {
  return <Scrap />;
}
