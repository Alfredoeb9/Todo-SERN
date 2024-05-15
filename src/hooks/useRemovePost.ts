import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { removeTodo } from "../redux/features/postsSlice";

interface TodoType {
  id: number;
  email: string;
}
export const useRemovePost = () => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const removePost = async (todoObject: TodoType) => {
    setIsLoading(true);
    setError(undefined);

    try {
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
        dispatch(removeTodo(todoObject.id));
        setIsLoading(false);

        return "Todo has been removed";
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

  return { removePost, error, isLoading };
};
