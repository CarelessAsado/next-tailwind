import { useUserContext } from "client/context/UserContext";
import { useCreateUserMutation, NewUserInput } from "client/generated/graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface InputField {
  name: keyof NewUserInput;
  type: string;
}

const LoginPage = () => {
  const { loginOrLogoutUser } = useUserContext();
  const [createUserMutation, { data, loading, error }] =
    useCreateUserMutation();

  const router = useRouter();

  console.log(router.query);

  const [registerData, setRegisterData] = useState<NewUserInput>({
    email: "",
    name: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await createUserMutation({
      variables: {
        newUserInput: registerData,
      },
      onError(error, clientOptions) {
        console.log(error);
      },
    });

    if (data?.createUser) {
      loginOrLogoutUser(data?.createUser);
      alert(data?.createUser);
    }
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
