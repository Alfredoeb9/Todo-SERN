import { useAppDispatch } from "../redux/hooks";
import { post } from "../redux/features/postsSlice";
import { useMutation } from "@tanstack/react-query";

interface TodosType {
  title: string;
  task: string;
  priority: string;
  category: string;
}

export const useSendPost = () => {
  const dispatch = useAppDispatch();

  // Queries
  const mutation = useMutation({
    mutationFn: async (postObject: TodosType) => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/todo/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postObject),
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
      dispatch(post(data.todo[0]));
    },
  });

  return mutation;
  // const [error, setError] = useState<undefined | string>(undefined);
  // const [isLoading, setIsLoading] = useState(false);

  // const sendPost = async (postObject: TodosType) => {
  //   setIsLoading(true);
  //   setError(undefined);

  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_API_URL}/todo/submit`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(postObject),
  //       }
  //     );

  //     const json = await response.json();

  //     if (!response.ok) {
  //       setIsLoading(false);
  //       setError(json.error);
  //     }

  //     if (response.ok) {
  //       dispatch(post(json.todo[0]));
  //       setIsLoading(false);
  //       return json.todo[0];
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       if (error.message == "Failed to fetch") {
  //         setIsLoading(false);
  //         return setError("There seems to be a problem please be patient");
  //       } else {
  //         throw new Error(error.message);
  //       }
  //     }
  //   }
  // };

  // return { sendPost, error, isLoading };
};
