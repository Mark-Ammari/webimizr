import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Lighthouse } from 'types/lighthouse';
import type { AppState, AppThunk } from '../../index';
import DEFAULT_LIGHTHOUSE_DATA from 'types/defaultLighthouse';

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
  axios.get(`/api/v1/generate_report?url=${url}&emulation=${emulation}`, { headers: {
    'Cache-Control': 'max-age=604800'
  }})
    .then(res => {
      dispatch(lighthouseSuccess(res.data))
    }).catch(err => {
      dispatch(lighthouseFail(err.response.data))
    })
};

export const loadLighthouse = (state: AppState) => state.lighthouse.loading
export const lighthouseError = (state: AppState) => state.lighthouse.error
export const lighthouseData = (state: AppState) => state.lighthouse.data

export default lighthouseSlice.reducer