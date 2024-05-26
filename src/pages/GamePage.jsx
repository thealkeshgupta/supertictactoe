import { Box, Grid, Paper } from "@mui/material";
import ChildBoard from "../components/ChildBoard";
import ParentBoard from "../components/ParentBoard";
import LeftPane from "../components/LeftPane";
import RightPane from "../components/RightPane";
import Title from "../components/Title";

const GamePage = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={2.5}>
          <Box align="center" sx={{}}>
            <LeftPane />
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box align="center" sx={{ marginTop: "5vh" }}>
            <ParentBoard />
          </Box>
        </Grid>
        <Grid item xs={2.5}>
          <RightPane />
        </Grid>
      </Grid>
    </>
  );
};

export default GamePage;
