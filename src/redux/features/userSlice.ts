import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
}

const initialState: UserState = {
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice;
