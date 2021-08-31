import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";

function Palette(props) {
  const [level, setlevel] = useState(500);
  const [format, setformat] = useState("hex");

  const changeLevel = (level) => {
    setlevel(level);
  };
  const changeFormat = (val) => {
    setformat(val);
  };

  const { colors, paletteName, emoji, id } = props.palette;
  const { classes } = props;
  const colorBoxes = colors[level].map((color) => (
    <ColorBox
      background={color[format]}
      name={color.name}
      key={color.id}
      moreUrl={`/palette/${id}/${color.id}`}
      showingFullPalette
    />
  ));
  return (
    <div className={classes.Palette}>
      <Navbar
        level={level}
        changeLevel={changeLevel}
        handleChange={changeFormat}
        showingAllColors
      />
      <div className={classes.colors}>{colorBoxes}</div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}

export default withStyles(styles)(Palette);
