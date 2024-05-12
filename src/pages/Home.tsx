import { useCallback, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { post, posts } from "../redux/features/postsSlice";
import { Uregentlevel, Categories } from "../lib/hardData";
import AddTask from "../components/AddTask";
import { useSendPost } from "../hooks/useSendPost";
import TotalTasks from "../components/TotalTasks";

export default function Home() {
  const [task, setTask] = useState("");
  const [title, setTitle] = useState("");
  const [urgentLevel, setUrgentLevel] = useState("");
  const [categoryOption, setCategoryOption] = useState("");
  const { sendPost, error, isLoading } = useSendPost();
  const dispatch = useAppDispatch();
  const getEmail = JSON.parse(localStorage.getItem("user")!);

  const addTask = useCallback(() => {
    const taskStructure = {
      email: getEmail,
      priority: urgentLevel.length === 0 ? Uregentlevel[0] : urgentLevel,
      task,
      category: categoryOption.length === 0 ? Categories[0] : categoryOption,
      title,
    };
    sendPost(taskStructure);
    // dispatch(post(taskStructure));
    setTask("");
    setTitle("");
    setCategoryOption("");
    setUrgentLevel("");
  }, [categoryOption, task, urgentLevel]);

  return (
    <div className="max-w-screen-sm m-auto">
      <Helmet>
        <title>Todo | Home</title>
      </Helmet>

      <TotalTasks />

      <AddTask
        email={getEmail}
        task={task}
        setTitle={setTitle}
        setUrgentLevel={setUrgentLevel}
        setTask={setTask}
        setCategoryOption={setCategoryOption}
        addTask={addTask}
      />
    </div>
  );
}
