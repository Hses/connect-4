import { Alert, Button, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import "./App.css";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, i) => ({
    item,
    selected: null,
  }));
  const swapPlayer = (current = "O") => (current === "O" ? "X" : "O");
  const [player, setPlayer] = useState(swapPlayer());
  const [state, setstate] = useState(items);
  const [open, setOpen] = useState(false);
  const [win, setwin] = useState(false);

  const findTerminal = (lookup, coords) => {
    const nums = lookup.map((l) => l.item);
    return coords.some((f) => f.every((item) => nums.includes(item)));
  };

  const clickedRow = (e, row) => {
    if (win) return;
    const toChange = state.find((s) => s.item === row.item);
    if (!row.selected) {
      toChange.selected = player;
    }
    // kegi logic
    const lookup = state.filter((s) => s.selected === player);
    let BIG_WIN = false;
    BIG_WIN = findTerminal(lookup, [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 5, 9],
      [3, 5, 7],
    ]);
    if (BIG_WIN) {
      setwin(BIG_WIN);
      setOpen(true);
      setstate([...state]);
    } else {
      setstate([...state]);
      setPlayer(swapPlayer(player));
    }
  };
  const handleClose = (event, reason) => {
    setOpen(false);
  };
  console.log(state);

  const restartGame = () => {
    setwin(false);
    setstate(items);
    setPlayer(swapPlayer());
  };

  const gridItems = () =>
    state.map(({ item, selected }) => (
      <Grid key={item} item xs={4}>
        <Item
          onClick={(e) => clickedRow(e, { item, selected })}
          className="ticc_box"
        >
          {selected}
        </Item>
      </Grid>
    ));
  return (
    <>
      <Box className="app" sx={{ width: "100%" }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 3 }}>
          {gridItems()}
        </Grid>
      </Box>
      <Box sx={{ width: "100%", padding: "2rem 0" }}>
        <Button onClick={() => restartGame()} variant="contained">
          Restart game.
        </Button>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {player} wins!
        </Alert>
      </Snackbar>
    </>
  );
} 

export default App;
