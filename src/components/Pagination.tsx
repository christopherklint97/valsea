import { FC } from "react";
import { Button } from "./Button";
import { useSearchParams } from "react-router-dom";

type Props = {
  pageInfo?: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null;
    endCursor?: string | null;
  };
};

export const Pagination: FC<Props> = ({ pageInfo }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="flex justify-between max-w-lg mx-auto mt-4">
      <Button
        onClick={() =>
          setSearchParams({
            prev: pageInfo?.startCursor || "",
          })
        }
        disabled={!pageInfo?.hasPreviousPage && !searchParams.get("next")}
      >
        Previous
      </Button>
      <Button
        onClick={() =>
          setSearchParams({
            next: pageInfo?.endCursor || "",
          })
        }
        disabled={!pageInfo?.hasNextPage && !searchParams.get("prev")}
      >
        Next
      </Button>
    </div>
  );
};
