import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
} from "react";

export const Button: FC<
  PropsWithChildren<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >
> = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-blue-200 px-2 py-1 rounded border-2 border-blue-300 hover:bg-blue-300 disabled:hover:cursor-not-allowed disabled:bg-slate-100 disabled:border-slate-200 disabled:text-slate-400"
  >
    {children}
  </button>
);
