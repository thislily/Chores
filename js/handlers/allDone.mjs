//check if all chores in local storage are completed, and if so, display a message

import { choreListContainer } from "../render/choresList.mjs";
import { checkTimeOfDay } from "../UI/checkTimeOfDay.mjs";

export function allDone() {
    const localUsers = JSON.parse(localStorage.getItem('localUsers'));
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('child');
    const user = localUsers.find(user => user.name === userName);

    // use checkTimeOfDay and if am List of all chores from choresAM that are set to display: true, or if pm List of all chores from choresPM that are set to display: true
    const allChores = checkTimeOfDay() === 'morning' ? user.choresAM.filter(chore => chore.display) : user.choresPM.filter(chore => chore.display);
    const completedChores = checkTimeOfDay() === 'morning' ? user.choresAM.filter(chore => chore.display && chore.completed) : user.choresPM.filter(chore => chore.display && chore.completed);

    if (completedChores.length === allChores.length) {

        const successAudio = new Audio('../../sounds/success.mp3');
        choreListContainer.innerHTML = '';

        const starButton = document.createElement('a');
        starButton.classList.add('btn-star');
        starButton.innerHTML = '<img src="../../images/star.svg" alt="a star" class="m-0 p-0">';
        choreListContainer.appendChild(starButton);

        if (starButton) {
            // Mouse events
            starButton.addEventListener("mousedown", () => {
              starButton.classList.add("btn-star-pressed");
              const audio = new Audio("../../sounds/button-press.mp3");
              audio.play();
            });
          
            starButton.addEventListener("mouseup", () => {
              starButton.classList.remove("btn-star-pressed");

              // Redirect to the rewards page after 400ms
              setTimeout(() => {
                  window.location.href = '/reward/index.html?child=' + userName;
              }, 400);
            });

            // Touch events for touch devices
            starButton.addEventListener("touchstart", () => {
              starButton.classList.add("btn-star-pressed");
              const audio = new Audio("../../sounds/button-press.mp3");
              audio.play();
            });

            starButton.addEventListener("touchend", () => {
              starButton.classList.remove("btn-star-pressed");

              // Redirect to the rewards page after 400ms
              setTimeout(() => {
                  window.location.href = '/reward/index.html?child=' + userName;
              }, 400);
            });
        }

        // Display success message
        const name = document.getElementById('name');
        name.textContent = userName + ', you did it!';
        name.classList.add('text-center', 'mt-5', 'h2');

        // Play success sound after 400ms
        setTimeout(() => {
            successAudio.play();
        }, 400);
    }
}
