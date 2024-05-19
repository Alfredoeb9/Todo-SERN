import { ReactNode } from "react";
import "../index.css";

interface ModalTypes {
  show: boolean;
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
