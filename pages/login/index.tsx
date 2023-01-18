import { useUserContext } from "client/context/UserContext";
import { useCreateUserMutation, NewUserInput } from "client/generated/graphql";
import Link from "next/link";
import React, { useState } from "react";

interface InputField {
  name: keyof NewUserInput;
  type: string;
}

const LoginPage = () => {
  const [createUserMutation, { data, loading, error }] =
    useCreateUserMutation();

  type mapIt = keyof NewUserInput;

  const [registerData, setRegisterData] = useState<NewUserInput>({
    email: "",
    name: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { loginOrLogoutUser } = useUserContext();
    const { data } = await createUserMutation({
      variables: {
        newUserInput: registerData,
      },
    });

    data?.createUser && loginOrLogoutUser(data?.createUser);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterData((prevState) => ({ ...prevState, [name]: value }));
  };

  const inputFields: InputField[] = [
    { name: "email", type: "email" },
    { name: "name", type: "text" },
    { name: "password", type: "password" },
  ];

  return (
    <div>
      <Link href={"/"}>BACK HOME</Link>
      <form onSubmit={handleLogin}>
        {inputFields.map(({ name, type }) => (
          <div key={name}>
            <label>
              {name}:
              <input
                type={type}
                name={name}
                value={registerData[name]}
                onChange={handleChange}
              />
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
