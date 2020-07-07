import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyToken } from '@purple-messenger/core';

interface Props {
  token: string;
}

function VerifyToken({ token }: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken(token));
  }, [dispatch, token]);

  return <>verify token...</>;
}

export default memo(VerifyToken);
