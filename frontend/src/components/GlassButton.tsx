export default function GlassButton({ children, className, onClick, key, disabled }: { children: React.ReactNode, className?: string, onClick?: () => void, key?: string, disabled?: boolean }) {
    return (
        <button className={`
        mt-4  
        flex items-center justify-center gap-[8px]
        px-[24px] py-[16px] rounded-[16px]
        bg-gradient-to-b from-[#d0d5f3] to-[#ced2f2]
        backdrop-blur-2xl
        shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
        text-slate-800 font-medium transition-all active:scale-95
        border border-white
    ${className}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer active:scale-95"}
      `}
            onClick={onClick}
            key={key}
            disabled={disabled}
        >
            {children}
        </button>
    )
}