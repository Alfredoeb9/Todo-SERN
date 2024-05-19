import { Dispatch, SetStateAction } from "react";
import { Uregentlevel, Categories } from "../lib/hardData";

interface AddTaskTypes {
  task: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setUrgentLevel: Dispatch<SetStateAction<string>>;
  setCategoryOption: Dispatch<SetStateAction<string>>;
  setTask: Dispatch<SetStateAction<string>>;
  addTask: () => void;
  title: string;
}

export default function AddTask({
  task,
  setTitle,
  setUrgentLevel,
  setCategoryOption,
  setTask,
  addTask,
  title,
}: AddTaskTypes) {
  return (
    <div>
      <div className="flex justify-center items-start">
        <div className="pb-6">
          <div className="pb-3">
            <input
              placeholder="Task Title"
              maxLength={35}
              onChange={(e) => setTitle(e.currentTarget.value)}
              value={title}
              className="bg-[#1e1e1e] placeholder-[#716a60] rounded-xl mr-4 text-white"
            />
            <input
              placeholder="write your next task"
              value={task}
              onChange={(e) => setTask(e.currentTarget.value)}
              className="bg-[#1e1e1e] placeholder-[#716a60] rounded-xl text-white"
            />
          </div>

          <div className="flex justify-center">
            <select
              name="urgentlevel"
              id="urgentlevel"
              onClick={(e) => setUrgentLevel(e.currentTarget.value)}
              className="mr-4 rounded-full cursor-pointer font-semibold"
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
              className="rounded-full cursor-pointer p-1 font-semibold"
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
          className={`bg-[#ff5531] px-5 py-[12.5px] rounded-full text-2xl font-extrabold ml-5`}
        >
          +
        </button>
      </div>
    </div>
  );
}
