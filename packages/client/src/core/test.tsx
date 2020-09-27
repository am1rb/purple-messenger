import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "core/redux/configureStore";
import { State as RootState } from "core/redux/reducers";
import { AnyAction, Dispatch } from "redux";
export { renderHook } from "@testing-library/react-hooks";

export type InitialStore = Partial<RootState>;

export function renderWithStore(
  ui: React.ReactElement,
  initStore: InitialStore = {}
) {
  const fakeStore: {
    actions: AnyAction[];
    clearActions: () => void;
  } = {
    actions: [],
    clearActions: function () {
      fakeStore.actions = [];
    },
  };
  const store = configureStore(initStore, false);

  const dispatch: Dispatch<AnyAction> = (action) => {
    fakeStore.actions.push(action);
    return action;
  };

  store.dispatch = dispatch;

  return {
    ...render(ui, {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    }),
    store: fakeStore,
  };
}
