import { EyeOff } from "lucide-react";
import ButtonLink from "../../components/ButtonLink";
import Input from "../../components/Input";
import cubesImage from "../../assets/cubes.jpg";
import googleLogo from "../../assets/google logo.svg";
import facebookLogo from "../../assets/facebook logo.svg";

export default function SigninPage() {
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
        <div className="mb-9 w-full max-w-[643px]">
          <h1 className="mb-6 text-center text-3xl lg:text-[39px]">Welcome Back</h1>
          <p className="text-center mx-auto">
            Sign in to access your courses, track your progress, and continue
            your learning journey
          </p>
        </div>
        <form className="w-full max-w-[643px]">
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
          </div>

          <p className="relative before:content-[''] before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:w-[60px] sm:before:w-[145px] before:h-0.5 before:-translate-x-3 before:bg-[#0A0E29]  after:content-[''] after:absolute after:left-full after:top-1/2 after:-translate-y-1/2 after:w-[60px] sm:after:w-[145px] after:h-0.5 after:translate-x-3 after:bg-[#0A0E29] text-center w-fit mx-auto mb-8 whitespace-nowrap">
            Or Continue With
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
      </div>
    </div>
  );
}
