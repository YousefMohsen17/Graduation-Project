import Input from "../../../components/Input";
import ButtonLink from "../../../components/ButtonLink";
import { EyeOff, Eye, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { login } from "../../../lib/api";
import type { LoginFormData } from "../../../types/types";
import { useSocialAuth } from "@/hooks/useSocialAuth";
export default function LoginForm() {
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithFacebook } = useSocialAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const [showPassword, setShowPassword] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: LoginFormData) => login(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], data.user || data);
      navigate("/home", {
        replace: true,
        state: {
          showSuccessToast: true,
        },
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message || "Something  went wrong");
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      email: formData.email,
      password: formData.password,
    };
    mutate(data as LoginFormData);
  }
  return (
    <form className="w-full max-w-[643px]" onSubmit={handleLogin}>
      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          value={formData.email}
          error={isError ? "Invalid email" : ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-8">
        <label
          htmlFor="password"
          className="flex justify-between mb-2 items-center"
        >
          Password
          <span
            className="flex gap-2 font-bold cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </span>
        </label>
        <Input
          type={showPassword ? "text" : "password"}
          id="password"
          value={formData.password}
          error={isError ? "Invalid Password" : ""}
          onChange={handleChange}
        />
      </div>

      <ButtonLink
        variant="solid"
        className="py-4 px-5 h-14 w-full flex justify-center"
        type="submit"
        children={
          isPending ? <LoaderCircle className="animate-spin " /> : "Log In"
        }
        disabled={isPending}
      />

      <div className="flex flex-col gap-3 mt-5">
        <button
          type="button"
          onClick={loginWithGoogle}
          className="flex items-center justify-center gap-3 w-full h-14 bg-linear-to-t from-[#0A0E29] to-[#1E2A7B] text-[#EAEDFA] hover:from-[#141C52] hover:to-[#5B6CD7] border border-gray-300 rounded-lg font-medium  "
        >
          {/* Google SVG Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          Continue with Google
        </button>

      </div>

      <h4 className="text-xl mt-[60px] mb-8 font-bold text-center">
        {" "}
        Don't have an account?
      </h4>
      <ButtonLink
        to="/sign-up"
        variant="solid"
        className="py-4 px-5 h-14 w-full flex justify-center"
        children="Sign Up"
      />
    </form>
  );
}
