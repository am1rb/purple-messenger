import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "core/redux/configureStore";
import { State as RootState } from "core/redux/reducers";

export function renderWithStore(
  ui: React.ReactElement,
  initStore: Partial<RootState>
) {
  const store = configureStore(initStore);

  return render(ui, {
    wrapper: ({ children }) => (
      <Provider store={store}>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </Provider>
    ),
  });
}
