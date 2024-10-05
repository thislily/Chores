//AM and PM buttons for the user to choose from

import { displayChoreOptions } from "../render/choreOptions.mjs";
import { handleCheckboxes } from "../handlers/updateChoreSettings.mjs"; // Assuming handleCheckboxes is in this file

export function handleAMorPMButtons() {
  const morning = document.getElementById("morning");
  const evening = document.getElementById("evening");

  // Get the user based on the query parameter in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get("child");

  // Get the localUsers from local storage
  const localUsers = JSON.parse(localStorage.getItem("localUsers"));

  // Find the specific user
  const user = localUsers.find((user) => user.name === userName);

  if (!user) {
    console.error(`User "${userName}" not found in local storage.`);
    return;
  }

  // Event listener for AM button
  morning.addEventListener("click", () => {
    // Save the current checklist before switching
    handleCheckboxes();
    const audio = new Audio("../../sounds/button-press.mp3");
    audio.play();

    // Switch to the morning checklist
    morning.classList.add("btn-AMPM-pressed");
    evening.classList.remove("btn-AMPM-pressed");

    // Display the user's morning chores (choresAM)
    displayChoreOptions(user.choresAM);
  });

  // Event listener for PM button
  evening.addEventListener("click", () => {
    // Save the current checklist before switching
    handleCheckboxes();
    const audio = new Audio("../../sounds/button-press.mp3");
    audio.play();

    // Switch to the evening checklist
    evening.classList.add("btn-AMPM-pressed");
    morning.classList.remove("btn-AMPM-pressed");

    // Display the user's evening chores (choresPM)
    displayChoreOptions(user.choresPM);
  });
}
