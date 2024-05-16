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
  completedTodos: number;
}

const initialState: PostsState = {
  post: "",
  postList: [],
  completedTodos: 0,
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
      const newState = state.postList.filter((post) => {
        if (post.id === action.payload) {
          if (post.completed) {
            state.completedTodos -= 1;
          }
        }
        return post.id !== action.payload;
      });
      state.postList = newState;
    },

    updateTodo: (state, action: PayloadAction<any>) => {
      const newState = state.postList.map((todo, i) => {
        if (todo.id === action.payload.id) {
          todo.completed = true;
        }
        return todo;
      });
      state.postList = newState;
      state.completedTodos += 1;
    },

    increment: (state) => {
      state.completedTodos += 1;
    },

    decrement: (state) => {
      state.completedTodos -= 1;
    },
  },
});

export const { post, removeTodo, updateTodo, increment, decrement } =
  postSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const posts = (state: RootState) => state?.post?.postList;

export default postSlice;
