import { createSlice } from "@reduxjs/toolkit";

// import mockColumns from "../../data/columns";
import IColumn from "../../interfaces/IColumn";
import IStatus from "../../interfaces/IStatus";

interface ColumnsSliceState {
  columns: IColumn[],
  updatedColumns: IColumn[] | undefined,
  selectedColumn: string | undefined,
}

const initialState: ColumnsSliceState = {
  // columns: mockColumns,
  columns: [],
  updatedColumns: undefined,
  selectedColumn: undefined
}

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setColumns: (state, action) => {
      // console.log('setColumns >>>', action.payload);
      state.columns = action.payload.columns;
      // state.columns = action.payload;
     },
    updateColumns: (state, action) => {
      // const cardId = action.payload
      const cardId = action.payload.newCard.id

      const column = state.columns.find(item => item.id === IStatus.PENDING_TASK)
  
      const columns = state.columns.filter(item => item.id !== IStatus.PENDING_TASK)

      if(column) {
        const updatedColumn = {
          ...column,
          cardsIds: [...column.cardsIds]//, cardId]
        }
        state.columns = [updatedColumn, ...columns]
        state.columns.map(item => {
          if (item.id === action.payload.newCard.status) item.cardsIds.push(cardId);
        })
      };
    },
    addCardtoColumn: (state, action) => {
      state.selectedColumn = action.payload;
    }
  },
})

export const { setColumns, updateColumns, addCardtoColumn } = columnsSlice.actions;

export default columnsSlice.reducer;