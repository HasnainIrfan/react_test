import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AuthContext } from "../authContext";
import Input from "../components/input";
import { GlobalContext } from "../globalContext";
import MkdSDK from "../utils/MkdSDK";

const AdminLoginPage = () => {
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const { dispatch: patch } = React.useContext(GlobalContext);

  const { dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let sdk = new MkdSDK();
    try {
      const res = await sdk.login(data.email, data.password, "admin");

      if (!res.error) {
        localStorage.setItem("role", JSON.stringify(res.role));

        dispatch({
          type: "LOGIN",
          payload: {
            user: res.user_id,
            token: res.token,
            role: res.role,
          },
        });

        navigate("/admin/dashboard");

        patch({
          type: "SNACKBAR",
          payload: { message: "LOGIN SUCCESSFUL" },
        });
      }
    } catch (e) {
      console.log(e);
    }
    reset();
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8 "
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            label="email"
            register={register}
            name="Email"
            check={{
              required: "Email is Required",
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            }}
            type="text"
            placeholder="Your Email"
            errors={errors}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <Input
            placeholder="password"
            label="password"
            name="Password"
            type="password"
            check={{
              required: "Password is Required",
            }}
            errors={errors}
            register={register}
          />
        </div>
        <div className="flex items-center justify-between">
          <input
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            value="Sign In"
          />
        </div>
      </form>
    </div>
  );
};

export default AdminLoginPage;
