import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TRunnes } from '@/types/runnes';

type TRunnesProps = {
  runnes: TRunnes[] | null;
};
const initialState: TRunnesProps = {
  runnes: null,
};

const runnesSlice = createSlice({
  name: 'runnes',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<TRunnesProps>) => {
      state.runnes = action.payload.runnes;
    },
    resetData: (state) => {
      state.runnes = null;
    },
    removeData: (state) => {
      state.runnes = null;
    },
  },
});

export const runnesReducer = runnesSlice.reducer;
export const runnesAction = runnesSlice.actions;
