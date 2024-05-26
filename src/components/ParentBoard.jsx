import { Box, Grid, Paper, Zoom } from "@mui/material";
import ChildBoard from "./ChildBoard";
import ParentBoardItem from "./ParentBoardItem";
import { useEffect, useState } from "react";
import gridImage from "../assets/gridImage.png";

import CloseIcon from "@mui/icons-material/Close";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import WinnderBanner from "./WinnerBanner";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentBotGrid,
  updateAvailableGrids,
} from "../redux/slices/matrix";
import useSound from "use-sound";
import winner from "./winner.mp3";

const ParentBoard = () => {
  const [parentMatrix, setParentMatrix] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const dispatch = useDispatch();
  const player1Name = useSelector((state) => state.matrix.player1Name);
  const player2Name = useSelector((state) => state.matrix.player2Name);
  const availableGrids = useSelector((state) => state.matrix.availableGrids);
  const currentGrid = useSelector((state) => state.matrix.currentGrid);
  const currentInput = useSelector((state) => state.matrix.currentInput);
  const gameType = useSelector((state) => state.matrix.gameType);
  const [parentBoardResult, setParentBoardResult] = useState(0);

  const [play] = useSound(winner);

  const getIndexFromRowColumn = (row, column) => {
    let index = 0;

    index = row * 3 + column;

    return index;
  };

  function calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        parentMatrix[a] &&
        parentMatrix[a] === parentMatrix[b] &&
        parentMatrix[a] === parentMatrix[c]
      ) {
        return parentMatrix[a];
      }
    }
    return 0;
  }

  const updateParentMatrix = (row, column, value) => {
    let prevParentMatrix = parentMatrix;
    prevParentMatrix[getIndexFromRowColumn(row, column)] = value;
    setParentMatrix([...prevParentMatrix]);

    let prevAvailableGrids = availableGrids;

    prevAvailableGrids = prevAvailableGrids.filter(
      (item) => item !== getIndexFromRowColumn(row, column)
    );

    dispatch(updateAvailableGrids([...prevAvailableGrids]));
  };

  useEffect(() => {
    setParentBoardResult(calculateWinner());
  }, [parentMatrix]);

  useEffect(() => {
    if (gameType === 1 && currentInput === 2 && currentGrid === -1) {
      let randomIndex = Math.floor(Math.random() * availableGrids.length);

      let randomValue = availableGrids[randomIndex];

      console.log("current bot grid set to ", randomValue);
      dispatch(setCurrentBotGrid(randomValue));
    }
  }, [currentInput, gameType, currentGrid]);

  const renderParentBoardItems = (row, column) => {
    return (
      <Grid
        item
        xs={4}
        sx={{
          padding: "18px",
          filter: "invert(100%);",
        }}
      >
        <ParentBoardItem
          row={row}
          column={column}
          updateParentMatrix={updateParentMatrix}
          value={parentMatrix[getIndexFromRowColumn(row, column)]}
        />
      </Grid>
    );
  };

  const matrixElements = [];

  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
      matrixElements.push(renderParentBoardItems(row, column));
    }
  }

  return (
    <>
      <Box sx={{ marginX: "40px" }}>
        <Box align="center">
          {parentBoardResult === 0 ? (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                filter: "invert(100%);",
                background: `url(${gridImage})`,
                backgroundSize: "cover", // Ensures the image covers the entire div
                backgroundPosition: "center", // Centers the image within the div
                backgroundRepeat: "no-repeat",
                boxShadow:
                  "0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.4),  0 0 40px rgba(255, 215, 0, 0.2);",
              }}
            >
              {matrixElements}
            </Grid>
          ) : (
            <Zoom in={true} style={{ transitionDelay: "500ms" }}>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                }}
                onMouseEnter={() => {
                  play();
                }}
              >
                <WinnderBanner />
                {parentBoardResult === 1 ? (
                  <>
                    <div
                      class="marker"
                      style={{
                        fontSize: "40vh",
                        position: "relative",
                        top: "-4vh",
                      }}
                    >
                      ⛌
                    </div>
                    <div
                      class={"enable-turn"}
                      style={{
                        fontSize: "7vw",
                        textTransform: "none",
                        position: "relative",
                        top: "-16vh",
                      }}
                    >
                      {player1Name}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      class={"marker"}
                      style={{
                        fontSize: "28vh",
                        position: "relative",
                        top: "0vh",
                      }}
                    >
                      ◯
                    </div>{" "}
                    <div
                      class={"enable-turn"}
                      style={{
                        fontSize: "7vw",
                        textTransform: "none",
                        position: "relative",
                        top: "-4vh",
                      }}
                    >
                      {player2Name}
                    </div>
                  </>
                )}
              </Box>
            </Zoom>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ParentBoard;
