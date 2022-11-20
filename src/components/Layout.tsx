import { FC, PropsWithChildren } from "react";

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <main className="max-w-screen-lg mx-auto px-4 py-8">{children}</main>
);
