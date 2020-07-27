import React, { memo, ReactNode } from 'react';
import AppMenu from 'features/layout/components/AppMenu';
import { ClassesType } from 'core/type/general';
import useStyles from './Layout.styles';

interface Props {
  children: ReactNode;
  classes?: ClassesType<typeof useStyles>;
}

function Layout({ children, classes: classesProp }: Props) {
  const classes = useStyles({ classes: classesProp });
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <AppMenu className={classes.appMenu} />
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
}

export default memo(Layout);
