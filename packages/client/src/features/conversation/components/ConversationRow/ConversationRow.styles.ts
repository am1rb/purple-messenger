import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme: Theme) => ({
  root: { marginTop: theme.spacing(1) },
  box: { height: theme.spacing(9.5) },
  content: { padding: theme.spacing(1, 2) },
  selected: { backgroundColor: theme.palette.secondary.light },
}));
