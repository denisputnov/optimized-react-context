import {CONTRAST_COLORS} from "./constants.ts";

export class ContextStore<T> {
  private subscriptions: Set<() => void> = new Set<() => void>();
  private state: T;
  private readonly contextName: string;
  private readonly debug: boolean;
  private readonly color: string;
  constructor(initialState: T, contextName: string, debug?: boolean) {
    this.state = initialState;
    this.contextName = contextName;
    this.debug = debug ?? false;
    this.color = debug ? CONTRAST_COLORS[Math.floor(Math.random() * CONTRAST_COLORS.length)] : '';
  }

  getState = () => {
    return this.state;
  };

  update = (partialNewState: Partial<T>) => {
    this.logDebugInfo(this.state, partialNewState);

    this.state = { ...this.state, ...partialNewState };

    this.subscriptions.forEach((cb) => {
      cb();
    });
  };

  subscribe = (cb: () => void) => {
    this.subscriptions.add(cb);

    return () => {
      this.subscriptions.delete(cb);
    };
  };

  private logDebugInfo = (prevData: unknown, newData: unknown) => {
    if (!this.debug) return;

    console.groupCollapsed(`Context: %c"${this.contextName}`, `color: ${this.color}`, 'update debug message');
    console.log('Prev', prevData);
    console.log('New', newData);
    console.groupEnd();
  }
}
