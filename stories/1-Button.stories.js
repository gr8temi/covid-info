import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button } from "@storybook/react/demo";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

export default {
  title: "Button",
  decorators: [withKnobs]
};

export const textButton = () => (
  <Button
    onClick={e => action("let me alone")(e.target)}
    disabled={boolean("Disabled", false)}
  >
    Hello Button
  </Button>
);

// Knobs as dynamic variables.
export const asDynamicVariables = () => {
  const name = text("Name", "Arunoda Susiripala");
  const age = number("Age", 89);

  const content = `I am ${name} and I'm ${age} years old.`;
  return <div>{content}</div>;
};
