import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PostsDataState {
  id: number;
  category: string;
  post: string;
  urgentLevel: "not urgent" | "uregent" | "super urgent";
  completed: boolean;
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
          id: action.payload.id,
          category: action.payload.title,
          post: action.payload.task,
          urgentLevel: action.payload.priority,
          completed: action.payload.completed,
        },
      ];
    },

    removeTodo: (state, action: PayloadAction<number>) => {
      const newState = state.postList.filter(
        (post) => post.id !== action.payload
      );
      state.postList = newState;
    },

    updateTodo: (state, action: PayloadAction<any>) => {
      const newState = state.postList.map((todo, i) => {
        if (todo.id === action.payload.id) {
          todo.completed = action.payload.completed;
        }
        return todo;
      });
      state.postList = newState;
    },
  },
});

export const { post, removeTodo, updateTodo } = postSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const posts = (state: RootState) => state?.post?.postList;

export default postSlice;
