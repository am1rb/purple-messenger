import message, { MessageState } from "./message";

export interface State {
  message: MessageState;
}

const reducers = {
  message,
};

export default reducers;
