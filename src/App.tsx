import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./App.css";
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
          <input
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <button
            type="button"
            onClick={() => login2(email)}
            // disabled={isLoading}
          >
            login
          </button>

          <p>{error !== undefined && error}</p>
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
