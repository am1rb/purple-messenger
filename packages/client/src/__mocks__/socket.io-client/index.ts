class Socket {
  private EVENTS: Record<string, Function[]> = {};
  public connected = false;

  constructor() {
    setTimeout(this.connect, 0);
  }

  on = (event: string, func: Function) => {
    if (this.EVENTS[event]) {
      return this.EVENTS[event].push(func);
    }
    this.EVENTS[event] = [func];
  };

  emit = (event: string, ...args: any[]) => {
    if (this.EVENTS[event]) {
      this.EVENTS[event].forEach((func) => func(...args));
    }
  };

  connect = () => {
    this.connected = true;
    this.emit("connect");
  };

  disconnect = () => {
    this.connected = false;
    this.emit("disconnect");
  };
}

const io = () => new Socket();

export default io;
