import React, { useEffect, useState } from "react";
import CustomModal from "./components/Modal";
import TableItems from "./components/TableItems";
import TabList from "./components/TabList";
import axios from "axios";


const App = () => {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeItem, setActiveItem] = useState({
    title: "",
    description: "",
    completed: false,
  });

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await axios.get("/api/todos");
        setTodoList(response.data);
      } catch (err) {
        console.log(err)
      }
    };

    getList()
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = async (item) => {
    toggle();

    if (item.id) {
      const response = await axios.put(`/api/todos/${item.id}/`, item)
      const editedList = todoList.map(currItem => {
        if (currItem.id === response.data.id) {
          return response.data;
        }

        return currItem
      });

      setTodoList(editedList);

      return;
    }

    const response = await axios.post("/api/todos/", item)
    setTodoList(prevState => [...prevState, response.data])
  };

  const handleDelete = async (item) => {
    await axios.delete(`/api/todos/${item.id}/`)
    setTodoList(prevState => prevState.filter(currItem => currItem.id !== item.id))
  };

  const createItem = () => {
    const item = { title: "", description: "", completed: false };

    setModal(item);
    setModal(!modal);
  };

  const editItem = (item) => {
    setActiveItem(item);
    setModal(!modal)
  };

  const displayCompleted = (status) => {
    if (status) {
      return setViewCompleted(true)
    }

    return setViewCompleted(false)
  };

  return (
    <main className="container">
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
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
            <ul className="list-group list-group-flush border-top-0">
              <TableItems
                todoList={todoList}
                viewCompleted={viewCompleted}
                editItem={editItem}
                handleDelete={handleDelete}
              />
            </ul>
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