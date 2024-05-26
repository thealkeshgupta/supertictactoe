import { Box } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import "./Marker.css";

const MarkerItem = ({ row, column, value, gridEnabled }) => {
  return (
    <Box
      align="center"
      sx={{
        height: "60px",
        width: "60px",
        padding: "5px",
        // boxShadow:
        //   "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;",
      }}
    >
      {/* {row},{column},{value} */}
      {value === 0 ? (
        <Box
          className={`input-${gridEnabled ? "enabled" : "disabled"}`}
          sx={{
            height: "100%",
            width: "100%",
            // boxShadow: gridEnabled ? "0 0 5px 5px #48abe0aa" : "",
          }}
        />
      ) : value === 1 ? (
        <div class={"marker"} style={{ fontSize: "5vh", marginTop: "1vh" }}>
          ⛌
        </div>
      ) : (
        <div class={"marker"} style={{ fontSize: "5vh" }}>
          ◯
        </div>
      )}
    </Box>
  );
};

export default MarkerItem;
