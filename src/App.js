import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import songs from "./Songs";
import styled from "styled-components";

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

export default App;

function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const [songIndex, setSongIndex] = React.useState(null);

  const toggleDrawer = (side, open) => event => {
    setState({ ...state, [side]: open });
  };

  const setSong = index => () => {
    setSongIndex(index);
    setState({ ...state, ["left"]: false });
  };
  // https://material-ui.com/components/drawers/
  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
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

  return (
    <div>
      <Button onClick={toggleDrawer("left", true)}>{"Meny >"}</Button>

      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {sideList("left")}
      </SwipeableDrawer>
      {songIndex == null ? (
        <h1>"Ingen sang valgt"</h1>
      ) : (
        <Song song={songs[songIndex]} />
      )}
    </div>
  );
}

const SongWrapper = styled.div`
  padding: 10px;
`;

const Song = ({ song }) => (
  <SongWrapper className="song-wrapper">
    <h1>{song.title}</h1>
    <h2>{song.mel}</h2>
    <pre>{song.song}</pre>
  </SongWrapper>
);
