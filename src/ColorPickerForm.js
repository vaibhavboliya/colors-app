import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/ColorPickerFormStyles";

function ColorPickerForm(props) {
  const [currentColor, setCurrentColor] = useState("teal");
  const [newColorName, setnewColorName] = useState("");
  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      props.colors.every(({ color }) => color !== currentColor)
    );
  }, []);

  const updateCurrentColor = (newColor) => {
    setCurrentColor(newColor.hex);
  };
  const handleChange = (evt) => {
    setnewColorName(evt.target.value);
  };
  const handleSubmit = () => {
    const newColor = {
      color: currentColor,
      name: newColorName,
    };
    props.addNewColor(newColor);
    setnewColorName("");
  };

  const { paletteIsFull, classes } = props;
  return (
    <div>
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateCurrentColor}
        className={classes.picker}
      />
      <ValidatorForm
        onSubmit={handleSubmit}
        useref="form"
        instantValidate={false}
      >
        <TextValidator
          value={newColorName}
          className={classes.colorNameInput}
          placeholder="Color Name"
          name="newColorName"
          variant="filled"
          margin="normal"
          onChange={handleChange}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Enter a color name",
            "Color name must be unique",
            "Color already used!",
          ]}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={paletteIsFull}
          className={classes.addColor}
          style={{
            backgroundColor: paletteIsFull ? "grey" : currentColor,
          }}
        >
          {paletteIsFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default withStyles(styles)(ColorPickerForm);
