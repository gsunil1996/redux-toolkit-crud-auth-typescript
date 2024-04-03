export type EditTodoProps = {
  id: number;
  name: string;
};

export type TodoState = {
  todos: { id: number; name: string }[];
};
