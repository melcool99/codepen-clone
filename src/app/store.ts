import {configureStore} from '@reduxjs/toolkit'
import cellsSlice from './slices/cellsSlice'
import bundlesSlice from './slices/bundlesSlice'
import { insertCellAfter } from './slices/cellsSlice'

export const store = configureStore({
  reducer:{cells:cellsSlice, bundles: bundlesSlice},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

store.dispatch(insertCellAfter({id:null, type:'code'}))
store.dispatch(insertCellAfter({id:null, type:'text'}))
