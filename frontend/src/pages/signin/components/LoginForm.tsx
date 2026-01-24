import Input from "../../../components/Input";
import ButtonLink from "../../../components/ButtonLink";
import googleLogo from "../../../assets/google logo.svg";
import facebookLogo from "../../../assets/facebook logo.svg";
import { EyeOff, Eye, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { login } from "../../../lib/api";
import type { LoginFormData } from "../../../types/types";
export default function LoginForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };
    const [showPassword, setShowPassword] = useState(false)

    const { mutate, isPending } = useMutation({
        mutationFn: (data: LoginFormData) => login(data),
        onSuccess: () => {
            navigate("/home", {
                state: {
                    showSuccessToast: true,
                }
            });
        },
        onError: (error: any) => {
            toast.error(error.response?.data.error || "Something went wrong");
        },
    });


    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = {
            email: formData.email,
            password: formData.password,
        }
        mutate(data as LoginFormData)
    }
    return (
        <form className="w-full max-w-[643px]" onSubmit={handleLogin}>
            <div className="mb-4">
                <label htmlFor="email">Email</label>
                <Input type="email" id="email" value={formData.email}
                    onChange={handleChange} />
            </div>
            <div className="mb-8">
                <label
                    htmlFor="password"
                    className="flex justify-between mb-2 items-center"
                >
                    Password
                    <span className="flex gap-2 font-bold cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ?
                            <Eye />
                            : <EyeOff />}
                    </span>
                </label>
                <Input type={showPassword ? "text" : "password"} id="password" value={formData.password}
                    onChange={handleChange} />
            </div>

            <ButtonLink
                variant="solid"
                className="py-4 px-5 h-14 w-full flex justify-center"
                type="submit"
                children={isPending ? <LoaderCircle className="animate-spin " /> : "Log In"}
                disabled={isPending}
            />
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
    )
}