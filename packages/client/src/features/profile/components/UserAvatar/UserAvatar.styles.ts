import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export default makeStyles(
  (theme: Theme) => ({
    root: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      margin: "0 auto",
    },
  }),
  { name: "UserAvatar" }
);
