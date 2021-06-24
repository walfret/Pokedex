import styles from "../styles/Modal.module.css";
import ClientOnlyPortal from "./ClientOnlyPortal";
import { ModalProps } from '../interfaces/ModalProps'

const Modal = (props: ModalProps) => {
  const showHideClassName = props.showModal
    ? `${styles.modal} ${styles.display_block}`
    : `${styles.modal} ${styles.display_none}`;
  return (
    <ClientOnlyPortal selector="#modal">
      <div className={showHideClassName}>
        <div className={styles.modal_main}>{props.children}</div>
      </div>
    </ClientOnlyPortal>
  );
};

export default Modal;