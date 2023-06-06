import React, { useState } from "react";
import styles from "./UserCard.module.css";
import Card from "../Card/Card";
import { FaFeatherAlt } from "react-icons/fa";
import { AiOutlineDown } from "react-icons/ai";
import EditUserModal from "../../Modals/EditUserModal/EditUserModal";
import { useUserData } from "../../../context/Provider";
import { useMountTransition } from "../../../services/hooks/useMountTransition";
import {
  editEmailFields,
  editNicknameFields,
  editPasswordFields,
} from "../../../data/loginInputFields";
const UserCard = () => {
  const { userData } = useUserData();
  const [changedField, setchangedField] = useState("");
  const [visible, setVisible] = useState<boolean>(false);
  const [inputFields, setInputFields] = useState(editEmailFields);
  const [modal, setModal] = useState<boolean>(false);
  const hasTransitionedIn = useMountTransition(modal, 300);
  const [animation, setAnimation] = useState<boolean>(false);
  const handleVisible = (e: React.MouseEvent<HTMLButtonElement>) => {
    setVisible((prev) => !prev);
    setAnimation(true);
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
      <div className={styles.img__wrapper}>
        <img src="/img/user.jpg" alt="img" />
      </div>
      <div className={styles.user__info}>
        <div className={styles.user__info_line}>
          <div>Nickname:</div>
          <div
            className={`${styles.push_right} ${styles.right__text__container}`}
          >
            <p>{userData?.nickname}</p>
            <div className={styles.feather_container}>
              <FaFeatherAlt
                className={styles.feather}
                onClick={() => {
                  setchangedField("nickname");
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
              <div>Email:</div>
              <div
                className={`${styles.push_right} ${styles.right__text__container}`}
              >
                <p>{userData?.email}</p>
                <div className={styles.feather_container}>
                  <button
                    onClick={() => {
                      setchangedField("email");
                      setModal((prev) => !prev);
                      const setValue = editEmailFields.find(
                        (field) => field.name === "Email"
                      );
                      if (setValue)
                        setValue.defaultValue = userData?.email ?? "";
                      setInputFields(editEmailFields);
                      console.log(editEmailFields);
                    }}
                  >
                    <FaFeatherAlt className={styles.feather} />
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.user__info_last_line}>
              <p>Change password</p>
              <div
                className={`${styles.feather_container} ${styles.push_right}`}
              >
                <button
                  onClick={() => {
                    setchangedField("password");
                    setModal((prev) => !prev);
                    setInputFields(editPasswordFields);
                    console.log(editPasswordFields);
                  }}
                >
                  <FaFeatherAlt className={styles.feather} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
