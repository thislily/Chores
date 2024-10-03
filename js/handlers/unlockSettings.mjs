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
  let isTouch = false;  // Flag to detect touch

  numberButtons.forEach((button) => {
    // Mouse events
    button.addEventListener("mousedown", (event) => {
      if (isLocked || isTouch) return; // Skip mouse event if it was triggered by a touch

      button.classList.add("btn-number-pressed");
      key += button.value;
    });

    button.addEventListener("mouseup", () => {
      if (isLocked || isTouch) return; // Skip mouse event if it was triggered by a touch

      button.classList.remove("btn-number-pressed");
      const audio = new Audio("../sounds/button-press.mp3");
      audio.play();

      // Check if key length matches the correctKey length
      if (key.length === correctKey.length) {
        if (key === correctKey) {
          window.location.href = "chore-list/edit/index.html";
        } else {
          attempts++;
          key = ""; // Reset key on wrong input
          showFeedback();
        }
      }
    });

    // Touch events
    button.addEventListener("touchstart", () => {
      if (isLocked) return; // Skip interaction if locked

      isTouch = true; // Set the touch flag
      button.classList.add("btn-number-pressed");
      const audio = new Audio("../sounds/button-press.mp3");
      audio.play();
      key += button.value;
    });

    button.addEventListener("touchend", () => {
      button.classList.remove("btn-number-pressed");
      if (isLocked) return;

      // Check if key length matches the correctKey length
      if (key.length === correctKey.length) {
        if (key === correctKey) {
          window.location.href = "chore-list/edit/index.html";
        } else {
          attempts++;
          key = ""; // Reset key on wrong input
          showFeedback();
        }
      }

      // Reset the isTouch flag after 300ms to allow future mouse events
      setTimeout(() => {
        isTouch = false;
      }, 300);
    });

    function showFeedback() {
      settingsModal.classList.add("wiggle");
      setTimeout(() => {
        settingsModal.classList.remove("wiggle");
      }, 200);

      if (attempts === 3) {
        settingsWarning.innerText =
          "Too many attempts. Please try again in 2 minutes.";
        isLocked = true;
        key = ""; // Clear the key after 3 attempts

        setTimeout(() => {
          isLocked = false;
          attempts = 0;
          settingsWarning.innerText = "";
          displayRandomNumbers();
        }, 120000); // 2 minutes lock
      } else {
        settingsWarning.innerText = "Incorrect numbers, you have " + (3 - attempts) + " attempts left.";
      }
    }
  });
}
