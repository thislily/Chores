//check if all chores in local storage are completed, and if so, display a message

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
    }
}