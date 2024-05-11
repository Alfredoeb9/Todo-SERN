import { Dispatch, SetStateAction } from "react";
import { Uregentlevel, Categories } from "../lib/hardData";
import { posts } from "../redux/features/postsSlice";
import { useAppSelector } from "../redux/hooks";

interface AddTaskTypes {
  task: string;
  setUrgentLevel?: Dispatch<SetStateAction<string>> | any;
  setCategoryOption?: Dispatch<SetStateAction<string>> | any;
  setTask?: Dispatch<SetStateAction<string>> | any;
  addTask: () => void;
}

export default function AddTask({
  task,
  setUrgentLevel,
  setCategoryOption,
  setTask,
  addTask,
}: AddTaskTypes) {
  const postsList = useAppSelector(posts);
  return (
    <div>
      <input
        placeholder="write your next task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <select
        name="urgentlevel"
        id="urgentlevel"
        onClick={(event) => setUrgentLevel(event.currentTarget.value)}
      >
        {Uregentlevel.map((level, i) => (
          <option value={level} key={i}>
            {level}
          </option>
        ))}
      </select>

      <select
        name="category"
        id="category"
        onClick={(event) => setCategoryOption(event.currentTarget.value)}
        defaultValue={Categories[0]}
      >
        {Categories.map((category, i) => (
          <option value={category} key={i}>
            {category}
          </option>
        ))}
      </select>
      <button aria-label="post todo" type="button" onClick={() => addTask()}>
        +
      </button>

      {postsList?.map((list, i) => (
        <div className="flex gap-3" key={i}>
          <div>{list.post}</div>
          <div>{list.category}</div>
          <div>{list.urgentLevel}</div>
        </div>
      ))}
    </div>
  );
}
