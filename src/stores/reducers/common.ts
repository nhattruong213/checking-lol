import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TCommonProps = {
  champions: Record<string, string> | null;
  version: string | null;
  loadingChampion: boolean;
};
const initialState: TCommonProps = {
  champions: null,
  version: '14.22.1',
  loadingChampion: false,
};

const commonSlice = createSlice({
  name: 'champions',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<TCommonProps>) => {
      state.version = action.payload.version;
      state.champions = action.payload.champions;
      state.loadingChampion = false;
    },
    resetData: (state) => {
      state.champions = null;
      state.loadingChampion = true;
    },
    removeData: (state) => {
      state.champions = null;
      state.loadingChampion = true;
    },
  },
});

export const commonReducer = commonSlice.reducer;
export const commonAction = commonSlice.actions;
