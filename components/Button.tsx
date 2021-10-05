export default function Button({
  onClick = () => {},
  children = "",
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full shadow-lg px-4 py-2 rounded-md bg-black text-white ${className}`}
    >
      {children}
    </button>
  );
}
