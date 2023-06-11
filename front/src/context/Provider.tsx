import {
  useState,
  useContext,
  createContext,
  useEffect,
  ReactNode,
  FC,
} from "react";

type userDataType = {
  nickname: string;
  email: string;
};
interface AuthContextType {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ModalContextType {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  deleteMessage: string | null;
  setDeleteMessage: React.Dispatch<React.SetStateAction<string | null>>;
}
interface UserDataContextType {
  userData: userDataType | null;
  setUserData: React.Dispatch<React.SetStateAction<userDataType | null>>;
}

interface themeI {
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextType>({
  auth: false,
  setAuth: () => {},
});
const ModalContext = createContext<ModalContextType>({
  visible: false,
  setVisible: () => {},
  deleteMessage: "",
  setDeleteMessage: () => {},
});
console.log("layout rerender");
const UserDataContext = createContext<UserDataContextType>({
  userData: { nickname: "", email: "" },
  setUserData: () => {},
});
const ThemeContext = createContext<themeI>({
  theme: false,
  setTheme: () => {},
});
export const useAuth = () => {
  return useContext(AuthContext);
};
export const useUserData = () => {
  return useContext(UserDataContext);
};
export const useModal = () => {
  return useContext(ModalContext);
};
export const useTheme = () => {
  return useContext(ThemeContext);
};
const setInitialUserData = (): userDataType | null => {
  const userData = window.localStorage.getItem("userData");
  if (userData) {
    return JSON.parse(userData);
  } else return null;
};
const setInitialState = (): boolean => {
  const isAuth = window.localStorage.getItem("isAuth");
  return isAuth === "true" ? true : false;
};

export const Provider: FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState(setInitialState);
  const [userData, setUserData] = useState(setInitialUserData);
  const [theme, setTheme] = useState(false);

  const [visible, setVisible] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);
  useEffect(() => {
    if (!visible) setDeleteMessage(null);
  }, [visible]);
  useEffect(() => {
    userData
      ? window.localStorage.setItem("userData", JSON.stringify(userData))
      : window.localStorage.removeItem("userData");
  }, [userData]);
  useEffect(() => {
    auth
      ? window.localStorage.setItem("isAuth", "true")
      : window.localStorage.removeItem("isAuth");
  }, [auth]);
  return (
    <ModalContext.Provider
      value={{
        visible,
        setVisible,
        deleteMessage,
        setDeleteMessage,
      }}
    >
      <AuthContext.Provider value={{ auth, setAuth }}>
        <UserDataContext.Provider value={{ userData, setUserData }}>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
          </ThemeContext.Provider>
        </UserDataContext.Provider>
      </AuthContext.Provider>
    </ModalContext.Provider>
  );
};
