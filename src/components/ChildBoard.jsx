import { Box, Grid, Zoom } from "@mui/material";
import ChildBoardItem from "./ChildBoardItem";
import { useEffect, useState } from "react";
import { updateCurrentGrid, updateCurrentInput } from "../redux/slices/matrix";
import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";

import useSound from "use-sound";
import select from "./select.mp3";
import gridWin from "./gridWin.mp3";
import gridImage from "../assets/gridImage.png";

const ChildBoard = ({ row, column, updateParentMatrix, value }) => {
  const dispatch = useDispatch();
  const [play] = useSound(select);
  const [gridWinPlay] = useSound(gridWin);

  const currentInput = useSelector((state) => state.matrix.currentInput);
  const gameType = useSelector((state) => state.matrix.gameType);
  const currentGrid = useSelector((state) => state.matrix.currentGrid);
  const currentBotGrid = useSelector((state) => state.matrix.currentBotGrid);

  const [childMatrix, setChildMatrix] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [availableIndices, setAvailableIndices] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8,
  ]);

  const [gridEnabled, setGridEnabled] = useState(true);

  const [childBoardResult, setChildBoardResult] = useState(0);

  const getIndexFromRowColumn = (row, column) => {
    let index = 0;

    index = row * 3 + column;

    return index;
  };

  const getRowColumnFromIndex = (index) => {
    const numberOfColumns = 3;
    const row = Math.floor(index / numberOfColumns);
    const column = index % numberOfColumns;

    return { newRow: row, newColumn: column };
  };

  useEffect(() => {
    if (currentGrid !== -1) {
      if (currentGrid === getIndexFromRowColumn(row, column)) {
        if (value === 0) {
          setGridEnabled(true);
        } else {
          dispatch(updateCurrentGrid(-1));
        }
      } else {
        setGridEnabled(false);
      }
    } else {
      setGridEnabled(true);
    }
  }, [currentGrid]);

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
        childMatrix[a] &&
        childMatrix[a] === childMatrix[b] &&
        childMatrix[a] === childMatrix[c]
      ) {
        updateParentMatrix(row, column, childMatrix[a]);
        gridWinPlay();
        return childMatrix[a];
      }
    }
    return 0;
  }

  useEffect(() => {
    setChildBoardResult(calculateWinner());
  }, [childMatrix]);

  const updateChildMatrix = (row, column) => {
    let prevChildMatrix = childMatrix;
    prevChildMatrix[getIndexFromRowColumn(row, column)] = currentInput;
    setChildMatrix([...prevChildMatrix]);
    let prevAvailableIndices = availableIndices;
    prevAvailableIndices = prevAvailableIndices.filter(
      (item) => item !== getIndexFromRowColumn(row, column)
    );
    setAvailableIndices([...prevAvailableIndices]);
    dispatch(updateCurrentInput());
    dispatch(updateCurrentGrid(getIndexFromRowColumn(row, column)));
  };

  useEffect(() => {
    // console.log(
    //   "bot check: gametype is ",
    //   gameType,
    //   " currentInput is ",
    //   currentInput,
    //   " current bot Grid is ",
    //   currentBotGrid
    // );
    if (
      gameType === 1 &&
      currentInput === 2 &&
      (currentGrid === getIndexFromRowColumn(row, column) ||
        getIndexFromRowColumn(row, column) === currentBotGrid)
    ) {
      setTimeout(() => {
        let randomIndex = Math.floor(Math.random() * availableIndices.length);

        let randomValue = availableIndices[randomIndex];

        let prevAvailableIndices = availableIndices;
        prevAvailableIndices = prevAvailableIndices.filter(
          (item) => item !== randomValue
        );

        setAvailableIndices([...prevAvailableIndices]);

        let prevChildMatrix = childMatrix;

        prevChildMatrix[randomValue] = 2;

        setChildMatrix([...prevChildMatrix]);

        dispatch(updateCurrentInput());
        play();

        let { newRow, newColumn } = getRowColumnFromIndex(randomValue);
        dispatch(updateCurrentGrid(getIndexFromRowColumn(newRow, newColumn)));
      }, 2000);
    }
  }, [currentInput]);

  const renderChildBoardItems = (row, column, value) => {
    return (
      <Grid
        item
        xs={4}
        sx={{
          filter: "invert(100%);",
        }}
      >
        <ChildBoardItem
          row={row}
          column={column}
          updateChildMatrix={updateChildMatrix}
          value={value}
          gridEnabled={gridEnabled}
        />
      </Grid>
    );
  };

  const matrixElements = [];

  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
      matrixElements.push(
        renderChildBoardItems(
          row,
          column,
          childMatrix[getIndexFromRowColumn(row, column)]
        )
      );
    }
  }

  return (
    <>
      {/* <Box sx={{ margin: "1vw" }}>winner={childBoardResult}</Box> */}
      {/* <img src={gridImage} style={{ width: "100%" }} /> */}
      {value === 0 ? (
        <Grid
          container
          direction="row"
          // justifyContent="space-evenly"
          // alignItems="center"
          // alignItems="stretch"
          // spacing={1}
          sx={{
            //   position: "relative",
            //   top: -210,
            //   left: 0,
            filter: "invert(100%);",
            background: `url(${gridImage})`,
            backgroundSize: "cover", // Ensures the image covers the entire div
            backgroundPosition: "center", // Centers the image within the div
            backgroundRepeat: "no-repeat",
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
          >
            {value === 1 ? (
              <div
                class={"marker"}
                style={{ fontSize: "16vh", position: "relative", top: "2vh" }}
              >
                ⛌
              </div>
            ) : (
              <div class={"marker"} style={{ fontSize: "16vh" }}>
                ◯
              </div>
            )}
          </Box>
        </Zoom>
      )}
    </>
  );
};

export default ChildBoard;
