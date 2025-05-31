import React from "react";
import { Skeleton } from "@mui/material";

const EventCardSkeleton = () => {
  return (
    <div className="shadow-lg rounded-lg border border-gray-300 flex flex-col gap-4 bg-white">
      <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
        />
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <Skeleton variant="text" width="80%" height={32} animation="wave" />
          <div className="mt-2 space-y-1">
            <Skeleton variant="text" width="100%" animation="wave" />
            <Skeleton variant="text" width="90%" animation="wave" />
            <Skeleton variant="text" width="70%" animation="wave" />
          </div>
        </div>
        <Skeleton
          variant="text"
          width="40%"
          height={24}
          className="mt-5"
          animation="wave"
        />
      </div>
    </div>
  );
};

export default EventCardSkeleton;
