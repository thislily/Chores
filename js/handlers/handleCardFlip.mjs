//on card flip, update local storage with the chore.completed value set now to true, and the reverse if the card is flipped back

export function choreCompleted(chore) {
    const localUsers = JSON.parse(localStorage.getItem('localUsers'));
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('child');
    const user = localUsers.find(user => user.name === userName);
    const completedChore = user.chores.find(c => c.name === chore.name);
//update local storage with the chore.completed value set now to true
    completedChore.completed = !completedChore.completed;
    localStorage.setItem('localUsers', JSON.stringify(localUsers));
    console.log('Chore completed: ', completedChore);

    //once the card is flipped back, update local storage with the chore.completed value set now to false
    if (!completedChore.completed) {
        completedChore.completed = false;
        localStorage.setItem('localUsers', JSON.stringify(localUsers));
        console.log('Chore not completed: ', completedChore);
    }
}
 