import { Box } from "@mui/material";
import "./WinnerBanner.css";
import { useEffect, useState } from "react";
const WinnerBanner = () => {
  return (
    <Box align="center">
      <div class="winner-banner" data-text="Winner">
        <span>Winner</span>
      </div>
    </Box>
  );
};

export default WinnerBanner;
