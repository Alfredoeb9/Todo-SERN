import { useAppSelector } from "../redux/hooks";

export default function TotalTasks() {
  const todos = useAppSelector((state) => state.post.postList);
  const completedTodos = useAppSelector((state) => state.post.completedTodos);

  return (
    <div className="flex justify-center items-center py-9 gap-3 mb-6 max-w-sm m-auto text-white border-2	border-[#514c48] bg-[#1e1e1e]">
      <div>
        <h2 className="text-3xl">Todo Done</h2>
        <p className="text-xl">Keep it up</p>
      </div>

      <div className="">
        <h2 className="text-3xl">
          {completedTodos}/{todos.length}
        </h2>
      </div>
    </div>
  );
}
