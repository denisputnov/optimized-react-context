import {FC} from 'react';
import {ContextData, Provider} from "./todo-list.store.ts";
import {TodoInput, TodoRepresenter, TodoItems} from "../components";

const initialState: ContextData = {
  input: ''
}

const TodoList: FC = () => {
  return <Provider initialState={initialState}>
    <TodoInput />
    <TodoItems/>
    <TodoRepresenter />
  </Provider>;
};

export default TodoList;
