import React, { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, store } from "../../redux/store";
import { login } from "../../redux/features/userSlice";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  const userEmail = JSON.parse(localStorage.getItem("user")!);
  if (!storeRef.current) {
    storeRef.current = store;

    if (userEmail) storeRef.current.dispatch(login(userEmail));
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
