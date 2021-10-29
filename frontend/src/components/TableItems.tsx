import React from "react";
import { TodoItem } from "../shared/types/Todo";
import { Button, Column, DataGrid, FilterRow, Paging, Pager, RemoteOperations, } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';

interface TableItemsProps {
  todoList: TodoItem[],
  viewCompleted: boolean,
  editItem: (item: TodoItem) => void,
  handleDelete: (item: TodoItem) => void
}

const TableItems = (props: TableItemsProps) => {
  const { viewCompleted } = props;
  const displayMode = { text: 'Display Mode \'full\'', value: 'full' };

  // Function to see if a param exists or not. 
  // Unfortunately the value can be a number, boolean string, null or an array of varying types
  const isNotEmpty = (value: any) => {
    return value !== undefined && value !== null && value !== '';
  }
  
  const dataSource = new CustomStore({
    key: 'id',
    load: async (loadOptions: any) => {
      let params = '&';
      const paramsList = [
        'skip',
        'take',
        'requireTotalCount',
        'requireGroupCount',
        'sort',
        'filter',
        'totalSummary',
        'group',
        'groupSummary'
      ]

      // Grabs query params from loadOption and strings it together to send to the API
      paramsList.forEach((param: string) => {
        if (param in loadOptions && isNotEmpty(loadOptions[param])) {
          params += `${param}=${JSON.stringify(loadOptions[param])}&`;
        }
      });

      // This removes the trailing & from the string
      params = params.slice(0, -1);

      const response = await fetch(`/api/todos?completed=${viewCompleted}${params}`);
      const data = await response.json();

      return {
        data: data.results,
        totalCount: data.count,
      }
    }
  });

  return (
    <DataGrid
      dataSource={dataSource}
    >
      {/* RemoteOperations allows us to select a few operations to be dealt with on the server side */}
      <RemoteOperations
        filtering={true}
        paging={true}
        sorting={true}
      />
      {/* FilterRow displays the filter inputs in each column */}
      <FilterRow visible={true} />
      {/* Paging and Pager displays the paging components */}
      <Paging defaultPageSize={5} />
      <Pager
        visible={true}
        displayMode={displayMode}
        showPageSizeSelector={false}
        showInfo={true}
        showNavigationButtons={true} />
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
