# WIP

This project is in active development

# Quarks

<image src="https://raw.githubusercontent.com/quarks-css/quarks/main/src/assets/quarks-logo.png" width="80px">

## What are quarks?

Quarks are React components, but with all valid CSS properties available as props. They use
[Goober](https://github.com/cristianbote/goober) to inject styles either statically or dynamically as needed.

## Why quarks?

### 1. Enforce syntax and types via Typescript 🤓

- Many CSS-in-JS libraries rely on tagged template literals to create component styles, sometimes offering object syntax
  as an alternative. However, **template literals forego the benefits of Typescript** since the contents of template
  literals are not evaluated. This allows for mistakes to go unchecked. With Quarks type-safety is **always** enforced.

### 2. Directly referenced theme values

- Most CSS-in-JS libraries provide access to a theme via a prop argument in a callback. But lazy or inexperienced
  developers usually don't take advantage of that and instead either import theme values or hard-code style values
  because it's easier 😱. One of quarks' main goals is to make referencing theme values easier than hard-coding styles,
  ensuring that your application's theme is consistently followed and easy to change.

### 3. Easily apply conditional styling

- Nearly all CSS-in-JS libraries allow for conditional styling via custom props. Having to name and keep track of all of
  these props is a needless hassle that leads to poor naming and confusing code 🍝. Since your components' state, props,
  or other variables are already available to quarks via props, **this is never a problem.**

### 4. Avoid convoluted component names

- Most CSS-in-JS libraries require each styled element to be declared as a separate React component. That means having
  to come up with (yet another) descriptive name for **every element**. This wastes time and can lead to confusion when
  elements inevitably have similar or convoluted names. Since each quark is only unique in its element tag name, it's
  always clear what each quark represents and there's never a need to spend time trying to uniquely name them.

## Why "quarks"?

It's a reference to Brad Frost's
[Atomic Design Methodology](https://bradfrost.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-21-at-9.18.09-AM-1024x575.png).
If atoms are your smallest design element that make up buttons, icons, text, etc., then what make up atoms? Quarks of
course!

## **Authors**

<div>
  <table>
  <tr>
    <td align="center">
      <a href="https://github.com/dslovinsky">
        <img src="https://avatars.githubusercontent.com/u/65476034?v=4" width="100;" alt="dslovinsky"/>
        <br />
        <sub><b>Daniel Slovinsky</b></sub>
      </a>
      </td>
      <td align="center">
        <a href="https://github.com/jpwallace22">
          <img src="https://avatars.githubusercontent.com/u/93415734?v=4" width="100;" alt="jpwallace22"/>
          <br />
          <sub><b>Justin Wallace</b></sub>
        </a>
      </td>
    <tr>
  </table>
</div>
