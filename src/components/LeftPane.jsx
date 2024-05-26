import { Box } from "@mui/material";
import Title from "./Title";
import { useSelector } from "react-redux";

const LeftPane = () => {
  const player1Name = useSelector((state) => state.matrix.player1Name);
  const player2Name = useSelector((state) => state.matrix.player2Name);
  const currentInput = useSelector((state) => state.matrix.currentInput);
  const currentGrid = useSelector((state) => state.matrix.currentGrid);
  const currentBotGrid = useSelector((state) => state.matrix.currentBotGrid);

  return (
    <Box align="center" sx={{ position: "relative", left: "1vw", top: "5vh" }}>
      <div class="neon" style={{ fontSize: "3vw", lineHeight: "3vw" }}>
        ⛌ Super ⛌
      </div>
      <div class="flux" style={{ fontSize: "2vw", lineHeight: "2vw" }}>
        ◯ Tic Tac Toe ◯
      </div>

      <div
        class="game-type-box"
        style={{
          position: "relative",
          top: "25vh",
          padding: "2vh",
          fontStyle: "italic",
        }}
      >
        <div
          class={currentInput === 1 ? "enable-turn" : "disable-turn"}
          style={{ fontSize: "4vw", textTransform: "none" }}
        >
          {player1Name}
        </div>
        <div
          class={currentInput === 2 ? "enable-turn" : "disable-turn"}
          style={{ fontSize: "4vw", textTransform: "none" }}
        >
          {player2Name}
        </div>
      </div>
    </Box>
  );
};

export default LeftPane;
