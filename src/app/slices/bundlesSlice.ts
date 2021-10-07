import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BundlesState {
  [key: string]:
    | {
        loading: boolean
        code: string
        err: string
      }
    
}

interface BundleStartAction {
  cellId: string
}

interface BundleCompleteAction {
  cellId: string
  bundle: {
    code: string
    err: string
  }
}

const initialState: BundlesState = {}

const bundlesSlice = createSlice({
  name: 'bundles',
  initialState,
  reducers: {
    bundleStart: (state, action: PayloadAction<BundleStartAction>) => {
      state[action.payload.cellId] = {
        loading: true,
        code: '',
        err: '',
      }
    },
    bundleComplete: (state, action: PayloadAction<BundleCompleteAction>) => {
      state[action.payload.cellId] = {
        loading: false,
        code: action.payload.bundle.code,
        err: action.payload.bundle.err,
      }
    },
  },
})


export const { bundleStart, bundleComplete } = bundlesSlice.actions
export default bundlesSlice.reducer
