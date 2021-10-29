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
import DatePicker from "react-datepicker";
import { TodoItem } from "../shared/types/Todo";
import { Priority } from "../shared/enums/priority";
import { format, parseISO} from 'date-fns'

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
  const parsedDate = format(parseISO(activeItem.due_date), "MM-dd-yyyy");

  // Function to handle the title, description, and completed fields
  const handleChange = (e: any) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    setActiveItem(prevState => ({ ...prevState, [name]: value }));
  };

  // Function to handle any dropdown field changes
  const handleDropdownChange = (e: any) => {
    const choice = e.target.dataset.choice;
    setActiveItem(prevState => ({ ...prevState, priority: choice }));
  }

  // Function to handle any datepicker changes
  const handleDateChange = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    setActiveItem(prevState => ({ ...prevState, due_date: formattedDate }))
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
                <DropdownItem onClick={handleDropdownChange} data-choice={Priority.Low}>Low</DropdownItem>
                <DropdownItem onClick={handleDropdownChange} data-choice={Priority.Mid}>Mid</DropdownItem>
                <DropdownItem onClick={handleDropdownChange} data-choice={Priority.High}>High</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </FormGroup>
          <FormGroup>
            <DatePicker selected={new Date(parsedDate)} onChange={handleDateChange} />
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
