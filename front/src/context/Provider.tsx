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
interface UserDataContextType {
  userData: userDataType | null;
  setUserData: React.Dispatch<React.SetStateAction<userDataType | null>>;
}

interface Props {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextType>({
  auth: false,
  setAuth: () => {},
});
console.log("layout rerender");
const UserDataContext = createContext<UserDataContextType>({
  userData: { nickname: "", email: "" },
  setUserData: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};
export const useUserData = () => {
  return useContext(UserDataContext);
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
    <AuthContext.Provider value={{ auth, setAuth }}>
      <UserDataContext.Provider value={{ userData, setUserData }}>
        {children}
      </UserDataContext.Provider>
    </AuthContext.Provider>
  );
};
