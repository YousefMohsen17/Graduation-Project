import Input from "../../../components/Input";
import ButtonLink from "../../../components/ButtonLink";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../../../lib/api.tsx";
import { useState } from "react";
import type { SignupFormData } from "../../../types/types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { validatePassword } from "../../../lib/validators.tsx";
export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    academicYear: 0,
    universityId: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    academicYear: "",
    universityId: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignupFormData) => createAccount(data),
    onSuccess: () => {
      navigate("/sign-in", {
        state: {
          showSuccessToast: true,
        },
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    },
  });
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]:
        id === "academicYear" || id === "universityId" ? Number(value) : value,
    });
  };
  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = validatePassword(formData.password);

    setErrors({
      ...errors,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      department: "",
      academicYear: "",
      universityId: "",
    });

    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const fieldKey = key as keyof typeof formData;
      if (!formData[fieldKey]) {
        newErrors[fieldKey] = `${fieldKey} is required`;
      }
    });
    setErrors((prev) => ({ ...prev, ...newErrors }) as typeof errors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("All fields are required");
      return;
    }
    if (!result.isValid) {
      toast.error("Password does not meet all requirements");
      setErrors({
        ...errors,
        password: "Password does not meet all requirements",
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setErrors({
        ...errors,
        confirmPassword: "Passwords do not match",
      });
      return;
    }
    const data = {
      name: formData.firstName + " " + formData.lastName,
      email: formData.email,
      password: formData.password,
      department: formData.department,
      academicYear: formData.academicYear,
      universityId: Number(formData.universityId),
    };
    mutate(data as SignupFormData);
  }
  return (
    <form
      className="w-full max-w-[643px]"
      onSubmit={(e) => {
        handleRegister(e);
      }}
    >
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4 sm:gap-0">
        <div className="flex flex-col w-full sm:w-[48%]">
          <label htmlFor="first-name"> First Name</label>
          <Input
            type="text"
            id="firstName"
            value={formData.firstName}
            error={errors.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-full sm:w-[48%]">
          <label htmlFor="last-name">Last Name</label>
          <Input
            type="text"
            id="lastName"
            value={formData.lastName}
            error={errors.lastName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          value={formData.email}
          error={errors.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
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
          error={errors.password}
          onChange={handleChange}
        />
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 list-disc pl-5">
          <li>Use 8 or more characters</li>
          <li>One Uppercase character</li>
          <li>One lowercase character</li>
          <li>One special character</li>
          <li>One number </li>
        </ul>
      </div>
      <div className="mb-4">
        <label
          htmlFor="confirm-password"
          className="flex justify-between mb-2 items-center"
        >
          Confirm Password
          <span
            className="flex gap-2 font-bold cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <Eye /> : <EyeOff />}
          </span>
        </label>
        <Input
          type={showConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          value={formData.confirmPassword}
          error={errors.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="department">Department</label>
        <Input
          type="text"
          id="department"
          value={formData.department}
          error={errors.department}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="academicYear">Academic Year</label>
        <select
          id="academicYear"
          className={`rounded-xl border ${errors.academicYear ? "border-2 border-red-500 outline-none " : "border border-[#050715] focus-visible:border-black focus-visible:ring-black"} bg-[#EAEDFA] shadow-[4px_4px_4px_4px_rgba(0,0,0,0.25)] py-2 px-4 w-full h-14`}
          value={formData.academicYear}
          onChange={handleChange}
        >
          <option value="">Select year</option>
          <option value="1">First Year</option>
          <option value="2">Second Year</option>
          <option value="3">Third Year</option>
          <option value="4">Fourth Year</option>
          <option value="5">Fifth Year</option>
        </select>
      </div>
      <div className="mb-10">
        <label htmlFor="universityId">University ID</label>
        <Input
          type="number"
          id="universityId"
          value={formData.universityId}
          error={errors.universityId}
          onChange={handleChange}
        />
      </div>
      <ButtonLink
        variant="solid"
        className="py-4 px-5 h-14 w-full flex justify-center"
        children={
          isPending ? <LoaderCircle className="animate-spin " /> : "Sign Up"
        }
        disabled={isPending}
        type="submit"
      />
    </form>
  );
}
