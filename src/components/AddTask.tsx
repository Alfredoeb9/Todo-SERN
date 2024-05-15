import { Dispatch, Key, SetStateAction } from "react";
import { Uregentlevel, Categories } from "../lib/hardData";
import { posts } from "../redux/features/postsSlice";
import { useAppSelector } from "../redux/hooks";
import { EditIcon } from "./svg/EditIcon";
import { DeleteIcon } from "./svg/DeleteIcon";
import { useRemovePost } from "../hooks/useRemovePost";
import { useTodoCompleted } from "../hooks/useTodoCompleted";

interface AddTaskTypes {
  task: string;
  setTitle: Dispatch<SetStateAction<string>> | any;
  setUrgentLevel?: Dispatch<SetStateAction<string>> | any;
  setCategoryOption?: Dispatch<SetStateAction<string>> | any;
  setTask?: Dispatch<SetStateAction<string>> | any;
  addTask: () => void;
  email: string;
}

interface ListTypes {
  id: number;
  category: string;
  post: string;
  urgentLevel: string;
  completed: boolean;
}

export default function AddTask({
  task,
  setTitle,
  setUrgentLevel,
  setCategoryOption,
  setTask,
  addTask,
  email,
}: AddTaskTypes) {
  const { completedTodo, error } = useTodoCompleted();
  const postsList = useAppSelector(posts);
  const { removePost } = useRemovePost();

  const handleRemoveTodo = async (list: ListTypes) => {
    const newList = { ...list, email };
    await removePost(newList);
  };

  const handleCompleteTodo = async (list: ListTypes) => {
    if (list.completed) return;
    const newList = { id: list?.id, email };
    await completedTodo(newList);
  };

  return (
    <div className="">
      <div className="flex justify-center items-start">
        <div className="pb-6">
          <div className="pb-3">
            <input
              placeholder="Task Title"
              maxLength={35}
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
          className="bg-[#ff5531] px-5 py-[12.5px] rounded-full text-2xl font-extrabold ml-5"
        >
          +
        </button>
      </div>

      {/* move this into separate component */}
      {postsList?.map((list: ListTypes, i: Key) => (
        <div
          className="flex gap-3 items-center justify-between max-w-sm m-auto rounded-full px-3 py-4 mb-3 text-white border-2	border-[#514c48] bg-[#1e1e1e]"
          key={i}
        >
          <div className="flex items-center gap-2">
            <div
              className={`border-2 border-[#db4a2d] h-3 w-3 rounded-full cursor-pointer ${
                list?.completed === false ? "bg-[#1e1e1e]" : "bg-green-500"
              }`}
              onClick={() => handleCompleteTodo(list)}
            />
            <div>{list?.category}</div>
            <div>{list?.post}</div>
            <div>{list?.urgentLevel}</div>
          </div>

          <div className="flex gap-2">
            <EditIcon
              className="cursor-pointer"
              // onClick={(e) => console.log()}
            />
            <DeleteIcon
              className="cursor-pointer"
              onClick={() => handleRemoveTodo(list)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
