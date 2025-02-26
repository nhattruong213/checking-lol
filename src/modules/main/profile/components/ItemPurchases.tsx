import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import { useAppSelector } from '@/stores/hooks';

import { ItemEvent } from '../type';

type TProps = {
  itemPurchases: ItemEvent[];
};

export const ItemPurchases = ({ itemPurchases }: TProps) => {
  const { version } = useAppSelector((state) => state.common);

  // Nhóm vật phẩm theo phút
  const groupedItems: Record<number, ItemEvent[]> = {};

  itemPurchases.forEach((item) => {
    if (!groupedItems[item.timestamp]) {
      groupedItems[item.timestamp] = [];
    }

    groupedItems[item.timestamp].push(item);
  });

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.entries(groupedItems).map(([minute, items]) => (
        <Box key={minute} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 3, mb: 1 }}>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {items.map((item, index) => (
              <Box key={index}>
                <Image src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.itemId}.png`} alt="Item" width={40} height={40} />
              </Box>
            ))}
          </Box>
          <Typography variant="body2">
            {minute} {'phút'}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
