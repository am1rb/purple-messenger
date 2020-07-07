import React, { memo } from 'react';
import clsx from 'clsx';
import useStyles from './styles';

interface Props {
  className: string;
}

function ConversationList({ className }: Props) {
  const classes = useStyles();
  return <div className={clsx(classes.root, className)}>conversation list</div>;
}

export default memo(ConversationList);
