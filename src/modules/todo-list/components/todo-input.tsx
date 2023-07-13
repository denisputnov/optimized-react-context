import {FC} from 'react';
import {useStateSelector, useUpdate} from "../containers/todo-list.store.ts";

const TodoInput: FC = () => {
  const value = useStateSelector((state) => state.input);
  const update = useUpdate();
  return <input value={value} onChange={(e) => update({ input: e.target.value })}/>;
};

export default TodoInput;
