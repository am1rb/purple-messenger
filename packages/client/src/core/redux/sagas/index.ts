import { all } from 'redux-saga/effects';

import socketSagas from 'features/socket/sagas';
import authSagas from 'features/auth/sagas';

export default function* rootSaga() {
  yield all([
    ...socketSagas,
    ...authSagas,
  ]);
}
