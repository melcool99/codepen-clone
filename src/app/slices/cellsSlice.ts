import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cell, CellTypes, Direction } from '../interfaces/cell'

interface MoveCellAction {
  id: string
  direction: Direction
}

interface DeleteCellAction {
  id: string
}

interface InsertCellAfterAction {
  id: string | null
  type: CellTypes
}

interface UpdateCellAction {
  id: string
  content: string
}

interface CellState {
  loading: boolean
  error: string | null
  order: string[]
  data: {
    [key: string]: Cell
  }
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
}

const cellsSlice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    updateCell: (state, action: PayloadAction<UpdateCellAction>) => {
      state.data[action.payload.id].content = action.payload.content
    },
    deleteCell: (state, action: PayloadAction<DeleteCellAction>) => {
      delete state.data[action.payload.id]
      state.order = state.order.filter((id) => id !== action.payload.id)
    },
    moveCell: (state, action: PayloadAction<MoveCellAction>) => {
      const { direction } = action.payload
      const index = state.order.findIndex((id) => id === action.payload.id)
      const targetIndex = direction === 'up' ? index - 1 : index + 1
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return
      }
      state.order[index] = state.order[targetIndex]
      state.order[targetIndex] = action.payload.id
    },
    insertCellAfter: (
      state,
      action: PayloadAction<InsertCellAfterAction>
    ) => {
      const randomId = () => {
        return Math.random().toString(36).substr(2, 5)
      }
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId(),
      }

      state.data[cell.id] = cell
      const index = state.order.findIndex((id) => id === action.payload.id)

      if (index < 0) {
        state.order.unshift(cell.id)
      } else {
        state.order.splice(index +1, 0, cell.id)
      }
    },
  },
})


export const {updateCell, deleteCell, moveCell, insertCellAfter} = cellsSlice.actions
export default cellsSlice.reducer
