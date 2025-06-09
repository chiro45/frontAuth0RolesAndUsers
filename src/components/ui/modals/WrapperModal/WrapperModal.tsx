import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./WrapperModal.module.css";

type Props = {
  children: ReactNode;
  width: number;
};

export const WrapperModal: FC<Props> = ({ children, width }) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className={styles.backdrop}>
      <div className={styles.containerModal} style={{ width: `${width}vw` }}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
