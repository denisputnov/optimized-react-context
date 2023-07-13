import {FC} from 'react';
import {useStateSelector} from "../containers/todo-list.store.ts";

const TodoRepresenter: FC = () => {
  const value = useStateSelector((state) => state.input);
  return <p>{value}</p>;
};

export default TodoRepresenter;
