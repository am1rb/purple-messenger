import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  root: {
    width: 124,
    backgroundColor: '#292b4b',
    paddingTop: theme.spacing(2),
  },
  firstName: { color: theme.palette.background.paper },
}));
