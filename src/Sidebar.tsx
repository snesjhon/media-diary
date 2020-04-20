import Box from "@material-ui/core/Box";
import * as React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { IconX, IconHome, IconChart, IconSettings, IconLogo } from "./icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { useStoreActions, useStoreState } from "./config/store";

const useStyles = makeStyles((theme) => ({
  sibebar: {
    position: "sticky",
    top: "0",
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

function Sidebar() {
  const classes = useStyles();
  const user = useStoreState((state) => state.global.user);
  return (
    <Box>
      <List
        className={classes.sibebar}
        component="nav"
        aria-label="main mailbox folders"
      >
        <ListItem>
          <IconLogo />
          <Box
          pl={1}
            component="span"
            color="#592ABC"
            fontSize="h6.fontSize"
            fontWeight="600"
          >

            mediaDiary
          </Box>
        </ListItem>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <IconHome width={25} height={25} />
          </ListItemIcon>
          <ListItemText
            primary="Home"
            primaryTypographyProps={{ variant: "h6" }}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <IconChart width={25} height={25} />
          </ListItemIcon>
          <ListItemText
            primary="Stats"
            primaryTypographyProps={{ variant: "h6" }}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <IconSettings width={25} height={25} />
          </ListItemIcon>
          <ListItemText
            primary="Settings"
            primaryTypographyProps={{ variant: "h6" }}
          />
        </ListItem>
        <ListItem button component={Link} to="/profile">
          <ListItemIcon>
            <Avatar
              className={classes.avatar}
              alt={(user !== null && user.displayName) || ""}
              src={(user !== null && user.photoURL + "=s50-c") || ""}
            />
          </ListItemIcon>
          <ListItemText
            primary="Profile"
            primaryTypographyProps={{ variant: "h6" }}
          />
        </ListItem>
      </List>
    </Box>
  );
}

export default Sidebar;