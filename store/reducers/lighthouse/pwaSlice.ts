import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppState, AppThunk } from '../../index';
import { DEFAULT_PWA_DATA } from 'types/defaultLighthouse';
import axios from 'axios';
import { PWA } from 'types/pwa';

export interface PWAState {
  loading: boolean
  error: boolean
  data: PWA
}

const initialState: PWAState = {
  loading: true,
  error: false,
  data: DEFAULT_PWA_DATA
}

export const pwaSlice = createSlice({
  name: 'pwa',
  initialState,
  reducers: {
    pwaStart: (state) => {
      state.loading = true
      state.error = false;
      state.data = DEFAULT_PWA_DATA
    },
    pwaFail: (state, action: PayloadAction<PWA>) => {
      state.loading = false
      state.error = true;
      state.data = action.payload
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    pwaSuccess: (state, action: PayloadAction<PWA>) => {
      state.loading = false
      state.error = false;
      state.data = action.payload
    },
  },
})

export const { pwaStart, pwaFail, pwaSuccess } = pwaSlice.actions

export const onFetchPWAReport = (url: string, emulation?: string): AppThunk => (dispatch) => {
  dispatch(pwaStart())
  axios.get(`/api/v1/generate_report/pwa?url=${url}&emulation=${emulation}`)
    .then(res => {
      dispatch(pwaSuccess(res.data))
    }).catch((error) => {
      dispatch(pwaFail(error.response.data))
    })
};

export const loadPWA = (state: AppState) => state.pwa.loading;
export const pwaError = (state: AppState) => state.pwa.error;
export const pwaData = (state: AppState) => state.pwa.data;

export default pwaSlice.reducer