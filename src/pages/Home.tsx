import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { post, posts } from "../redux/features/postsSlice";

export default function Home() {
  const [task, setTask] = useState("");
  const dispatch = useAppDispatch();
  const postsList = useAppSelector(posts);

  function addTask() {
    dispatch(post(task));
    setTask("");
  }

  return (
    <>
      <Helmet>
        <title>Todo | Home</title>
      </Helmet>

      <div>
        <input
          placeholder="write your next task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button aria-label="post todo" type="button" onClick={() => addTask()}>
          +
        </button>

        {postsList?.map((post: string) => (
          <>
            <h2 className="text-blue-400">{post}</h2>
          </>
        ))}
      </div>
    </>
  );
}
