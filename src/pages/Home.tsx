import { useCallback, useState } from "react";
import { Uregentlevel, Categories } from "../lib/hardData";
import AddTask from "../components/AddTask";
import { useSendPost } from "../hooks/useSendPost";
import TotalTasks from "../components/TotalTasks";
import TaskList from "../components/TaskList";

export default function Home() {
  const [task, setTask] = useState("");
  const [title, setTitle] = useState("");
  const [urgentLevel, setUrgentLevel] = useState("");
  const [categoryOption, setCategoryOption] = useState("");
  const mutate = useSendPost();
  const getEmail = JSON.parse(localStorage.getItem("user")!);

  const addTask = useCallback(() => {
    const taskStructure = {
      email: getEmail,
      priority: urgentLevel.length === 0 ? Uregentlevel[0] : urgentLevel,
      task,
      category: categoryOption.length === 0 ? Categories[0] : categoryOption,
      title,
      completed: false,
    };
    mutate.mutate(taskStructure);
    setTask("");
    setTitle("");
    setCategoryOption("");
    setUrgentLevel("");
  }, [categoryOption, getEmail, mutate, task, title, urgentLevel]);

  return (
    <div className="max-w-screen-sm m-auto">
      <TotalTasks />

      <AddTask
        task={task}
        setTitle={setTitle}
        title={title}
        setUrgentLevel={setUrgentLevel}
        setTask={setTask}
        setCategoryOption={setCategoryOption}
        addTask={addTask}
      />

      <TaskList email={getEmail} />

      {mutate.isError && (
        <div className="text-red-500 font-semibold">An error occurred</div>
      )}
    </div>
  );
}
