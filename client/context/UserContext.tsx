import { User } from "client/generated/graphql";
import React, { useState, useContext } from "react";

export type UserWithoutPwd = Omit<User, "password" | "admin">;
const UserContext = React.createContext({} as UserContextValue);

interface UserContextValue {
  user: UserWithoutPwd | null;
  loginOrLogoutUser: (user: UserContextValue["user"]) => void;
}

export const useUserContext = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserContextValue["user"]>(null);

  function loginOrLogoutUser(user: UserContextValue["user"] = null) {
    setUser(user);
  }

  return (
    <UserContext.Provider value={{ user, loginOrLogoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
