import React from "react";
import { TodoItem } from "../shared/types/Todo";
import { Button, Column, DataGrid, SearchPanel } from 'devextreme-react/data-grid';

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

  return (
    <DataGrid
      dataSource={newItems}
    >
      <SearchPanel visible={true} />
      <Column
        dataField="title"
        caption="Title"
        dataType="string"
        alignment="left"
      />
      <Column
        dataField="description"
        caption="Description"
        dataType="string"
        alignment="left"
      />
      <Column
        dataField="completed"
        caption="Completed"
        dataType="string"
        alignment="left"
      />
      <Column
        dataField="priority"
        caption="Priority"
        dataType="string"
        alignment="left"
      />
      <Column
        dataField="due_date"
        caption="Due Date"
        dataType="string"
        alignment="left"
      />
      {/* Adding any to event so I can move on and not stay too long to create a type for it */}
      <Column type="buttons">
        <Button
          text="Edit"
          onClick={(e: any) => props.editItem(e.row.data)}
        />
        <Button
          text="Delete"
          onClick={(e: any) => props.handleDelete(e.row.data)}
        />
      </Column>

    </DataGrid>
  )
}

export default TableItems;
