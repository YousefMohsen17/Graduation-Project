import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import toast from "react-hot-toast";
import LoginForm from "./components/LoginForm";
import WelcomeMessage from "./components/WelcomeMessage";
import LoginLogo from "./components/LoginLogo";
export default function SigninPage() {
  const location = useLocation()
  const hasShownToast = useRef(false);
  useEffect(() => {
    if (location.state?.showSuccessToast && !hasShownToast.current) {
      toast.success("Account created successfully");
      hasShownToast.current = true;

      // clear state so it doesn't show again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  return (
    <div className="flex min-h-screen bg-[#D6DAF5] gap-0 lg:gap-[89px] flex-col lg:flex-row">
      <LoginLogo />

      <div className="flex flex-col items-center pt-10 pb-10 lg:pt-[53px] lg:basis-[60%] px-4 lg:px-0 w-full">
        <WelcomeMessage />
        <LoginForm />
      </div>
    </div>
  );
}
