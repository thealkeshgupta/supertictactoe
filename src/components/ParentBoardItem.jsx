import { Box, Grid, Paper } from "@mui/material";
import ChildBoard from "./ChildBoard";
import CloseIcon from "@mui/icons-material/Close";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
const ParentBoardItem = ({ row, column, value, updateParentMatrix }) => {
  return (
    <Box
      sx={{
        height: "fit-content",
        width: "fit-content",
        margin: "1px",
      }}
    >
      <ChildBoard
        row={row}
        column={column}
        updateParentMatrix={updateParentMatrix}
        value={value}
      />
    </Box>
  );
};

export default ParentBoardItem;
