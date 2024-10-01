/**
 * @module app.mjs
 * @description This file is the main entry point for the application.
 */

import {
  displayRandomNumbers,
  unlockSettings,
} from "./handlers/unlockSettings.mjs";
import { choreListContainer, displayChoresList } from "./render/choresList.mjs";
import { setUsers } from "./UI/localUsers.mjs";
import { choreOptionsForm, displayChoreOptions } from "./render/choreOptions.mjs";

export const pressedButton = document.querySelectorAll(".btn-custom");
export const cogIcon = document.querySelector(".cog-icon");
export const numberButtons = document.querySelectorAll(".btn-number");


// Button changes on mouse down and mouse up
if (pressedButton){
  pressedButton.forEach((button) => {
    button.addEventListener("mousedown", () => {
      button.classList.add("btn-custom-pressed");
    });
  
    button.addEventListener("mouseup", () => {
      button.classList.remove("btn-custom-pressed");
    });
  });
}


// Cog icon changes on click
if (cogIcon){
  cogIcon.addEventListener("click", () => {
    cogIcon.classList.toggle("cog-icon-pressed");
  });

  displayRandomNumbers();
  unlockSettings();
}

if (choreListContainer) {
  displayChoresList();
}

if (choreOptionsForm) {
  displayChoreOptions();
}

if (localStorage.getItem('localUsers') === null) {
  setUsers();
}

