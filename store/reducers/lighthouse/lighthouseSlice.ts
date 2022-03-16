import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Lighthouse } from 'types/lighthouse';
import type { AppState, AppThunk } from '../../index';
import DEFAULT_LIGHTHOUSE_DATA from 'types/defaultLighthouse';
import baseURL from 'URL/URL';
import axios from 'axios';

export interface LighthouseState {
  loading: boolean
  error: boolean
  data: Lighthouse
}

const initialState: LighthouseState = {
  loading: true,
  error: false,
  data: DEFAULT_LIGHTHOUSE_DATA
}

export const lighthouseSlice = createSlice({
  name: 'lighthouse',
  initialState,
  reducers: {
    lighthouseStart: (state) => {
      state.loading = true
      state.error = false;
      state.data = DEFAULT_LIGHTHOUSE_DATA
    },
    lighthouseFail: (state, action: PayloadAction<Lighthouse>) => {
      state.loading = false
      state.error = true;
      state.data = action.payload
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    lighthouseSuccess: (state, action: PayloadAction<Lighthouse>) => {
      state.loading = false
      state.error = false;
      state.data = action.payload
    },
  },
})

export const { lighthouseStart, lighthouseFail, lighthouseSuccess } = lighthouseSlice.actions

export const onFetchLighthouseReport = (url: string, emulation?: string): AppThunk => (dispatch) => {
  dispatch(lighthouseStart())
  axios.get(`/api/v1/generate_report?url=${url}&emulation=${emulation}`)
    .then(res => {
      dispatch(lighthouseSuccess(res.data))
    }).catch((error) => {
      dispatch(lighthouseFail(error.response.data))
    })
};

export const loadLighthouse = (state: AppState) => state.lighthouse.loading
export const lighthouseError = (state: AppState) => state.lighthouse.error
export const lighthouseData = (state: AppState) => state.lighthouse.data

export default lighthouseSlice.reducer