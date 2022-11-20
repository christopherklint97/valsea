import { FC, PropsWithChildren } from "react";

export const Title: FC<PropsWithChildren> = ({ children }) => (
  <h1 className="text-4xl font-semibold text-center mt-8">{children}</h1>
);
