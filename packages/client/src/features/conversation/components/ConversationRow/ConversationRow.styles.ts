import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  root: { marginBottom: theme.spacing(1) },
  selected: { backgroundColor: theme.palette.secondary.light },
}));