//check if all chores in local storage are completed, and if so, display a message

import { choreListContainer } from "../render/choresList.mjs";

export function allDone() {
    const localUsers = JSON.parse(localStorage.getItem('localUsers'));
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('child');
    const user = localUsers.find(user => user.name === userName);
    //list of all chores that are set to display: true
    const allChores = user.chores.filter(chore => chore.display === true);
    const completedChores = allChores.filter(chore => chore.completed);
    if (completedChores.length === allChores.length) {
        console.log('All chores are done!');
        const successAudio = new Audio('../../sounds/success.mp3');
        choreListContainer.innerHTML = '';
        const starButton = document.createElement('a');
        starButton.classList.add('btn-star');
        starButton.innerHTML = '<img src="../../images/star.svg" alt="a star" class="m-0 p-0">';
        choreListContainer.appendChild(starButton);

        if (starButton){
            starButton.addEventListener("mousedown", () => {
              starButton.classList.add("btn-star-pressed");
            });
          
            starButton.addEventListener("mouseup", () => {
              starButton.classList.remove("btn-star-pressed");

              //redirect to the rewards page after 1.5 seconds
                setTimeout(() => {
                    window.location.href = '/reward/index.html?child=' + userName;
                }, 400);
            });
          }

        const name = document.getElementById('name');
        name.textContent = userName + ', you did it!';
        name.classList.add('text-center', 'mt-5', 'h2');

        //play success sound after 1.5 seconds
        setTimeout(() => {
            successAudio.play();
        }, 400);

    }
}