import { choresArray } from '../UI/choresArray.mjs';
import { allDone } from '../handlers/allDone.mjs';
import { choreCompleted } from '../handlers/handleCardFlip.mjs';

export const choreListContainer = document.getElementById('chore-list-container');

export function renderChoresList(array) {

    array.forEach(chore => {
        if (!chore.display) {
            return;
        } else {

        const cardFlip = document.createElement('div');
        cardFlip.classList.add('card-flip');
        cardFlip.onclick = function() {
            this.classList.toggle('flipped');
            choreCompleted(chore);
            allDone();

        };
        const card = document.createElement('div');
        card.classList.add('card', 'border-0', 'card-inner');
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        const cardBodyFront = document.createElement('div');
        cardBodyFront.classList.add('card-body', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-between');
        const imgFront = document.createElement('img');
        imgFront.src = chore.image;
        imgFront.classList.add('card-img', 'mt-2');
        imgFront.alt = chore.name;
        const h2Front = document.createElement('h2');
        h2Front.classList.add('card-title', 'mt-2', 'mb-2', 'h3');
        h2Front.textContent = chore.name;
        cardBodyFront.appendChild(imgFront);
        cardBodyFront.appendChild(h2Front);
        cardFront.appendChild(cardBodyFront);
        
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        const cardBodyBack = document.createElement('div');
        cardBodyBack.classList.add('card-body', 'd-flex', 'align-items-center', 'justify-content-center');
        const imgBack = document.createElement('img');
        imgBack.src = '../images/star.svg';
        imgBack.alt = 'a star';
        imgBack.classList.add('m-0', 'p-0');
        cardBodyBack.appendChild(imgBack);
        cardBack.appendChild(cardBodyBack);
        card.appendChild(cardFront);
        card.appendChild(cardBack);
        cardFlip.appendChild(card);
        choreListContainer.appendChild(cardFlip);


        //if the chore is completed, card should be viewed as flipped
        if (chore.completed) {
            cardFlip.classList.add('flipped');
        }

        
    }
    }
    );
}

export function displayChoresList() {
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('child');
    console.log('User: ', userName);
    if (!userName) {
        console.error('User not found in query string');
        return;
    }
    localStorage.getItem('localUsers');
    const userChores = JSON.parse(localStorage.getItem('localUsers')).find(user => user.name === userName);
    const name  = document.getElementById('name');
    name.textContent = userName;
    const choresArray = userChores.chores;
    renderChoresList(choresArray);
}



//html for reference


    //     <div class="card-flip" onclick="this.classList.toggle('flipped')">
    //     <div class="card border-0 card-inner">
    //       <div class="card-front">
    //         <div class="card-body">
    //             <img src="../images/chores/get-dressed.svg" class="card-img mt-2" alt="get dressed">
    //             <h2 class="card-title mt-2">Get Dressed</h2>
    //         </div>
    //       </div>
    //       <div class="card-back">
    //         <div class="card-body d-flex align-items-center justify-content-center">
    //             <img src="../images/star.svg" alt="a star" class=" m-0 p-0">
    //         </div>
    //       </div>
    //     </div>
    //   </div>