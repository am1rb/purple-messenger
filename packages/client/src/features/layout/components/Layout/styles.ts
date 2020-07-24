import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    height: '100%',
    padding: '20px 0'
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    height: '100%',
    width: '100%',
    backgroundColor: '#e3e3f0',
    borderRadius: theme.shape.borderRadius,
    display: 'flex'
  },
  appMenu: {
    flexGrow: 0,
    flexShrink: 0
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'hidden',
  }
}));
