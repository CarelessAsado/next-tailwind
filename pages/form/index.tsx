import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";

const Form = ({ serverData }: { serverData: { name: string } }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  console.log(serverData.name, 999);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // submit the form here
    alert(JSON.stringify(formState));

    //switch to axios
    const resp = await fetch("/api/hello", {
      body: JSON.stringify(formState),
      method: "POST",
    });

    const value = await resp.json();
    console.log(value, 777);
  };

  const [data, setData] = useState(null);

  /*   useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/hello");
      const data = await res.json();
      setData(data);
      console.log(data);
    }
    fetchData();
  }, []); */

  return (
    <form className="w-full max-w-sm " onSubmit={handleSubmit}>
      <Link href={"/"}>HOME</Link>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-full-name"
          >
            Full Name
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            placeholder="Jane Doe"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-email"
          >
            Email
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-email"
            type="email"
            placeholder="jane@example.com"
            onChange={handleInputChange}
            value={formState.email}
            name="email"
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-password"
          >
            Password
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-password"
            type="password"
            placeholder="******************"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button>Enviar</button>
    </form>
  );
};

//get API call logic directly into getServerSideProps, as recommended by Next docs
export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000" + "/api/hello");
  const data = await res.json();

  //this occurs in the backend
  /* console.log(data, 777, "back"); */

  return { props: { serverData: data } };
}
export default Form;
