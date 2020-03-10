import { configure, addDecorator, addParameters } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import "@storybook/addon-console";
import { withConsole } from "@storybook/addon-console";

//Accessibility
addDecorator(withA11y);
addParameters({});
//console
addDecorator((storyFn, context) => withConsole()(storyFn)(context));

// automatically import all files ending in *.stories.js
configure(
  [
    require.context("../src/components", true, /\.stories\.js$/),
    require.context("../stories", true, /\.stories\.js$/)
  ],
  module
);
