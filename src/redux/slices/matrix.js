import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentInput: 1,
  currentGrid: -1,
  availableGrids: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  gameType: 1,
  player1Name: "",
  player2Name: "Bot",
  currentBotGrid: -1,
  matrix: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
};

const navigationSlice = createSlice({
  name: "matrix",
  initialState,
  reducers: {
    setMatrixValue: (state, action) => {
      let { row, column, value } = action.payload;
      let prevMatrix = state.matrix;
      prevMatrix[row][column] = value;
      state.matrix = prevMatrix;
    },
    updateCurrentInput: (state, action) => {
      if (state.currentInput === 1) {
        state.currentInput = 2;
      } else {
        state.currentInput = 1;
      }
    },
    updateCurrentGrid: (state, action) => {
      state.currentGrid = action.payload;
    },
    updateAvailableGrids: (state, action) => {
      state.availableGrids = [...action.payload];
    },
    setGameType: (state, action) => {
      state.gameType = action.payload;
    },
    setPlayer1Name: (state, action) => {
      state.player1Name = action.payload;
    },
    setPlayer2Name: (state, action) => {
      state.player2Name = action.payload;
    },
    setCurrentBotGrid: (state, action) => {
      state.currentBotGrid = action.payload;
    },
  },
});

export default navigationSlice.reducer;
export const {
  setMatrixValue,
  updateCurrentInput,
  updateCurrentGrid,
  setPlayer1Name,
  setPlayer2Name,
  setGameType,
  updateAvailableGrids,
  setCurrentBotGrid,
} = navigationSlice.actions;
