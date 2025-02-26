import { Box } from '@mui/material';

import { SkillEvent } from '../type';

type TProps = {
  skillOrder: SkillEvent[];
};
export const SkillOrder = (props: TProps) => {
  const { skillOrder } = props;

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {skillOrder.map((skill, index) => (
          <Box key={index} sx={{ p: 1, border: '1px solid gray', borderRadius: 1, width: 40, height: 40, textAlign: 'center' }}>
            {skill.skillSlot === 1 ? 'Q' : skill.skillSlot === 2 ? 'W' : skill.skillSlot === 3 ? 'E' : skill.skillSlot === 4 ? 'R' : ''}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
