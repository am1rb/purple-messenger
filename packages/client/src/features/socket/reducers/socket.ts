import {
  socketActionTypes as actionTypes,
  SetIsReadyAction,
  DisconnectedAction,
  ConnectedAction,
} from "@purple-messenger/core";

export interface SocketState {
  isConnected: boolean;
  isReady: boolean;
}

const initialState: SocketState = {
  isConnected: false,
  isReady: false,
};

function socketReducer(
  state: SocketState = initialState,
  action: SetIsReadyAction | DisconnectedAction | ConnectedAction
) {
  switch (action.type) {
    case actionTypes.socket.reducer.connected:
      return {
        ...state,
        isConnected: true,
      };
    case actionTypes.socket.reducer.disconnected:
      return {
        ...state,
        isConnected: false,
      };
    case actionTypes.socket.reducer.setIsReady:
      return {
        ...state,
        isReady: (action as SetIsReadyAction).status,
      };
    default:
      return state;
  }
}

export default socketReducer;
