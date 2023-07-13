import {ContextStore} from "./store.ts";
import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {CreateContextOptions, ProviderProps, SelectorCallback} from "./types.ts";
import {useLatest} from "../../useLatest.hook.ts";
import {AccessContextOutsideProviderError} from "./errors.ts";
import {DEFAULT_CONTEXT_NAME} from "./constants.ts";

const __PRIVATE_CONTEXT_NAMES: string[] = [];

export function createOptimizedContext<T>(options: CreateContextOptions) {
  const { contextName = DEFAULT_CONTEXT_NAME, debug} = options ?? {};

  __PRIVATE_CONTEXT_NAMES.push(contextName)

  if (__PRIVATE_CONTEXT_NAMES.includes(contextName)) {
    console.warn(`Context with name %c${contextName}`, 'color: red', 'is already exists');
  }

  const Context = createContext<ContextStore<T> | null>(null);

  const Provider = ({
    initialState,
    children,
  }: ProviderProps<T>) => {
    const store = useMemo(() => new ContextStore(initialState, contextName, debug), []);

    return <Context.Provider value={store}>{children}</Context.Provider>;
  };

  Context.displayName = contextName;
  Provider.displayName = contextName;

  const useStore = () => {
    const store = useContext(Context);
    if (!store) {
      throw new AccessContextOutsideProviderError({ contextName });
    }
    return store;
  };

  const useStateSelector = <Result,>(
    selector: SelectorCallback<T, Result>
  ): Result => {
    const store = useStore();
    const [state, setState] = useState(() => selector(store.getState()));
    const selectorRef = useLatest(selector);
    const stateRef = useLatest(state);

    useEffect(() => {
      return store.subscribe(() => {
        const state = selectorRef.current(store.getState());

        if (stateRef.current === state) {
          return;
        }

        setState(state);
      });
    }, [store]);

    return state;
  };

  const useUpdate = () => {
    const store = useStore();

    return store.update;
  };

  return { Provider, useStateSelector, useUpdate };
}
