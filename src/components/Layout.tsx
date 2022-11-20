import { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <nav className="bg-slate-600 px-8 py-4 text-white sticky top-0">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
    <main className="max-w-screen-lg mx-auto px-4 py-8">{children}</main>
  </>
);
