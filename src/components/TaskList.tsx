import { useAppSelector } from "../redux/hooks";
import { posts } from "../redux/features/postsSlice";
import { Key } from "react";
import { useTodoCompleted } from "../hooks/useTodoCompleted";
import { EditIcon } from "./svg/EditIcon";
import { DeleteIcon } from "./svg/DeleteIcon";
import { useRemovePost } from "../hooks/useRemovePost";

interface ListTypes {
  id: number;
  category: string;
  post: string;
  urgentLevel: string;
  completed: boolean;
}

interface UserTypes {
  email: string;
}

export default function TaskList({ email }: UserTypes) {
  const postsList = useAppSelector(posts);
  const completeMutate = useTodoCompleted();
  const mutate = useRemovePost();

  const handleCompleteTodo = async (list: ListTypes) => {
    if (list.completed) return;
    const newList = { id: list.id, email };
    completeMutate.mutate(newList);
  };

  const handleRemoveTodo = async (list: ListTypes) => {
    const newList = { ...list, email };
    mutate.mutate(newList);
  };

  return (
    <div>
      {postsList?.map((list: ListTypes, i: Key) => (
        <div key={i}>
          <div className="flex gap-3 items-center justify-between max-w-sm m-auto rounded-full px-3 py-4 mb-3 text-white border-2	border-[#514c48] bg-[#1e1e1e]">
            <div className="flex items-center gap-2">
              <div
                className={`border-2  ${
                  list?.completed === false
                    ? "border-[#db4a2d]"
                    : "border-green-500"
                } h-3 w-3 rounded-full cursor-pointer ${
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
          {mutate.isError && mutate.variables.id === list.id ? (
            <p className="text-red-500 font-semibold max-w-sm m-auto">
              Failed to remove Todo
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
