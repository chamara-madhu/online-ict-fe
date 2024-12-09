import { useState } from "react";
import * as yup from "yup";
import FormInput from "../../shared/fields/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../../shared/buttons/Button";
import { toaster } from "evergreen-ui";
import authService from "../../../services/auth.service";

const loginMainSchema = yup.object().shape({
  name: yup.string().when("isLogin", {
    is: false,
    then: yup.string().required("Name is required"),
    otherwise: yup.string(),
  }),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  reTypePassword: yup.string().when("isLogin", {
    is: false,
    then: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Re-type password is required"),
    otherwise: yup.string(),
  }),
});

const LoginMain = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginMainSchema),
  });

  const { login, signUp } = authService();

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      if (isLogin) {
        await login(data.email, data.password);
        toaster.success("Login successful");
      } else {
        await signUp(data.name, data.email, data.password);
        toaster.success("Sign up successful");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "An unexpected error occurred. Please try again.";
      toaster.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="flex w-3/5 bg-gray-300">x</div>
      <div className="flex items-center justify-center w-2/5">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="flex flex-col gap-6 w-72">
            <h1>Online ICT</h1>
            {!isLogin && (
              <FormInput
                type="text"
                name="name"
                label="Name"
                register={register}
                placeholder="Eg. Chamara Madhushanka"
                errors={errors}
              />
            )}
            <FormInput
              type="email"
              name="email"
              label="Email"
              register={register}
              placeholder="Eg. example@example.com"
              errors={errors}
            />
            <FormInput
              type="password"
              name="password"
              label="Password"
              register={register}
              errors={errors}
            />
            {!isLogin && (
              <FormInput
                type="password"
                name="reTypePassword"
                label="Re-type password"
                register={register}
                errors={errors}
              />
            )}
            <Button
              className="w-full"
              label={isLogin ? "Login" : "Sign up"}
              type="submit"
              isLoading={loading}
            />
            <p className="text-sm text-center">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                className="text-purple-600 cursor-pointer hover:font-medium"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign up" : "Login"}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginMain;
