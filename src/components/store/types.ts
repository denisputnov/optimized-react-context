import {ReactNode} from "react";

export type ProviderProps<T> = {
  initialState: T;
  children: ReactNode;
}

export type SelectorCallback<T, Result> = (state: T) => Result

export type CreateContextOptions = {
  debug?: boolean;
  contextName: string;
}
