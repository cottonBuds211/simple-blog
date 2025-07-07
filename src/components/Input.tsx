type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  label?: string;
};

export default function Input({ label, id, ...props }: InputProps) {
  const inputId = id || props.name;

  return (
    <div className="flex flex-col flex-grow gap-2">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className="p-2 border border-black/10 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
        {...props}
      />
    </div>
  );
}
