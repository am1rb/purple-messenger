import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "core/redux/configureStore";
import { State as RootState } from "core/redux/reducers";
export { renderHook } from "@testing-library/react-hooks";

export type InitialStore = Partial<RootState>;

export function renderWithStore(
  ui: React.ReactElement,
  initStore: InitialStore
) {
  const store = configureStore(initStore, false);

  return render(ui, {
    wrapper: ({ children }) => (
      <Provider store={store}>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </Provider>
    ),
  });
}
