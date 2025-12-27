import { Link } from "react-router";
import logo from "../../../assets/logo.svg";
import ButtonLink from "../../../components/ButtonLink";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-50">
      <div className="container mx-auto p-4 flex justify-between items-center mb-10 lg:mb-[100px]">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-[Orbitron] font-semibold">Engipedia</h1>
          <img src={logo} alt="Fire Spirit" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex gap-4 p-2 ">
            <Link to="/">
              <li className="font-bold hover:text-[#0a0e29]/70 transition-colors">Home</li>
            </Link>
            <Link to="/">
              <li className="hover:text-[#0a0e29]/70 transition-colors">Courses</li>
            </Link>
            <Link to="/">
              <li className="hover:text-[#0a0e29]/70 transition-colors">Progress</li>
            </Link>
            <Link to="/">
              <li className="hover:text-[#0a0e29]/70 transition-colors">Community</li>
            </Link>
            <Link to="/">
              <li className="hover:text-[#0a0e29]/70 transition-colors">About</li>
            </Link>
          </ul>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex gap-10 items-center">
          <ButtonLink
            to="/sign-up"
            children="Sign Up"
            variant="solid"
            className="py-6 px-4 h-[54px]"
          />
          <ButtonLink
            to="/sign-in"
            children="Sign In"
            variant="outline"
            className="py-6 px-4 h-[54px]"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-[#0a0e29]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#D6DAF5] shadow-lg flex flex-col items-center p-6 gap-6 lg:hidden border-t border-[#0a0e29]/10">
            <nav>
              <ul className="flex flex-col gap-6 text-center text-lg">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  <li className="font-bold">Home</li>
                </Link>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  <li>Courses</li>
                </Link>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  <li>Progress</li>
                </Link>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  <li>Community</li>
                </Link>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  <li>About</li>
                </Link>
              </ul>
            </nav>
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <ButtonLink
                to="/sign-up"
                children="Sign Up"
                variant="solid"
                className="py-4 px-4 h-[50px] w-full justify-center"
              />
              <ButtonLink
                to="/sign-in"
                children="Sign In"
                variant="outline"
                className="py-4 px-4 h-[50px] w-full justify-center"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
