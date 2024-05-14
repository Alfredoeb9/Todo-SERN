import { Dispatch, ReactNode, SetStateAction } from "react";
import "../index.css";

interface ModalTypes {
  handleClose: () => void;
  show: Dispatch<SetStateAction<string>> | any;
  children?: ReactNode;
}

export default function Modal({ handleClose, show, children }: ModalTypes) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className={`modal-main `}>{children}</section>
    </div>
  );
}
