import { Dispatch, SetStateAction } from "react";
import { Uregentlevel, Categories } from "../lib/hardData";
import { posts } from "../redux/features/postsSlice";
import { useAppSelector } from "../redux/hooks";

interface AddTaskTypes {
  task: string;
  setTitle: Dispatch<SetStateAction<string>> | any;
  setUrgentLevel?: Dispatch<SetStateAction<string>> | any;
  setCategoryOption?: Dispatch<SetStateAction<string>> | any;
  setTask?: Dispatch<SetStateAction<string>> | any;
  addTask: () => void;
}

export default function AddTask({
  task,
  setTitle,
  setUrgentLevel,
  setCategoryOption,
  setTask,
  addTask,
}: AddTaskTypes) {
  const postsList = useAppSelector(posts);
  return (
    <div className="flex justify-center items-start">
      <div>
        <div className="pb-3">
          <input
            placeholder="Task Title"
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#1e1e1e] placeholder-[#716a60] rounded-xl mr-4 text-white"
          />
          <input
            placeholder="write your next task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="bg-[#1e1e1e] placeholder-[#716a60] rounded-xl text-white"
          />
        </div>

        <div className="flex justify-center">
          <select
            name="urgentlevel"
            id="urgentlevel"
            onClick={(event) => setUrgentLevel(event.currentTarget.value)}
            className="mr-4 rounded-full cursor-pointer"
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
            className="rounded-full cursor-pointer"
          >
            {Categories.map((category, i) => (
              <option value={category} key={i}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        aria-label="post todo"
        type="button"
        onClick={() => addTask()}
        className="bg-[#ff5531] px-5 py-[13px] rounded-full text-2xl font-extrabold ml-5"
      >
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
