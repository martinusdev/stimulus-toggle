# Toggle Controller

A lightweight Stimulus controller to dynamically toggle the visibility of elements based on the value of user inputs such as dropdowns, checkboxes, and radio buttons. It uses data attributes to define toggle sets and conditions.

## Features
- Supports dropdowns, checkboxes, and radio buttons.
- Easily configurable with `data-*` attributes.
- Handles toggling for grouped or individual elements.
- Supports a11y by toggling `aria-hidden` attribute, setting `aria-controls` on the toggle controls, as well as `aria-expanded` when necessary.

## Installation

Install via npm:

```bash
npm add stimulus-toggle-kit
```

## Usage

1.	Import the controller into your Stimulus setup:

```javascript
import { Application } from "@hotwired/stimulus";
import ToggleController from "toggle-controller";

const application = Application.start();
application.register("toggle", ToggleController);
```

2.	Configure your HTML with the required data-* attributes.
 
Basic example:

```html
<div data-controller="toggle">
    <!-- select controller target -->
    <select data-toggle-target="select" data-action="toggle#changed">
        <option>Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
    </select>

    <!-- checkbox controller target -->
    <input type="checkbox" data-toggle-target="checkbox" data-action="toggle#changed" value="option3">

    <!-- radio controller target -->
    <div data-toggle-target="radio">
        <label>
          <input type="radio" data-action="toggle#changed" name="option" value="option4">
          Option 4
        </label>
        <label>
          <input type="radio" data-action="toggle#changed" name="option" value="option5">
          Option 5
        </label>
    </div>

    <!-- element controller targets -->
    <div data-toggle-target="element" data-values="option1,option3,option4">
        Content for options 1, 3 or 4
    </div>
    <div data-toggle-target="element" data-values="option2,option5">
        Content for options 2 or 5
    </div>
</div>
```

More advanced example, using multiple toggle sets:

```html
<div data-controller="toggle">
  <!-- set1 controller targets -->
  <select data-toggle-target="select" data-action="toggle#changed" data-toggle-set="set1">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
  </select>
  <input type="checkbox" data-toggle-target="checkbox" data-action="toggle#changed" value="option3" data-toggle-set="set1">

  <!-- set2 controller targets -->
  <select data-toggle-target="select" data-action="toggle#changed" data-toggle-set="set2">
    <option value="option4">Option 4</option>
    <option value="option5">Option 5</option>
  </select>
  <input type="checkbox" data-toggle-target="checkbox" data-action="toggle#changed" value="option6" data-toggle-set="set2">

  <!-- element controller targets -->
  <div data-toggle-target="element" data-values="option1,option3" data-toggle-set="set1">
    Content for Option 1 or 3 from set1
  </div>
  <div data-toggle-target="element" data-values="option2" data-toggle-set="set1">
    Content for Option 2 from set1
  </div>
  <div data-toggle-target="element" data-values="option4,option6" data-toggle-set="set2">
    Content for Option 4 or 6 from set2
  </div>
  <div data-toggle-target="element" data-values="option5" data-toggle-set="set2">
    Content for Option 5 from set2
  </div>
</div>
```

## Data Attribute Reference

* `data-toggle-set` (optional)
  * Specifies the toggle set(s) the element belongs to. Comma-separated for multiple sets.
* `data-values`
  * Defines the value(s) that should make the element visible. Comma-separated for multiple values.
* `data-toggle-target`
  * Indicates the target type
  * `element` - this will make the element a toggle target
  * `select` - this will make the select element a toggle control
  * `checkbox` - this will make the checkbox element a toggle control
  * `radio` - this will make the radio elements within the parent element toggle controls
    * Please note, all of the radio buttons of the same name should be wrapped in a containing div with the `data-toggle-target="radio"` attribute. See example above.