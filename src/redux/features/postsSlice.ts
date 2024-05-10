import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PostsState {
  post: string;
  postList: string[];
}

const initialState: PostsState = {
  post: "",
  postList: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    post: (state, action: PayloadAction<string>) => {
      state.post = action.payload;
      state.postList = [...state.postList, action.payload];
    },
  },
});

export const { post } = postSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const posts = (state: RootState) => state?.posts?.postList;

export default postSlice;
