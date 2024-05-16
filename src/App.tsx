import { useQuery } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { increment, post } from "./redux/features/postsSlice";
import LoginModal from "./components/Login/LoginModal";

const helmetContext = {};

function App() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.email);

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
            if (d.completed) {
              dispatch(increment());
            }
            return dispatch(post(d));
          }
          return undefined;
        });
        return json.data;
      }
    },
    enabled: user.length > 0 ?? true,
  });

  return (
    <HelmetProvider context={helmetContext}>
      <LoginModal user={user} />

      <div className="container m-auto">
        <Navbar />
        <Home />
      </div>
    </HelmetProvider>
  );
}

export default App;
