import {createOptimizedContext} from "../../../components/store";

export interface ContextData {
  input: string
}
const {
  Provider,
  useStateSelector,
  useUpdate
} = createOptimizedContext<ContextData>({ contextName: 'todo-list-module-store' });

export {
  Provider,
  useStateSelector,
  useUpdate
}
