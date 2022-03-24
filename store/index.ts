import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import performanceReducer from './reducers/lighthouse/performanceSlice';
import seoReducer from './reducers/lighthouse/seoSlice';
import bestPracticesReducer from './reducers/lighthouse/bestPracticesSlice';
import pwaReducer from './reducers/lighthouse/pwaSlice';
import accessibilityReducer from './reducers/lighthouse/accessibilitySlice';


export const makeStore = () => {
  return configureStore({
    reducer: {
      performance: performanceReducer,
      seo: seoReducer,
      bestPractices: bestPracticesReducer,
      pwa: pwaReducer,
      accessibility: accessibilityReducer
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