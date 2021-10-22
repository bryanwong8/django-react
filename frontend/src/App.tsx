import React, { useState } from "react";
import CustomModal from "./components/Modal";
import TableItems from "./components/TableItems";
import TabList from "./components/TabList";
import { TodoItem } from "./shared/types/Todo";
import { formatDate } from "./shared/utils/dates";
import axios from "axios";
import Cookies from 'js-cookie';
import "react-datepicker/dist/react-datepicker.css";
import 'devextreme/dist/css/dx.light.css';

const App = () => {
  const csrftoken = Cookies.get('csrftoken');
  const [viewCompleted, setViewCompleted] = useState<boolean>(false);
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<TodoItem>({
    title: "",
    description: "",
    completed: false,
    priority: "LOW",
    due_date: formatDate(new Date())
  });

  const toggle = () => {
    setModal(!modal);
  };

  // Function to save/edit Todo items
  const handleSubmit = async (item: TodoItem) => {
    toggle();

    if (item.id) {
      const response = await axios.put(`/api/todos/${item.id}/`, item, { headers: { 'X-CSRFToken': csrftoken } })
      const editedList = todoList.map(currItem => {
        if (currItem.id === response.data.id) {
          return response.data;
        }

        return currItem;
      });

      setTodoList(editedList);

      return;
    }

    const response = await axios.post("/api/todos/", item, { headers: { 'X-CSRFToken': csrftoken } })
    setTodoList(prevState => [...prevState, response.data])
  };

  // Function to delete a Todo item
  const handleDelete = async (item: TodoItem) => {
    await axios.delete(`/api/todos/${item.id}/`, { headers: { 'X-CSRFToken': csrftoken } })
    setTodoList(prevState => prevState.filter(currItem => currItem.id !== item.id))
  };

  // Function to open an empty modal and creates and empty Todo item to fill it out
  const createItem = () => {
    const item = { title: "", description: "", completed: false, priority: "LOW", due_date: formatDate(new Date()) };

    setActiveItem(item);
    setModal(!modal);
  };

  // Function to open a modal with the selected Todo item
  const editItem = (item: TodoItem) => {
    setActiveItem(item);
    setModal(!modal)
  };

  // Function to display completed and uncompleted Todo items
  const displayCompleted = (status: boolean) => {
    if (status) {
      return setViewCompleted(true)
    }

    return setViewCompleted(false)
  };

  return (
    <main className="container">
      <h1 className="text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <button
                className="btn btn-primary"
                onClick={createItem}
              >
                Add task
              </button>
            </div>
            <TabList
              viewCompleted={viewCompleted}
              displayCompleted={displayCompleted}
            />
            <TableItems
              todoList={todoList}
              viewCompleted={viewCompleted}
              editItem={editItem}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
      {modal ? (
        <CustomModal
          activeItem={activeItem}
          toggle={toggle}
          onSave={handleSubmit}
        />
      ) : null}
    </main>
  )
}

export default App;