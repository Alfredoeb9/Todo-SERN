import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";

interface TodoType {
  id: number;
  email: string;
}
export const useRemovePost = () => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const removePost = async (todoObject: TodoType) => {
    console.log("tod", todoObject);
    setIsLoading(true);
    setError(undefined);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/todo/remove`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoObject),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // dispatch()
      setIsLoading(false);
    }
  };

  return { removePost, error, isLoading };
};
