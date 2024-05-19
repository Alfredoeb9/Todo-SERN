import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import Modal from "../Modal";

interface LoginTypes {
  user: string;
}

export default function LoginModal({ user }: LoginTypes) {
  const { login2, error } = useLogin();
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (user.length <= 0 || user === undefined) {
      setShow(true);
    }
  }, [user]);

  return (
    <>
      {user.length === 0 && (
        <Modal show={show}>
          <div className="px-2 max-w-96 m-auto text-center">
            <h1 className="font-bold text-xl sm:text-2xl">MY TODO APP</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                login2(email);
              }}
              className="py-3"
            >
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
    </>
  );
}
