import { FC, PropsWithChildren } from "react";

export const Subheader: FC<PropsWithChildren> = ({ children }) => (
  <h2 className="font-medium text-2xl mt-8 text-center">{children}</h2>
);
