import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/features/userSlice";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const login2 = async (email: string) => {
    setIsLoading(true);
    setError(undefined);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(email));
      dispatch(login(email));
      setIsLoading(false);
    }
  };

  return { login2, error, isLoading };
};
