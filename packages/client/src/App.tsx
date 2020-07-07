import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PageRouter from 'components/PageRouter';
import {start, shutdown} from '@purple-messenger/core';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(start());
    return function() {
      dispatch(shutdown());
    }
  }, [ dispatch ]);
  return <PageRouter />;
};

export default App;
