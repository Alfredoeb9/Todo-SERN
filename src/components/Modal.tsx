import { Dispatch, ReactNode, SetStateAction } from "react";
import "../index.css";

interface ModalTypes {
  show: Dispatch<SetStateAction<string>> | any;
  children: ReactNode;
}

export default function Modal({ show, children }: ModalTypes) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className={`modal-main `}>{children}</section>
    </div>
  );
}
