import { EyeOff } from "lucide-react";
import cubesImage from "../../assets/cubes.jpg";
import googleLogo from "../../assets/google logo.svg";
import facebookLogo from "../../assets/facebook logo.svg";
import Input from "../../components/Input";
import ButtonLink from "./../../components/ButtonLink";
import { Link } from "react-router";
export default function SignupPage() {
  return (
    <div className="flex min-h-screen bg-[#D6DAF5] gap-0 lg:gap-[89px] flex-col lg:flex-row">
      <div className="hidden lg:block lg:basis-[40%]">
        <img
          src={cubesImage}
          alt="cubes image"
          className="h-full object-cover w-full"
        />
      </div>

      <div className="flex flex-col items-center pt-10 pb-10 lg:pt-[53px] lg:basis-[60%] px-4 lg:px-0 w-full">
        <div className="w-full max-w-[643px]">
          <h1 className="mb-6 text-center text-3xl lg:text-[39px]">Hey! Let’s Create Your Account</h1>
          <p className="mb-10 text-center mx-auto">
            Sign up now to unlock course materials, track your performance, and
            stay connected with every update throughout the semester.
          </p>
          <p className="mb-[46px] self-start">
            Already have an account?
            <Link to="/sign-in" className="font-bold ml-2">
              SignIn
            </Link>
          </p>
        </div>
        <form className="w-full max-w-[643px]">
          <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4 sm:gap-0">
            <div className="flex flex-col w-full sm:w-[48%]">
              <label htmlFor="first-name"> First Name</label>
              <Input type="text" id="first-name" />
            </div>
            <div className="flex flex-col w-full sm:w-[48%]">
              <label htmlFor="last-name">Last Name</label>
              <Input type="text" id="last-name" />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <Input type="email" id="email" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="flex justify-between mb-2 items-center"
            >
              Password
              <span className="flex gap-2 font-bold cursor-pointer">
                <EyeOff /> Hide
              </span>
            </label>
            <Input type="password" id="password" />
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 list-disc pl-5">
              <li>Use 8 or more characters</li>
              <li>One Uppercase character</li>
              <li>One lowercase character</li>
              <li>One special character</li>
              <li>One number </li>
            </ul>
          </div>
          <div className="mb-10">
            <label
              htmlFor="confirm-password"
              className="flex justify-between mb-2 items-center"
            >
              Confirm Password
              <span className="flex gap-2 font-bold cursor-pointer">
                <EyeOff /> Hide
              </span>
            </label>
            <Input type="password" id="confirm-password" />
          </div>
          <ButtonLink
            to="/sign-in"
            variant="solid"
            className="py-4 px-5 h-14 w-full flex justify-center"
            children="Sign Up"
          />
          <p className="relative mt-8 before:content-[''] before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:w-[60px] sm:before:w-[145px] before:h-0.5 before:-translate-x-3 before:bg-[#0A0E29]  after:content-[''] after:absolute after:left-full after:top-1/2 after:-translate-y-1/2 after:w-[60px] sm:after:w-[145px] after:h-0.5 after:translate-x-3 after:bg-[#0A0E29] text-center w-fit mx-auto mb-8 whitespace-nowrap">
            Or connect with
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <ButtonLink
              to="/sign-up"
              variant="solid"
              className="py-3 px-5 h-[54px] w-full sm:w-auto justify-center"
            >
              <img src={googleLogo} alt="google logo" className="mr-2" />
              Continue With Google
            </ButtonLink>
            <ButtonLink
              to="/sign-up"
              variant="solid"
              className="py-3 px-5 h-[54px] w-full sm:w-auto justify-center"
            >
              <img src={facebookLogo} alt="facebook logo" className="mr-2" />
              Continue With Facebook
            </ButtonLink>
          </div>
        </form>
      </div>
    </div>
  );
}
