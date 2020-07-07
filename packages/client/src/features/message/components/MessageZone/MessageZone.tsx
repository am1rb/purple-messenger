import React from 'react';
import clsx from 'clsx';
import useStyles from './styles';

interface Props {
  className: string;
  conversationId?: number;
}

function MessageZone({ className, conversationId }: Props) {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)}>
      {conversationId}
      please select a conversation
    </div>
  );
}

export default MessageZone;
