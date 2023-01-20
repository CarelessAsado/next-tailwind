import { useUserContext } from "client/context/UserContext";
import { LoginInput, useLoginUserMutation } from "client/generated/graphql";
import { FRONTEND_ROUTER } from "constants/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface InputField {
  name: keyof LoginInput;
  type: string;
}

const LoginPage = () => {
  const { loginOrLogoutUser } = useUserContext();
  const [loginUserMutation, { data, loading, error }] = useLoginUserMutation();

  const router = useRouter();

  console.log(router.query);

  const [loginData, setLoginData] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await loginUserMutation({
      variables: {
        loginInput: loginData,
      },
      onError(error, clientOptions) {
        alert(error.message);
      },
    });

    if (data?.loginUser) {
      const { user, accessToken } = data?.loginUser;
      loginOrLogoutUser(user);

      // set the headers for subsequent requests

      router.push(FRONTEND_ROUTER.HOME);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
  };

  const inputFields: InputField[] = [
    { name: "email", type: "email" },
    { name: "password", type: "password" },
  ];

  return (
    <div>
      <Link href={FRONTEND_ROUTER.HOME}>BACK HOME</Link>
      <form onSubmit={handleLogin}>
        {inputFields.map(({ name, type }) => (
          <div key={name}>
            <label>
              {name}:
              <input
                type={type}
                name={name}
                value={loginData[name]}
                onChange={handleChange}
              />
            </label>
          </div>
        ))}
        <button type="submit">Login</button>
      </form>
      <Link href={FRONTEND_ROUTER.REGISTER}>Register</Link>
    </div>
  );
};

export default LoginPage;
