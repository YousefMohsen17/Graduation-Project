import { Link } from "react-router";
export default function WelcomeMessage() {
    return (
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
    );
}