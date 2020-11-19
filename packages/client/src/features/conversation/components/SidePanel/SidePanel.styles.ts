import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme: Theme) => ({
  tabs: {
    color: theme.palette.background.paper,
    borderBottom: "1px solid " + theme.palette.secondary.main,
  },
  tab: { minWidth: "unset" },
  tabPanel: { padding: theme.spacing(1) },
}));
