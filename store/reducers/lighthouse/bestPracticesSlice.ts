import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppState, AppThunk } from '../../index';
import { DEFAULT_BEST_PRACTICES_DATA } from 'types/defaultLighthouse';
import axios from 'axios';
import { BestPractices } from 'types/bestPractices';

export interface BestPracticesState {
  loading: boolean
  error: boolean
  data: BestPractices
}

const initialState: BestPracticesState = {
  loading: true,
  error: false,
  data: DEFAULT_BEST_PRACTICES_DATA
}

export const bestPracticesSlice = createSlice({
  name: 'bestPractices',
  initialState,
  reducers: {
    bestPracticesStart: (state) => {
      state.loading = true
      state.error = false;
      state.data = DEFAULT_BEST_PRACTICES_DATA
    },
    bestPracticesFail: (state, action: PayloadAction<BestPractices>) => {
      state.loading = false
      state.error = true;
      state.data = action.payload
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    bestPracticesSuccess: (state, action: PayloadAction<BestPractices>) => {
      state.loading = false
      state.error = false;
      state.data = action.payload
    },
  },
})

export const { bestPracticesStart, bestPracticesFail, bestPracticesSuccess } = bestPracticesSlice.actions

export const onFetchBestPracticesReport = (url: string, emulation?: string): AppThunk => (dispatch) => {
  dispatch(bestPracticesStart())
  axios.get(`/api/v1/generate_report/best_practices?url=${url}&emulation=${emulation}`)
    .then(res => {
      dispatch(bestPracticesSuccess(res.data))
    }).catch((error) => {
      dispatch(bestPracticesFail(error.response.data))
    })
};

export const loadBestPractices = (state: AppState) => state.bestPractices.loading;
export const bestPracticesError = (state: AppState) => state.bestPractices.error;
export const bestPracticesData = (state: AppState) => state.bestPractices.data;

export default bestPracticesSlice.reducer