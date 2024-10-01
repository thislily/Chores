// create a checkbox for each chore in the choresArray and append it to the choreOptionsForm

import { choresArray } from "../UI/choresArray.mjs";

export const choreOptionsForm = document.getElementById('chore-options-form');
export const choreListGroup = document.getElementById('chore-list-group');

export function renderChoreOptions(array) {
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
    renderChoreOptions(choresArray);
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