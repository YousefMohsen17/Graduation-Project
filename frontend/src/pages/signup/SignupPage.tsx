import SignupForm from "./components/SignupForm";
import WelcomeMessage from "./components/WelcomeMessage";
import SignupLogo from "./components/SignupLogo";
export default function SignupPage() {
  return (
    <div className="flex min-h-screen bg-[#D6DAF5] gap-0 lg:gap-[89px] flex-col lg:flex-row">
      <SignupLogo />

      <div className="flex flex-col items-center pt-10 pb-10 lg:pt-[53px] lg:basis-[60%] px-4 lg:px-0 w-full">
        <WelcomeMessage />
        <SignupForm />
      </div>
    </div>
  );
}
