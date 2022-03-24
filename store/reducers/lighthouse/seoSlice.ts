import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppState, AppThunk } from '../../index';
import { DEFAULT_SEO_DATA } from 'types/defaultLighthouse';
import axios from 'axios';
import { Seo } from 'types/seo';

export interface SEOState {
  loading: boolean
  error: boolean
  data: Seo
}

const initialState: SEOState = {
  loading: true,
  error: false,
  data: DEFAULT_SEO_DATA
}

export const seoSlice = createSlice({
  name: 'seo',
  initialState,
  reducers: {
    seoStart: (state) => {
      state.loading = true
      state.error = false;
      state.data = DEFAULT_SEO_DATA
    },
    seoFail: (state, action: PayloadAction<Seo>) => {
      state.loading = false
      state.error = true;
      state.data = action.payload
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    seoSuccess: (state, action: PayloadAction<Seo>) => {
      state.loading = false
      state.error = false;
      state.data = action.payload
    },
  },
})

export const { seoStart, seoFail, seoSuccess } = seoSlice.actions

export const onFetchSEOReport = (url: string, emulation?: string): AppThunk => (dispatch) => {
  dispatch(seoStart())
  axios.get(`/api/v1/generate_report/seo?url=${url}&emulation=${emulation}`)
    .then(res => {
      dispatch(seoSuccess(res.data))
    }).catch((error) => {
      dispatch(seoFail(error.response.data))
    })
};

export const loadSEO = (state: AppState) => state.seo.loading;
export const seoError = (state: AppState) => state.seo.error;
export const seoData = (state: AppState) => state.seo.data;

export default seoSlice.reducer