import { Box, Button, Grid, Stack } from "@mui/material";
import "./PlayersForm.css";
import { useDispatch, useSelector } from "react-redux";
import { setPlayer1Name, setPlayer2Name } from "../redux/slices/matrix";
import { setNextPage } from "../redux/slices/navigation";
const PlayersForm = () => {
  const player1Name = useSelector((state) => state.matrix.player1Name);
  const player2Name = useSelector((state) => state.matrix.player2Name);
  const gameType = useSelector((state) => state.matrix.gameType);
  const dispatch = useDispatch();
  return (
    <Box
      align="center"
      className=""
      sx={{ width: "40vw", height: "fit-content" }}
    >
      <div class="game-type-box">
        <div class="login" style={{ position: "relative", top: "-4vh" }}>
          <div class="inputs">
            <label class="textlabel">
              Player {gameType === 2 ? "1" : ""} :
            </label>
            <br />
            <input
              type="text"
              placeholder=""
              class="input"
              onChange={(e) => {
                dispatch(setPlayer1Name(e.target.value));
              }}
            ></input>
            {gameType === 2 ? (
              <>
                <br />
                <br />
                <label class="textlabel">Player 2 : </label>
                <br />
                <input
                  type="text"
                  placeholder=""
                  class="input"
                  onChange={(e) => {
                    dispatch(setPlayer2Name(e.target.value));
                  }}
                ></input>
              </>
            ) : null}
          </div>

          <button
            class="btn"
            disabled={player1Name === "" || player2Name === ""}
            onClick={() => {
              dispatch(setNextPage());
            }}
          >
            Enter
          </button>
        </div>
      </div>
    </Box>
  );
};
export default PlayersForm;
