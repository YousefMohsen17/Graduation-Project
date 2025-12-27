export default function Input({ type, id }: { type: string; id: string }) {
  return (
    <input
      type={type}
      id={id}
      className="rounded-xl border border-[#050715] bg-[#EAEDFA] shadow-[4px_4px_4px_4px_rgba(0,0,0,0.25)] py-2 px-4 w-full h-14 "
    />
  );
}
