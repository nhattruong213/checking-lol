import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useState } from "react";

export const ProfileTab = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
    <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0)}>
      <ListItemIcon>
        <EditOutlinedIcon sx={{ fontSize: '16px' }} />
      </ListItemIcon>
      <ListItemText primary="Edit Profile" />
    </ListItemButton>
    <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(1)}>
      <ListItemIcon>
        <PersonOutlineOutlinedIcon  sx={{ fontSize: '16px' }} />
      </ListItemIcon>
      <ListItemText primary="View Profile" />
    </ListItemButton>
  </List>
  )
}