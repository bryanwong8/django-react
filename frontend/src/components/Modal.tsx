import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { TodoItem } from "../shared/types/Todo";
import DatePicker from "react-datepicker";
import { formatDate, stringToDate } from "../shared/utils/dates";

interface ModalProps {
  activeItem: TodoItem,
  toggle: (modal: any) => void,
  onSave: (item: TodoItem) => void,
}

const CustomModal = (props: ModalProps) => {
  const [activeItem, setActiveItem] = useState<TodoItem>(props.activeItem);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const dropdownToggle = () => setDropdown(prevState => !prevState);
  const { toggle, onSave } = props;

  const handleChange = (e: any) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    setActiveItem(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDropdownChange = (choice: string) => {
    setActiveItem(prevState => ({ ...prevState, priority: choice.toUpperCase() }))
  }

  const handleDateChange = (date: Date) => {
    setActiveItem(prevState => ({ ...prevState, due_date: formatDate(date) }))
  }

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="todo-title">Title</Label>
            <Input
              type="text"
              id="todo-title"
              name="title"
              value={activeItem.title}
              onChange={handleChange}
              placeholder="Enter Todo Title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="todo-description">Description</Label>
            <Input
              type="text"
              id="todo-description"
              name="description"
              value={activeItem.description}
              onChange={handleChange}
              placeholder="Enter Todo description"
            />
          </FormGroup>
          <FormGroup>
            <Dropdown isOpen={dropdown} toggle={dropdownToggle}>
              <DropdownToggle caret>
                {activeItem.priority}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => handleDropdownChange("Low")}>Low</DropdownItem>
                <DropdownItem onClick={() => handleDropdownChange("Mid")}>Mid</DropdownItem>
                <DropdownItem onClick={() => handleDropdownChange("High")}>High</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </FormGroup>
          <FormGroup>
            <DatePicker selected={stringToDate(activeItem.due_date)} onChange={(date: Date) => handleDateChange(date)} />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="completed"
                checked={activeItem.completed}
                onChange={handleChange}
              />
              Completed
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="success"
          onClick={() => onSave(activeItem)}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;
