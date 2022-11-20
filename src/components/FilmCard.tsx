import { FC, useMemo } from "react";

type Props = {
  title?: string | null;
  releaseDate?: string | null;
  planets?: (
    | {
        __typename?: "Planet";
        surfaceWater?: number | null;
      }
    | null
    | undefined
  )[];
};

export const FilmCard: FC<Props> = ({ title, releaseDate, planets }) => (
  <div className="rounded border-2 p-8 max-w-lg mx-auto text-center mt-4 shadow-md">
    <h3 className="text-xl font-medium">{title}</h3>
    <p className="mt-2">Released: {releaseDate}</p>
    <p className="text-sm mt-4">
      Planets without surface water:{" "}
      {planets?.filter((p) => p?.surfaceWater === 0).length}
    </p>
  </div>
);
