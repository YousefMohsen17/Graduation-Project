interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }
export default function Input({ type, id, value, onChange, error }: InputProps & { error?: string }) {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className={`rounded-xl  bg-[#EAEDFA] shadow-[4px_4px_4px_4px_rgba(0,0,0,0.25)] py-2 px-4 w-full h-14 ${error ? "border-2 border-red-500 outline-none " : "border border-[#050715] focus-visible:border-black focus-visible:ring-black"}`}
    />
  );
}
