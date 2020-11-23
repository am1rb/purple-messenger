import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) => ({
  root: {},
  content: { display: "flex" },
  sidePanel: {
    flexShrink: 0,
    flexGrow: 0,
    backgroundColor: "#393a66",
    width: 300,
  },
  messageZone: {
    flexShrink: 1,
    flexGrow: 1,
  },
}));
