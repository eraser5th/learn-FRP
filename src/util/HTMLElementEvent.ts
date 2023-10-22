export interface HTMLElementEvent<T extends EventTarget> extends Event {
  target: T;
  currentTarget: T;
}
