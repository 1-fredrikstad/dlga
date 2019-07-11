import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

function App() {
  return (
    <div className="App">
      <SwipeableTemporaryDrawer />
    </div>
  );
}

const songs = [
  {
    title: "1. Speiderbønn",
    mel: "melody",
    song: `
    Kjære far i høye himmel,
    hør mitt hjertes stille bønn:
    hvor jeg er i verdens vrimmel
    
    `
  }
];

export default App;

function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const [songIndex, setSongIndex] = React.useState(null);

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const setSong = index => () => {
    setSongIndex(index);
  };
  // https://material-ui.com/components/drawers/
  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {songs.map((song, index) => (
          <ListItem button key={index} onClick={setSong(index)}>
            <ListItemText primary={song.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const content =
    songIndex == null ? (
      "Ingen sang valgt"
    ) : (
      <div>
        <h1>{songs[songIndex].title}</h1>
        <h2>{songs[songIndex].mel}</h2>
        <pre>{songs[songIndex].song}</pre>
      </div>
    );
  console.log("state:", songIndex);

  return (
    <div>
      <Button onClick={toggleDrawer("left", true)}>Open Left</Button>

      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {sideList("left")}
      </SwipeableDrawer>
      {content}
    </div>
  );
}
