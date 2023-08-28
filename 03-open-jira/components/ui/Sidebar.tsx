import {
  Box,
  Drawer,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { MoveToInbox, Mail } from "@mui/icons-material";

const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"];

export const Sidebar = () => {
  return (
    <Drawer anchor="left" open={true} onClose={() => console.log("cerrando")}>
      <Box
        sx={{
          width: 250,
        }}
      >
        <Box
          sx={{
            padding: "5px 10px",
          }}
        >
          <Typography variant="h4">Menu</Typography>
        </Box>

        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={item}>
              <ListItemIcon>
                {index % 2 ? <MoveToInbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={item}>
              <ListItemIcon>
                {index % 2 ? <MoveToInbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
