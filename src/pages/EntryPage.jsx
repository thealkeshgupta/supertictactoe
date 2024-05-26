import { Box, Fade, Stack } from "@mui/material";
import Title from "../components/Title";
import GameType from "../components/GameType";
import { useEffect, useState } from "react";
import PlayersForm from "../components/PlayersForm";
import ReactCardFlip from "react-card-flip";
import useSound from "use-sound";
import intro from "../components/intro.mp3";

const EntryPage = () => {
  const [play] = useSound(intro);

  useEffect(() => {
    play();
  }, []);

  const [formStep, setFormStep] = useState(1);
  return (
    <>
      <Stack
        align="center"
        sx={{ marginTop: "4vh" }}
        onMouseEnter={() => {
          play();
        }}
      >
        <div class="neon" style={{ fontSize: "8vw", lineHeight: "8vw" }}>
          ⛌ Super ⛌
        </div>
        <div class="flux" style={{ fontSize: "7vw", lineHeight: "7vw" }}>
          ◯ Tic Tac Toe ◯
        </div>

        <Box align="center" sx={{ marginTop: "5vh" }}>
          <ReactCardFlip isFlipped={formStep === 2} flipDirection="vertical">
            <GameType setFormStep={setFormStep} />

            <PlayersForm />
          </ReactCardFlip>
        </Box>
      </Stack>
    </>
  );
};
export default EntryPage;
