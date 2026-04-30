import { Link, useLocation, useNavigate } from "react-router";
import logo from "../../../assets/logo.svg";
import ButtonLink from "../../../components/ButtonLink";
import { useState } from "react";
import { CircleUserRound, Menu, X, LogOut } from "lucide-react";
import { useAuth, useLogout } from "../../../lib/queries";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { data: user } = useAuth();
  const { mutate: logoutUser } = useLogout();
  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-[#0a0e29] font-bold"
      : "text-[#0a0e29]/70 font-normal";
  };

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <header className="relative z-50">
      <div className="container mx-auto p-4 flex justify-between items-center mb-10 lg:mb-[100px]">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="text-xl font-[Orbitron] font-semibold">Engipedia</h1>
          <img src={logo} alt="Fire Spirit" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex gap-4 p-2 ">
            {user ? (
              <>
                <Link to="/home">
                  <li
                    className={`hover:text-[#0a0e29] transition-colors ${isActive("/home")}`}
                  >
                    Home
                  </li>
                </Link>
                <Link to="/courses">
                  <li
                    className={`hover:text-[#0a0e29] transition-colors ${isActive("/courses")}`}
                  >
                    Courses
                  </li>
                </Link>
                <Link to="/progress">
                  <li
                    className={`hover:text-[#0a0e29] transition-colors ${isActive("/progress")}`}
                  >
                    Progress
                  </li>
                </Link>
                <Link to="/community">
                  <li
                    className={`hover:text-[#0a0e29] transition-colors ${isActive("/community")}`}
                  >
                    Community
                  </li>
                </Link>
                <Link to="/about">
                  <li
                    className={`hover:text-[#0a0e29] transition-colors ${isActive("/about")}`}
                  >
                    About
                  </li>
                </Link>
              </>
            ) : null}
          </ul>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex gap-10 items-center">
          {!user && (
            <>
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
            </>
          )}
          {user && (
            <div className="flex justify-between items-center font-medium  text-[#0a0e29]">
              <div
                onClick={() => navigate("/community/user/" + user.data?._id)}
              >
                <CircleUserRound />
              </div>
              <div className="ms-[15px] me-[24px]">
                <p className="font-bold">{user.data?.name}</p>
                <p>{user.data?.email}</p>
              </div>
              <div
                className="ms-[10px] cursor-pointer"
                onClick={() => setShowLogoutConfirm(true)}
                title="Log out"
              >
                <LogOut />
              </div>
            </div>
          )}
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
                {user ? (
                  <>
                    <div className="flex flex-col items-center gap-2 mb-4 border-b border-[#0a0e29]/10 pb-4">
                      <CircleUserRound size={48} />
                      <div>
                        <p className="font-bold">{user.data?.name}</p>
                        <p className="text-sm opacity-70">{user.data?.email}</p>
                      </div>
                    </div>
                    <Link to="/home" onClick={() => setIsMenuOpen(false)}>
                      <li className={isActive("/home")}>Home</li>
                    </Link>
                    <Link to="/courses" onClick={() => setIsMenuOpen(false)}>
                      <li className={isActive("/courses")}>Courses</li>
                    </Link>
                    <Link to="/progress" onClick={() => setIsMenuOpen(false)}>
                      <li className={isActive("/progress")}>Progress</li>
                    </Link>
                    <Link to="/community" onClick={() => setIsMenuOpen(false)}>
                      <li className={isActive("/community")}>Community</li>
                    </Link>
                    <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                      <li className={isActive("/about")}>About</li>
                    </Link>
                    <button
                      onClick={() => {
                        setShowLogoutConfirm(true);
                        setIsMenuOpen(false);
                      }}
                      className="text-red-600 font-medium flex items-center justify-center gap-2 mt-2"
                    >
                      <LogOut size={20} /> Logout
                    </button>
                  </>
                ) : (
                  <Link to="/" onClick={() => setIsMenuOpen(false)}>
                    <li className={isActive("/")}>Home</li>
                  </Link>
                )}
              </ul>
            </nav>
            {!user && (
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
            )}
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[20px] p-8 w-full max-w-md shadow-2xl transform transition-all scale-100 opacity-100">
            <h3 className="text-2xl font-[Orbitron] font-bold text-[#0a0e29] mb-4 text-center">
              Confirm Logout
            </h3>
            <p className="text-[#0a0e29]/70 text-center mb-8">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-6 py-3 rounded-xl border border-[#0a0e29]/20 hover:bg-gray-50 text-[#0a0e29] font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  logoutUser();
                  setShowLogoutConfirm(false);
                }}
                className="px-6 py-3 rounded-xl bg-[#0a0e29] text-white font-medium hover:bg-[#0a0e29]/90 shadow-lg shadow-[#0a0e29]/20 transition-all"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
