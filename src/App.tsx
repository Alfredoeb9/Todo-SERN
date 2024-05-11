import React, { useEffect, useState } from "react";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useAppSelector } from "./redux/hooks";
import Modal from "./components/Modal";
import { useLogin } from "./hooks/useLogin";

const helmetContext = {};

function App() {
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");
  const user = useAppSelector((state) => state.user.email);

  const { login2, error, isLoading } = useLogin();

  useEffect(() => {
    if (user.length === 0 || user === undefined) {
      setShow(true);
    }
  }, [user]);

  // function showModal() {
  //   setShow(true);
  // }

  function hideModal() {
    setShow(false);
  }
  return (
    <HelmetProvider context={helmetContext}>
      {user.length == 0 && (
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
      <Navbar />
      <Home />
    </HelmetProvider>
  );
}

export default App;
