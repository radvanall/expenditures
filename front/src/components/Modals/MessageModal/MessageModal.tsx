import React, { FC, ReactNode } from "react";
import BasicButton from "../../Buttons/BasicButton/BasicButton";
import Modal from "../Modal/Modal";
import styles from "./MessageModal.module.css";
interface Props {
  visible: boolean;
  handleOk: () => void;
  cancelButton?: boolean;
  handleCancel?: () => void;
  setVisible:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((val: boolean) => void);
  children?: ReactNode;
}
const MessageModal: FC<Props> = ({
  visible,
  setVisible,
  handleOk,
  handleCancel,
  cancelButton,
  children,
}) => {
  const handleOkButton = () => {
    setVisible(false);
    handleOk();
  };
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <div className={styles.message__modal}>
        {children}
        <div className={styles.buttons__wrapper}>
          <BasicButton text="Ok" handleClick={handleOkButton} />
          {cancelButton && (
            <BasicButton
              text="Cancel"
              handleClick={() => {
                setVisible(false);
                handleCancel && handleCancel();
              }}
              color="pink"
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MessageModal;
