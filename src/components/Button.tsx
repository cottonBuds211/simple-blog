interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children = "Button",
  type = "button",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button className={`${className} py-2 px-4 hover:cursor-pointer rounded-md `} {...rest} type={type}>
      {children}
    </button>
  );
}
