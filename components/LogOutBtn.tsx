import { useUserContext } from "client/context/UserContext";
import { useLogoutMutation } from "client/generated/graphql";
import { removeTokenLStorage } from "client/utils/localStorage";
import React from "react";

const LogOutBtn = () => {
  const { loginOrLogoutUser } = useUserContext();
  const [logoutMutation, { data, loading, error }] = useLogoutMutation();
  async function handleLogout() {
    try {
      const { data } = await logoutMutation();
      alert("data: " + data?.logoutUser);
      loginOrLogoutUser();
      removeTokenLStorage();
    } catch (error: any) {
      console.log(JSON.stringify(error));
      alert(error.message);
    }
  }
  return (
    <button className="bg-red-500 text-white p-1" onClick={handleLogout}>
      LogOutBtn
    </button>
  );
};

export default LogOutBtn;
