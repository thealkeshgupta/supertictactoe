import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GamePage from "./pages/GamePage";
import EntryPage from "./pages/EntryPage";
import "./App.css";
import ReactCardFlip from "react-card-flip";
function App() {
  const dispatch = useDispatch();

  const page = useSelector((state) => state.navigation.page);

  const returnPage = () => {
    if (page === 1) {
      return <EntryPage />;
    }
    if (page === 2) {
      return <GamePage />;
    }
  };

  return (
    <>
      <ReactCardFlip isFlipped={page === 2} flipDirection="horizontal">
        <div>
          <EntryPage />
        </div>

        <div>
          <GamePage />
        </div>
      </ReactCardFlip>
    </>
  );
}

export default App;
