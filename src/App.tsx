import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import Modal from "./components/Modal";
import { useLogin } from "./hooks/useLogin";
import { post } from "./redux/features/postsSlice";

const helmetContext = {};

function App() {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");
  const user = useAppSelector((state) => state.user.email);

  const { login2, error } = useLogin();

  // Queries
  useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/todo/posts`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const json = await response.json();

      if (response.ok) {
        json.data.map((d: any) => {
          if (user) {
            return dispatch(post(d));
          }
          return undefined;
        });
        return json.data;
      }
    },
    enabled: user.length > 0 ?? true,
  });

  useEffect(() => {
    if (user.length === 0 || user === undefined) {
      setShow(true);
    }
  }, [user]);

  function hideModal() {
    setShow(false);
  }

  return (
    <HelmetProvider context={helmetContext}>
      {user.length === 0 && (
        <Modal show={show} handleClose={hideModal}>
          <div className="px-2 max-w-96 m-auto text-center">
            <h1 className="font-bold text-xl sm:text-2xl">MY TODO APP</h1>
            <form onSubmit={() => login2(email)} className="py-3">
              <input
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.currentTarget.value)}
                className="block m-auto focus:outline-none border-b-2 bg-transparent border-black"
              />
              <button
                type="button"
                className="border-2 border-black px-8 py-1 round mt-4 hover:scale-105 transition-all font-bold"
                // disabled={isLoading}
                onClick={() => login2(email)}
              >
                LOGIN
              </button>

              <p className="text-red-600 text-md pt-2">
                {error !== undefined && error}
              </p>
            </form>
          </div>
        </Modal>
      )}
      <div className="container m-auto">
        <Navbar />
        <Home />
      </div>
    </HelmetProvider>
  );
}

export default App;
