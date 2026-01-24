import React, { forwardRef } from 'react';

interface InputGlassProps {
    type?: string;
    className?: string;
    onClick?: () => void;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

const InputGlass = forwardRef<HTMLInputElement, InputGlassProps>(
    ({ type, className, onClick, placeholder, onChange, value }, ref) => {
        return (
            <input
                className={`
        h-[37px] w-full 
        flex items-center justify-center 
        px-[24px] py-[14px] rounded-[12px]
        bg-[#eaeefa]
        backdrop-blur-2xl
        shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
        text-slate-800 font-medium transition-all 
        border border-white
    ${className || ""}
      `}
                onClick={onClick}
                type={type}
                placeholder={placeholder}
                ref={ref}
                onChange={onChange}
                value={value}
            />
        );
    }
);

InputGlass.displayName = 'InputGlass';

export default InputGlass;