import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { updateTodo } from "../redux/features/postsSlice";

interface TodosType {
  id: number;
  email: string;
}

export const useTodoCompleted = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const completedTodo = async (todoObject: TodosType) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/todo/complete`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${todoObject.email}`,
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
        console.log("json", json);
        dispatch(updateTodo(json.data));
        setIsLoading(false);
        return json;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == "Failed to fetch") {
          setIsLoading(false);
          return setError("There seems to be a problem please be patient");
        } else {
          throw new Error(error.message);
        }
      }
    }
  };

  return { completedTodo, error, isLoading };
};
