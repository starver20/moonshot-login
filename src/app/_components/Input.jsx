// ----------------------------------------------------------------------
export default function Input({ ...others }) {
  return (
    <div>
      <p className="mb-1">{others.label}</p>
      <input
        {...others}
        className="border border-slate-250 w-full rounded-md px-4 py-2 text-black"
      />
      
    </div>
  );
}
