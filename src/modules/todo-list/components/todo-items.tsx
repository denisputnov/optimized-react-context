import {FC} from 'react';
import {useTodosRequest} from "../api";



const TodoItems: FC = () => {
  const {data: todos} = useTodosRequest();

  return <div>{todos?.map(item => <section key={item.id} style={{ border: '1px solid black' }}>{item.title}</section>)}</div>;
};

export default TodoItems;
