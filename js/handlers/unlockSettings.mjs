/**
 * @module js/handlers/unlockSettings
 * @description This module contains the functions to unlock the settings modal by pressing the correct numbers in the correct order.
 */


export const writtenNumbers = document.getElementById("written-numbers");
export const numberButtons = document.querySelectorAll(".btn-number");
export const settingsModal = document.getElementById("settings-modal");
export const settingsWarning = document.getElementById("settings-warning");
export const writtenNumbersArray = [
  { text: "One", value: "1" },
  { text: "Two", value: "2" },
  { text: "Three", value: "3" },
  { text: "Four", value: "4" },
  { text: "Five", value: "5" },
  { text: "Six", value: "6" },
  { text: "Seven", value: "7" },
  { text: "Eight", value: "8" },
  { text: "Nine", value: "9" }
];

/**
 * generate 3 random numbers from the writtenNumbersArray and display them on the screen
 * The numbers are displayed as text, but the dataset.value attribute contains the actual numbers
 */

export function displayRandomNumbers() {
  let randomNumbers = [];
  for (let i = 0; i < 3; i++) {
    let randomIndex = Math.floor(Math.random() * writtenNumbersArray.length);
    randomNumbers.push(writtenNumbersArray[randomIndex]);
  }

  writtenNumbers.innerText = randomNumbers
    .map((number) => number.text)
    .join(", ");
  writtenNumbers.dataset.value = randomNumbers
    .map((number) => number.value)
    .join("");
}

/**
 * Unlock the settings page by pressing the correct numbers in the correct order
 * If the user presses the wrong numbers, they get feedback and after 3 wrong attempts, the modal is locked for 2 minutes
 * If the user presses the correct numbers, they are redirected to the settings page 
 */

export function unlockSettings() {
  let correctKey = writtenNumbers.dataset.value;
  let key = "";
  let attempts = 0;
  let isLocked = false; // To lock the modal after 3 failed attempts

  numberButtons.forEach((button) => {
    button.addEventListener("mousedown", () => {
      if (isLocked) return; // If locked, don't allow interaction

      button.classList.add("btn-number-pressed");
      key += button.value;
    });

    button.addEventListener("mouseup", () => {
      button.classList.remove("btn-number-pressed");
      if (isLocked) return;

      // Check if key length matches the correctKey length
      if (key.length === correctKey.length) {
        if (key === correctKey) {
          // If the key is correct, redirect to settings page
          window.location.href = "chore-list/edit/index.html";
        } else {
          attempts++;
          key = ""; // Reset key on wrong input

          // Wiggle and give feedback
          settingsModal.classList.add("wiggle");
          setTimeout(() => {
            settingsModal.classList.remove("wiggle");
          }, 200);

          if (attempts === 3) {
            // After 3 wrong attempts, lock the modal
            settingsWarning.innerText =
              "Too many attempts. Please try again in 2 minutes.";
            isLocked = true;
            key = ""; // Clear the key after 3 attempts

            // Lock the modal for 2 minutes
            setTimeout(() => {
              isLocked = false;
              attempts = 0;
              settingsWarning.innerText = "";
              displayRandomNumbers(); // Optionally reset the numbers
            }, 120000); // 2 minutes lock
          } else {
            // For wrong attempts < 3, give an error message
            settingsWarning.innerText = "Incorrect numbers, you have " + (3 - attempts) + " attempts left.";
          }
        }
      }
    });
  });
}
