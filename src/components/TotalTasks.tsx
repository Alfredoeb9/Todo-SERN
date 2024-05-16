import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";

export default function TotalTasks() {
  const todos = useAppSelector((state) => state.post.postList);
  const [completedCounter, setCompletedCounter] = useState<number>(0);

  useEffect(() => {
    todos.map((todo) => {
      if (todo.completed) {
        setCompletedCounter(completedCounter + 1);
      }
    });
  }, [todos]);

  return (
    <div className="flex justify-center items-center py-9 gap-3 mb-6 max-w-sm m-auto text-white border-2	border-[#514c48] bg-[#1e1e1e]">
      <div>
        <h2 className="text-3xl">Todo Done</h2>
        <p className="text-xl">Keep it up</p>
      </div>

      <div className="">
        <h2 className="text-3xl">
          {completedCounter}/{todos.length}
        </h2>
      </div>
    </div>
  );
}
