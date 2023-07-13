import {useQuery} from "@tanstack/react-query";
import {Todo} from "../types.ts";
import axios from "axios";

const useTodosRequest = () => useQuery({
  queryFn: () =>
    axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos').then(
      (res) => res.data,
    ),
  "queryKey": ['todos'],
})

export default useTodosRequest
