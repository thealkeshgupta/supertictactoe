import { Box, Fade } from "@mui/material";
import "./RightPane.css";

import CloseIcon from "@mui/icons-material/Close";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import { useSelector } from "react-redux";

const RightPane = () => {
  const currentInput = useSelector((state) => state.matrix.currentInput);
  const gameType = useSelector((state) => state.matrix.gameType);
  const player1Name = useSelector((state) => state.matrix.player1Name);
  const player2Name = useSelector((state) => state.matrix.player2Name);

  return (
    <Box
      sx={{ height: "100%", position: "relative", right: "1vw", top: "2vh" }}
    >
      <div
        class="your-turn"
        style={{ height: "18vh", lineHeight: "1", marginTop: "4vh" }}
      >
        {currentInput === 1 ? player1Name : player2Name}'s
        <br /> Turn
      </div>
      <div
        class="game-type-box"
        style={{
          position: "relative",
          top: "0vh",
        }}
      >
        <div class={currentInput === 1 ? "enable-turn" : "disable-turn"}>⛌</div>
        <div class={currentInput === 2 ? "enable-turn" : "disable-turn"}>
          <b>◯ </b>
        </div>
      </div>
    </Box>
  );
};

export default RightPane;
