import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type UregentLevels = "not urgent" | "uregent" | "super urgent";

interface PostsDataState {
  id: number;
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
          id: action.payload[0].id,
          category: action.payload[0].category,
          post: action.payload[0].task,
          urgentLevel: action.payload[0].priority,
        },
      ];
    },

    removeTodo: (state, action: PayloadAction<number>) => {
      const newState = state.postList.filter(
        (post) => post.id !== action.payload
      );
      state.postList = newState;
    },
  },
});

export const { post, removeTodo } = postSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const posts = (state: RootState) => state?.posts?.postList;

export default postSlice;
