/**
 * @module app.mjs
 * @description This file is the main entry point for the application.
 */

import {
  displayRandomNumbers,
  unlockSettings,
} from "./handlers/unlockSettings.mjs";

export const pressedButton = document.querySelectorAll(".btn-custom");
export const cogIcon = document.querySelector(".cog-icon");
export const numberButtons = document.querySelectorAll(".btn-number");

// Button changes on mouse down and mouse up
pressedButton.forEach((button) => {
  button.addEventListener("mousedown", () => {
    button.classList.add("btn-custom-pressed");
  });

  button.addEventListener("mouseup", () => {
    button.classList.remove("btn-custom-pressed");
  });
});

// Cog icon changes on click
cogIcon.addEventListener("click", () => {
  cogIcon.classList.toggle("cog-icon-pressed");
});

displayRandomNumbers();
unlockSettings();
