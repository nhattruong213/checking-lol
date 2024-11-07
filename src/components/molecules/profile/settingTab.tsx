import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';

export const SettingTab = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0)}>
        <ListItemIcon>
          <HelpOutlineOutlinedIcon sx={{ fontSize: '16px' }} />
        </ListItemIcon>
        <ListItemText primary="Support" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(1)}>
        <ListItemIcon>
          <ManageAccountsOutlinedIcon sx={{ fontSize: '16px' }} />
        </ListItemIcon>
        <ListItemText primary="Account Settings" />
      </ListItemButton>
    </List>
  );
};
