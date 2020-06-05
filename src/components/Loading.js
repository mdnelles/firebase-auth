import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Loading = () => {
   return (
      <div>
         <CircularProgress />
         <CircularProgress color="secondary" />
      </div>
   );
};