import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { post } from "../redux/features/postsSlice";

interface TodosType {
  title: string;
  task: string;
  priority: string;
  category: string;
}

export const useSendPost = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const sendPost = async (postObject: TodosType) => {
    setIsLoading(true);
    setError(undefined);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/todo/submit`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postObject),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      dispatch(post(json.todo));
      setIsLoading(false);
    }
  };

  return { sendPost, error, isLoading };
};
