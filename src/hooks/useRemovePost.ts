import { useAppDispatch } from "../redux/hooks";
import { removeTodo } from "../redux/features/postsSlice";
import { useMutation } from "@tanstack/react-query";

interface TodoType {
  id: number;
  email: string;
}
export const useRemovePost = () => {
  const dispatch = useAppDispatch();

  // Queries
  const mutation = useMutation({
    mutationFn: async (todoObject: TodoType) => {
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

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const json = await response.json();

      if (response.ok) {
        return json;
      }
    },
    onSuccess(data, variables, context) {
      dispatch(removeTodo(variables.id));
    },
  });

  return mutation;
};
