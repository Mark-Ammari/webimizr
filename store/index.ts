import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import lighthouseReducer from './reducers/lighthouse/lighthouseSlice'


export const makeStore = () => {
  return configureStore({
    reducer: {
      lighthouse: lighthouseReducer,
    }
  })
}
const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store;