import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TLayoutType = {
  type: 'private' | 'public';
};

const initialState: TLayoutType = {
  type: 'public',
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayout: (state, action: PayloadAction<TLayoutType>) => {
      state.type = action.payload.type;
    },
  },
});

export const layoutReducer = layoutSlice.reducer;
export const layoutAction = layoutSlice.actions;
