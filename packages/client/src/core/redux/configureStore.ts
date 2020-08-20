import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import rootReducers, { State as RootState } from "./reducers";
import rootSagas from "./sagas";

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(
  preloadedState?: Partial<RootState>,
  enableSaga = true
) {
  const routerMiddlewareResult = routerMiddleware(history);
  const store = createStore(
    rootReducers(history),
    preloadedState,
    composeWithDevTools(
      enableSaga
        ? applyMiddleware(routerMiddlewareResult, sagaMiddleware)
        : applyMiddleware(routerMiddlewareResult)
    )
  );

  if (enableSaga) {
    sagaMiddleware.run(rootSagas);
  }

  return store;
}
