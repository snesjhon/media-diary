import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useStoreState } from "./config/store";
import User from "./User";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  divider: {
    color: theme.palette.grey["300"],
    marginRight: theme.spacing(1)
  },
  navColors: {
    backgroundColor: theme.palette.background.default
  },
  linkColor: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightBold
  },
  year: {
    color: theme.palette.secondary.main
  }
}));

const Navigation = () => {
  const year = useStoreState(state =>
    state.global.preferences.year !== null ? state.global.preferences.year : ""
  );
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.navColors}
        position="static"
        variant="outlined"
      >
        <Toolbar variant="dense">
          <Link
            className={classes.linkColor}
            variant="h6"
            component={RouterLink}
            to="/"
          >
            MediaDiary
          </Link>
          <Box display="flex" pl={1} flexGrow={1}>
            <Typography className={classes.divider} variant="h6">
              /
            </Typography>
            <Typography className={classes.year} variant="h6">
              {" "}
              {year}
            </Typography>
          </Box>
          <User />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;
