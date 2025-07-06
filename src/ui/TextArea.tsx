type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  id?: string;
};

export default function TextArea({ label, id, ...props }: TextAreaProps) {
  const inputId = id || props.name;
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className="p-2 rounded-md border border-black/10 focus:outline-none focus:ring-2 focus:ring-accent"
        {...props}
      />
    </div>
  );
}
