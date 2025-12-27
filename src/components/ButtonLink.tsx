import { Link } from "react-router";

export default function ButtonLink({
  to,
  children,
  className,
  variant,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  variant?: string;
}) {
  return (
    <Link
      to={to}
      className={` ${
        variant === "solid"
          ? "bg-[#0a0e29f2] text-[#EAEDFA] "
          : "bg-[#D6DAF5] text-[#0A0E29] border border- border-[#0A0E29] hover:text-[#EAEDFA]"
      }   rounded-2xl flex items-center  hover:bg-[#0a0e29] w-fit transition-colors duration-300 ${className}`}
    >
      {children}
    </Link>
  );
}
