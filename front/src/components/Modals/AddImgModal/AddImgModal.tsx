import React, { FC, useEffect, useState } from "react";
import styles from "./AddImgModal.module.css";
import Modal from "../Modal/Modal";
import BasicInput from "../../Inputs/BasicInput/BasicInput";
import BasicButton from "../../Buttons/BasicButton/BasicButton";
import usePost from "../../../services/hooks/usePost";
import useGetUser from "../../../services/hooks/useGetUser";
import { useTranslation } from "react-i18next";
interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  img: string;
}
const AddImgModal: FC<Props> = ({ visible, setVisible, img }) => {
  const { getRequest } = useGetUser();
  const { t } = useTranslation(["addImg"]);
  const [imageFile, setImageFile] = useState<null | Blob>(null);
  const [noImg, setNoImg] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
      setNoImg(false);
    }
  };
  const {
    error,
    message: answer,
    makePostRequest,
    resetPost,
  } = usePost(
    "http://localhost:84/expenditures/back/public/userController.php",
    "set_avatar",
    true
  );
  const saveImage = async () => {
    if (imageFile) {
      await makePostRequest(imageFile);
      await getRequest();
    } else setNoImg(true);
  };
  useEffect(() => {
    setImageFile(null);
    setNoImg(false);
    resetPost();
  }, [visible]);

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <div className={styles.modal__wrapper}>
        <div className={styles.input__file}>
          <BasicInput
            type="file"
            name="img"
            label={t("selectImg") as string}
            borderColor="pink"
            onChange={handleChange}
          />
        </div>

        <div className={styles.img__wrapper}>
          {imageFile ? (
            <img src={URL.createObjectURL(imageFile)} alt="img" />
          ) : (
            <img src={img} alt="img" />
          )}
        </div>
        <BasicButton
          text={t("setAvatar")}
          color="pink"
          handleClick={saveImage}
        />
        {error && <span>{error}</span>}
        {answer && <span>{answer}</span>}
        {noImg && <span>{t("message")}</span>}
      </div>
    </Modal>
  );
};

export default AddImgModal;
