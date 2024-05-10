import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { post, posts } from "../redux/features/postsSlice";

export default function Home() {
  const [task, setTask] = useState("");
  const [urgentLevel, setUrgentLevel] = useState("");
  const dispatch = useAppDispatch();
  const postsList = useAppSelector(posts);

  function addTask() {
    const taskStructure = {
      urgentLevel,
      post: task,
      category: "",
    };

    dispatch(post(taskStructure));
    setTask("");
  }

  const Uregentlevel = ["not urgent", "uregent", "super uregent"];

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
        <select
          name="category"
          id="category"
          onClick={(event) => setUrgentLevel(event.currentTarget.value)}
        >
          {Uregentlevel.map((level, i) => (
            <option value={level} key={i}>
              {level}
            </option>
          ))}
        </select>
        <button aria-label="post todo" type="button" onClick={() => addTask()}>
          +
        </button>

        {postsList?.map((list) => (
          <div className="flex gap-3">
            <div>{list.post}</div>
            <div>{list.category}</div>
            <div>{list.urgentLevel}</div>
          </div>
        ))}
      </div>
    </>
  );
}
