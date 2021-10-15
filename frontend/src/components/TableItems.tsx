import React from "react";
import { TodoItem } from "../shared/types/Todo";
interface TableItemsProps {
  todoList: TodoItem[],
  viewCompleted: boolean,
  editItem: (item: TodoItem) => void,
  handleDelete: (item: TodoItem) => void
}

const TableItems = (props: TableItemsProps) => {
  const { viewCompleted } = props;
  const newItems = props.todoList.filter(
    (item: TodoItem) => item.completed === viewCompleted
  );

  return newItems.map((item) => (
    <li
      key={item.id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <span
        className={`todo-title mr-2 ${props.viewCompleted ? "completed-todo" : ""
          }`}
        title={item.description}
      >
        {item.title}
      </span>
      <span>
        <button
          className="btn btn-secondary mr-2"
          onClick={() => props.editItem(item)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => props.handleDelete(item)}
        >
          Delete
        </button>
      </span>
    </li>
  ));
};

export default TableItems;
