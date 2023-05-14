import React, { useState } from "react";
import styles from "./UserCard.module.css";
import Card from "../Card/Card";
import { FaFeatherAlt } from "react-icons/fa";
import { AiOutlineDown } from "react-icons/ai";
import EditUserModal from "../../Modals/EditUserModal/EditUserModal";
import { useUserData } from "../../../context/Provider";
import { useMountTransition } from "../../../services/hooks/useMountTransition";
// import { InputType } from "../../../Interfaces/InputType";
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
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget);
  };
  const handleVisible = (e: React.MouseEvent<HTMLButtonElement>) => {
    setVisible((prev) => !prev);
    setAnimation(true);
  };
  // editNicknameFields[0].value = "flsdkfjk";
  // editNicknameFields.push({ id: 3, name: "Enter password", type: "password" });
  // console.log(editNicknameFields);
  // console.log("render");
  // console.log(editNicknameFields);

  return (
    <div>
      <Card>
        {(modal || hasTransitionedIn) && (
          <EditUserModal
            inputFields={inputFields}
            visible={modal && hasTransitionedIn}
            setVisible={setModal}
            changedField={changedField}
            // value={selectedUserField}
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
                    // setSelectedUserField({
                    //   name: "nickname",
                    //   value: userData?.nickname ?? "",
                    // });
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
                      // const setValue = editPasswordFields.find(
                      //   (field) => field.name === "email"
                      // );
                      // if (setValue) setValue.value = userData?.email ?? "";
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
    </div>
  );
};

export default UserCard;
