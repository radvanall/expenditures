import React, { useEffect, useState } from "react";
import styles from "./UserCard.module.css";
import Card from "../Card/Card";
import { FaFeatherAlt } from "react-icons/fa";
import { AiOutlineDown } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import EditUserModal from "../../Modals/EditUserModal/EditUserModal";
import DeleteUserModal from "../../Modals/DeleteUserModal/DeleteUserModal";
import { useUserData } from "../../../context/Provider";
import { useMountTransition } from "../../../services/hooks/useMountTransition";
import {
  editEmailFields,
  editNicknameFields,
  editPasswordFields,
} from "../../../data/loginInputFields";
import { useTranslation } from "react-i18next";
import BasicButton from "../../Buttons/BasicButton/BasicButton";
import AddImgModal from "../../Modals/AddImgModal/AddImgModal";
const UserCard = () => {
  const { t } = useTranslation(["userCard"]);
  const { userData } = useUserData();
  const [changedField, setchangedField] = useState("");
  const [visible, setVisible] = useState<boolean>(false);
  const [inputFields, setInputFields] = useState(editEmailFields);
  const [modal, setModal] = useState<boolean>(false);
  const hasTransitionedIn = useMountTransition(modal, 300);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const hasDeleteModalTransitionedIn = useMountTransition(deleteModal, 300);
  const [animation, setAnimation] = useState<boolean>(false);
  const [imgModal, setImgModal] = useState<boolean>(false);
  const handleVisible = (e: React.MouseEvent<HTMLButtonElement>) => {
    setVisible((prev) => !prev);
    setAnimation(true);
  };
  useEffect(() => {
    editEmailFields[0].label = t("email");
    editEmailFields[1].label = t("enterPassword");
    editNicknameFields[0].label = t("nickname");
    editNicknameFields[1].label = t("enterPassword");
    editPasswordFields[0].label = t("oldPassword");
    editPasswordFields[1].label = t("newPassword");
    editPasswordFields[2].label = t("confirmNewPass");
  }, [t]);
  const handleImgSelect = () => {
    console.log("img click");
    setImgModal(true);
  };
  return (
    <Card>
      {(modal || hasTransitionedIn) && (
        <EditUserModal
          inputFields={inputFields}
          visible={modal && hasTransitionedIn}
          setVisible={setModal}
          changedField={changedField}
        />
      )}
      {(deleteModal || hasDeleteModalTransitionedIn) && (
        <DeleteUserModal
          visible={deleteModal && hasDeleteModalTransitionedIn}
          setVisible={setDeleteModal}
        />
      )}
      <AddImgModal
        visible={imgModal}
        setVisible={setImgModal}
        img="/img/user.jpg"
      />

      <div className={styles.img__wrapper}>
        <img src="/img/user.jpg" alt="img" />
        <BsDownload className={styles.img_change} onClick={handleImgSelect} />
      </div>
      <div className={styles.user__info}>
        <div className={styles.user__info_line}>
          <div>{`${t("nickname")}:`}</div>
          <div
            className={`${styles.push_right} ${styles.right__text__container}`}
          >
            <p>{userData?.nickname}</p>
            <div className={styles.feather_container}>
              <FaFeatherAlt
                className={styles.feather}
                onClick={() => {
                  // setchangedField("nickname");
                  setchangedField(t("changeNickname") as string);
                  setModal((prev) => !prev);
                  const setValue = editNicknameFields.find(
                    (field) => field.name === "Nickname"
                  );
                  if (setValue)
                    setValue.defaultValue = userData?.nickname ?? "";
                  setInputFields(editNicknameFields);

                  console.log(editNicknameFields);
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.aditional_info_wrapper}>
          <button
            className={
              visible
                ? `${styles.show} ${styles.active}`
                : animation
                ? `${styles.show} ${styles.inactive}`
                : styles.show
            }
            onClick={handleVisible}
          >
            <AiOutlineDown className={styles.down__circle} />
          </button>
          <div
            className={
              visible
                ? `${styles.aditional_info} ${styles.active}`
                : styles.aditional_info
            }
          >
            <div className={styles.user__info_line}>
              <div>{`${t("email")}:`}</div>
              <div
                className={`${styles.push_right} ${styles.right__text__container}`}
              >
                <p>{userData?.email}</p>
                <div className={styles.feather_container}>
                  <button
                    onClick={() => {
                      // setchangedField("email");
                      setchangedField(t("changeEmail") as string);
                      setModal((prev) => !prev);
                      const setValue = editEmailFields.find(
                        (field) => field.name === "Email"
                      );
                      if (setValue)
                        setValue.defaultValue = userData?.email ?? "";
                      setInputFields(editEmailFields);
                      console.log(editEmailFields);
                    }}
                    className={styles.button_feather}
                  >
                    <FaFeatherAlt className={styles.feather} />
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.user__info_last_line}>
              <p>{`${t("changePassword")}`}</p>
              <div
                className={`${styles.feather_container} ${styles.push_right}`}
              >
                <button
                  onClick={() => {
                    // setchangedField("password");
                    setchangedField(t("changePassword") as string);
                    setModal((prev) => !prev);
                    setInputFields(editPasswordFields);
                    console.log(editPasswordFields);
                  }}
                  className={styles.button_feather}
                >
                  <FaFeatherAlt className={styles.feather} />
                </button>
              </div>
            </div>
            <div
              className={`${styles.user__info_last_line} ${styles.delete_wrapper}`}
            >
              <BasicButton
                text={t("deleteAccount")}
                handleClick={() => {
                  setDeleteModal((prev) => !prev);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
