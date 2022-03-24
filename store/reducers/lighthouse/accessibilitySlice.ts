import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppState, AppThunk } from '../../index';
import { DEFAULT_ACCESSIBILITY_DATA } from 'types/defaultLighthouse';
import axios from 'axios';
import { Accessibility } from 'types/accessibility';

export interface AccessibilityState {
  loading: boolean
  error: boolean
  data: Accessibility
}

const initialState: AccessibilityState = {
  loading: true,
  error: false,
  data: DEFAULT_ACCESSIBILITY_DATA
}

export const accessibilitySlice = createSlice({
  name: 'accessibility',
  initialState,
  reducers: {
    accessibilityStart: (state) => {
      state.loading = true
      state.error = false;
      state.data = DEFAULT_ACCESSIBILITY_DATA
    },
    accessibilityFail: (state, action: PayloadAction<Accessibility>) => {
      state.loading = false
      state.error = true;
      state.data = action.payload
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    accessibilitySuccess: (state, action: PayloadAction<Accessibility>) => {
      state.loading = false
      state.error = false;
      state.data = action.payload
    },
  },
})

export const { accessibilityStart, accessibilityFail, accessibilitySuccess } = accessibilitySlice.actions

export const onFetchAccessibilityReport = (url: string, emulation?: string): AppThunk => (dispatch) => {
  dispatch(accessibilityStart())
  axios.get(`/api/v1/generate_report/accessibility?url=${url}&emulation=${emulation}`)
    .then(res => {
      dispatch(accessibilitySuccess(res.data))
    }).catch((error) => {
      dispatch(accessibilityFail(error.response.data))
    })
};

export const loadAccessibility = (state: AppState) => state.accessibility.loading;
export const accessibilityError = (state: AppState) => state.accessibility.error;
export const accessibilityData = (state: AppState) => state.accessibility.data;

export default accessibilitySlice.reducer