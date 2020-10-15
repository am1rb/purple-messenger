class Socket {
  private EVENTS: Record<string, Function[]> = {};
  public connected = false;

  constructor() {
    setTimeout(this.connect, 0);
  }

  on = (event: string, func: Function) => {
    if (this.EVENTS[event]) {
      this.EVENTS[event].push(func);
    } else {
      this.EVENTS[event] = [func];
    }
    return this;
  };

  off = (event: string, func?: Function) => {
    if (this.EVENTS[event]) {
      if (!func) {
        delete this.EVENTS[event];
      } else {
        const idx = this.EVENTS[event].indexOf(func);
        this.EVENTS[event].splice(idx, 1);
      }
    }
    return this;
  };

  emit = (event: string, ...args: any[]) => {
    if (this.EVENTS[event]) {
      this.EVENTS[event].forEach((func) => func(...args));
    }
    return this;
  };

  listeners = (event: string) => {
    return this.EVENTS[event] ?? [];
  };

  connect = () => {
    this.connected = true;
    this.emit("connect");
    return this;
  };

  disconnect = () => {
    this.connected = false;
    this.emit("disconnect");
    return this;
  };
}

const io = () => new Socket();

export default io;
