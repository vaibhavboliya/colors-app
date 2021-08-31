import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/styles";
import MiniPalette from "./MiniPalette";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import styles from "./styles/PaletteListStyles";

function PaletteList(props) {
  const [openDeleteDialog, setopenDeleteDialog] = useState(false);
  const [deletingId, setdeletingId] = useState("");

  const openDialog = (id) => {
    setopenDeleteDialog(true);
    setdeletingId(id);
  };
  const closeDialog = () => {
    setopenDeleteDialog(false);
    setdeletingId("");
  };
  const goToPalette = (id) => {
    props.history.push(`/palette/${id}`);
  };
  const handleDelete = () => {
    props.deletePalette(deletingId);
    closeDialog();
  };

  const { palettes, classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>Color App</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <TransitionGroup className={classes.palettes}>
          {palettes.map((palette) => (
            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
              <MiniPalette
                {...palette}
                goToPalette={goToPalette}
                openDialog={openDialog}
                key={palette.id}
                id={palette.id}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Dialog
        open={openDeleteDialog}
        aria-labelledby="delete-dialog-title"
        onClose={closeDialog}
      >
        <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
        <List>
          <ListItem button onClick={handleDelete}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel" />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(PaletteList);
