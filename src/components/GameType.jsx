import { Box, Button, Grid, Stack } from "@mui/material";
import "./GameType.css";
import { useDispatch } from "react-redux";
import { setGameType } from "../redux/slices/matrix";
const GameType = ({ setFormStep }) => {
  const dispatch = useDispatch();
  return (
    <Box
      align="center"
      className=""
      sx={{ width: "40vw", height: "fit-content" }}
    >
      <Grid container spacing={10}>
        <Grid item xs={6}>
          <div
            class="logo game-type-box"
            onClick={() => {
              setFormStep(2);
              dispatch(setGameType(1));
            }}
          >
            <b style={{ fontSize: "3vw" }}>
              On<span>e</span> Pl<span>ay</span>er
            </b>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div
            class="logo game-type-box"
            onClick={() => {
              setFormStep(2);
              dispatch(setGameType(2));
            }}
          >
            <b style={{ fontSize: "3vw" }}>
              T<span>wo</span> Pla<span>ye</span>rs
            </b>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
export default GameType;
