import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppState, AppThunk } from '../../index';
import { DEFAULT_PERFORMANCE_DATA } from 'types/defaultLighthouse';
import axios from 'axios';
import { Performance } from 'types/performance';

export interface PerformanceState {
  loading: boolean
  error: boolean
  data: Performance
}

const initialState: PerformanceState = {
  loading: true,
  error: false,
  data: DEFAULT_PERFORMANCE_DATA
}

export const performanceSlice = createSlice({
  name: 'performance',
  initialState,
  reducers: {
    performanceStart: (state) => {
      state.loading = true
      state.error = false;
      state.data = DEFAULT_PERFORMANCE_DATA
    },
    performanceFail: (state, action: PayloadAction<Performance>) => {
      state.loading = false
      state.error = true;
      state.data = action.payload
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    performanceSuccess: (state, action: PayloadAction<Performance>) => {
      state.loading = false
      state.error = false;
      state.data = action.payload
    },
  },
})

export const { performanceStart, performanceFail, performanceSuccess } = performanceSlice.actions

export const onFetchPerformanceReport = (url: string, emulation?: string): AppThunk => (dispatch) => {
  dispatch(performanceStart())
  axios.get(`/api/v1/generate_report/performance?url=${url}&emulation=${emulation}`)
    .then(res => {
      dispatch(performanceSuccess(res.data))
    }).catch((error) => {
      dispatch(performanceFail(error.response.data))
    })
};

export const loadPerformance = (state: AppState) => state.performance.loading;
export const performanceError = (state: AppState) => state.performance.error;
export const performanceData = (state: AppState) => state.performance.data;

export default performanceSlice.reducer