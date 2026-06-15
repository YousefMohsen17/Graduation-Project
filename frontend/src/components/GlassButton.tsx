export default function GlassButton({
  children,
  className,
  onClick,
  key,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  key?: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={`
        rounded-2xl flex items-center justify-center
    transition-colors duration-300 bg-gradient-to-t from-[#0A0E29] to-[#1E2A7B] text-[#EAEDFA] hover:from-[#141C52] hover:to-[#5B6CD7]
    ${className}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer active:scale-95"}
      `}
      onClick={onClick}
      key={key}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
