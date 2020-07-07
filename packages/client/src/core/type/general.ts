export type StringObject<T = unknown> = Record<string, T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClassesType<T extends (...args: any) => any> = Partial<
  ReturnType<T>
>;
