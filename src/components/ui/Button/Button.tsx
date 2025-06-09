import { FC } from "react";
import styles from './Button.module.css'
type Props = {
  text: string;
  onClickFn: Function;
};

export const Button: FC<Props> = ({ text, onClickFn }) => {
  return (
    <button className={styles.buttonCustom}
      onClick={() => {
        onClickFn();
      }}
    >
      {text}
    </button>
  );
};
