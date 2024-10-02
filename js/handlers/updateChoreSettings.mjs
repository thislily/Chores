//on click of save changes button, update the chore.display value to true or false in local storage for the specific user, to reflect the changes in the chore list

import { setUsers } from "../UI/localUsers.mjs";
import { choreOptionsForm } from "../render/choreOptions.mjs";

export const saveChangesButton = document.getElementById('save-changes-button');

export function updateChoreSettings() {
    saveChangesButton.addEventListener('click', (e) => {
        e.preventDefault();
        const localUsers = JSON.parse(localStorage.getItem('localUsers'));
        const urlParams = new URLSearchParams(window.location.search);
        const userName = urlParams.get('child');
        const checkboxes = document.querySelectorAll('.form-check-input');
        checkboxes.forEach(checkbox => {
            localUsers.forEach(user => {
                if (user.name === userName) {
                    user.chores.forEach(chore => {
                        if (chore.name === checkbox.dataset.name) {
                            chore.display = checkbox.checked;
                        }
                    });
                }
            });
        });
        localStorage.setItem('localUsers', JSON.stringify(localUsers));
        console.log('Users stored in local storage: ', localStorage.getItem('localUsers'));

        window.location.href = "/chore-list/index.html?child=" + userName;
    });
}

