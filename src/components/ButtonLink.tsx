import { Link } from "react-router";

type ButtonLinkProps =
  | {
    to: string;
    type?: never;
  }
  | {
    to?: undefined;
    type?: "button" | "submit";
  };

type Props = ButtonLinkProps & {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: "solid" | "outline";
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
};

export default function ButtonLink({
  to,
  children,
  className = "",
  variant = "solid",
  type = "button",
  onClick,
  disabled = false,
}: Props) {
  const baseClasses = `
    rounded-2xl flex items-center justify-center
    transition-colors duration-300
    ${variant === "solid"
      ? "bg-[#0a0e29f2] text-[#EAEDFA] hover:bg-[#0a0e29]"
      : "bg-[#D6DAF5] text-[#0A0E29] border border-[#0A0E29] hover:text-[#EAEDFA] hover:bg-[#0a0e29]"}
    ${className}
  `;

  if (to) {
    return (
      <Link to={to} className={baseClasses} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClasses} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
