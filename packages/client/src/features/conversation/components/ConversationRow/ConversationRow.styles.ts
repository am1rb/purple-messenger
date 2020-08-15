import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme: Theme) => ({
  root: { marginBottom: theme.spacing(1) },
  selected: { backgroundColor: theme.palette.secondary.light },
}));
