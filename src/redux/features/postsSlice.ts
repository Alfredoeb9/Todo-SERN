import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type UregentLevels = "not urgent" | "uregent" | "super urgent";

interface PostsDataState {
  category: string;
  post: string;
  urgentLevel: UregentLevels;
}

interface PostsState {
  post: string;
  postList: PostsDataState[];
}

const initialState: PostsState = {
  post: "",
  postList: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    post: (state, action: PayloadAction<any>) => {
      state.postList = [
        ...state.postList,
        {
          category: action.payload.category,
          post: action.payload.post,
          urgentLevel: action.payload.urgentLevel,
        },
      ];
    },

    removePost: (state, action) => {},
  },
});

export const { post } = postSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const posts = (state: RootState) => state?.posts?.postList;

export default postSlice;
