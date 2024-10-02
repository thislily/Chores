// create a checkbox for each chore in the choresArray and append it to the choreOptionsForm
import { choresArray } from "../UI/choresArray.mjs";

export const choreOptionsForm = document.getElementById('chore-options-form');
export const choreListGroup = document.getElementById('chore-list-group');

export function renderChoreOptions(array) {

    const name  = document.getElementById('name');
    name.style.fontSize = '96px';
    name.innerText = window.location.search.split('=')[1];

    const childButtons = document.querySelector('.child-buttons');
    childButtons.classList.add('d-none');
    childButtons.classList.remove('w-50');


    const saveChangesButton = document.getElementById('save-changes-button');
    saveChangesButton.classList.remove('d-none');

    const backButton = document.getElementById('back-button');
    //change href to go back to choose a child to edit
    backButton.href = '/chore-list/edit/index.html';



    array.forEach(chore => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'bg-transparent', 'border-0', 'fs-2');
        
        const input = document.createElement('input');
        input.classList.add('form-check-input');
        input.type = 'checkbox';
        input.value = '';
        input.id = chore.name;
        input.checked = true;
        input.dataset.name = chore.name;
        input.dataset.image = chore.image;
        input.dataset.completed = chore.completed;
        input.dataset.display = chore.display;
        
        if (chore.display === false) {
            input.checked = false;
        }
        
        const label = document.createElement('label');
        label.classList.add('form-check-label', 'ps-3', 'pt-1', 'text-secondary');
        label.innerText = chore.name;
        label.htmlFor = chore.name;
        
        listItem.appendChild(input);
        listItem.appendChild(label);
        choreListGroup.appendChild(listItem);
    });
}

export function displayChoreOptions() {
    // Get the query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('child');
    console.log('User: ', userName);
    
    if (!userName) {
        console.error('User not found in query string');
        return;
    }

    // Get the localUsers from local storage
    const localUsers = JSON.parse(localStorage.getItem('localUsers'));

    if (!localUsers) {
        console.error('No users found in local storage');
        return;
    }

    // Get the user object from the localUsers array
    const user = localUsers.find(user => user.name === userName);

    if (!user) {
        console.error('User not found in local storage');
        return;
    }

    // Get the chores array from the user object
    const userChoresArray = user.chores;

    // Render the chore options
    renderChoreOptions(userChoresArray);
}





/* <form action="submit">
<div class="list-group bg-transparent mb-5">
    <li class="list-group-item bg-transparent border-0 fs-2">
      <input class="form-check-input" checked type="checkbox" value="" id="get-dressed" />
      <label class="form-check-label ps-2 pt-1 text-secondary" for="get-dressed">Get Dressed</label>
    </li>

  </div>

  <button class="btn-custom fs-1 p-3 px-4 rounded-5">
    Save Changes
  </button>
</form> */