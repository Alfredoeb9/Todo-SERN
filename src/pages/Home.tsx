import { useCallback, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { post, posts } from "../redux/features/postsSlice";
import { Uregentlevel, Categories } from "../lib/hardData";
import AddTask from "../components/AddTask";

export default function Home() {
  const [task, setTask] = useState("");
  const [urgentLevel, setUrgentLevel] = useState("");
  const [categoryOption, setCategoryOption] = useState("");
  const dispatch = useAppDispatch();

  const addTask = useCallback(() => {
    const taskStructure = {
      urgentLevel: urgentLevel.length === 0 ? Uregentlevel[0] : urgentLevel,
      post: task,
      category: categoryOption.length === 0 ? Categories[0] : categoryOption,
    };

    dispatch(post(taskStructure));
    setTask("");
  }, [categoryOption, task, urgentLevel]);

  return (
    <>
      <Helmet>
        <title>Todo | Home</title>
      </Helmet>

      <AddTask
        task={task}
        setUrgentLevel={setUrgentLevel}
        setTask={setTask}
        setCategoryOption={setCategoryOption}
        addTask={addTask}
      />
    </>
  );
}
