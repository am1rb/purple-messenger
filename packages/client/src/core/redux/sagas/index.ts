import { all } from 'redux-saga/effects';

import socketSagas from 'features/socket/sagas';
import authSagas from 'features/auth/sagas';
import conversationSagas from 'features/conversation/sagas';

export default function* rootSaga() {
  yield all([
    ...socketSagas,
    ...authSagas,
    ...conversationSagas,
  ]);
}
