import { Box, Grid } from "@mui/material";
import MarkerItem from "./MarkerItem";
import { useState } from "react";
import useSound from "use-sound";
import select from "./select.mp3";
const ChildBoardItem = ({
  row,
  column,
  updateChildMatrix,
  value,
  gridEnabled,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [play] = useSound(select);
  return (
    <Box
      onClick={() => {
        if (gridEnabled && !isClicked) {
          updateChildMatrix(row, column);
          setIsClicked(true);
          play();
        }
      }}
      sx={{
        width: "fit-content",
      }}
    >
      <MarkerItem
        row={row}
        column={column}
        value={value}
        gridEnabled={gridEnabled}
      />
    </Box>
  );
};

export default ChildBoardItem;
