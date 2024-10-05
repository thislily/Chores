import { choresArrayPM, choresArrayAM } from "../UI/choresArray.mjs";

/**
 * @module choresList.mjs
 * @description This module contains the functions to render the chores list on the edit screen.
 *
 */

export const choreOptionsForm = document.getElementById("chore-options-form");
export const choreListGroup = document.getElementById("chore-list-group");
export const chooseAmOrPm = document.getElementById("choose-am-or-pm");

// create a checkbox for each chore in the choresArrays and append it to the choreOptionsForm
export function renderChoreOptions(array) {
  choreListGroup.innerHTML = "";
  const name = document.getElementById("name");
  name.style.fontSize = "96px";
  name.innerText = window.location.search.split("=")[1];

  const childButtons = document.querySelector(".child-buttons");
  childButtons.classList.add("d-none");
  childButtons.classList.remove("w-50");

  const saveChangesButton = document.getElementById("save-changes-button");
  saveChangesButton.classList.remove("d-none");

  const backButton = document.getElementById("back-button");
  //change href to go back to choose a child to edit
  backButton.href = "/chore-list/edit/index.html";

  array.forEach((chore) => {
    const listItem = document.createElement("li");
    listItem.classList.add(
      "list-group-item",
      "bg-transparent",
      "border-0",
      "fs-2"
    );

    const input = document.createElement("input");
    input.classList.add("form-check-input");
    input.type = "checkbox";
    input.value = "";
    input.id = chore.name;
    input.checked = true;
    input.dataset.name = chore.name;
    input.dataset.image = chore.image;
    input.dataset.completed = chore.completed;
    input.dataset.display = chore.display;
    input.dataset.when = chore.when;

    if (chore.display === false) {
      input.checked = false;
    }

    const label = document.createElement("label");
    label.classList.add("form-check-label", "ps-3", "pt-1", "text-secondary");
    label.innerText = chore.name;
    label.htmlFor = chore.name;

    listItem.appendChild(input);
    listItem.appendChild(label);
    choreListGroup.appendChild(listItem);
  });
}

// display the chore options for the selected user
export function displayChoreOptions() {
  // Get the query parameters from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get("child");

  if (!userName) {
    console.error("User not found in query string");
    return;
  }

  // Get the localUsers from local storage
  const localUsers = JSON.parse(localStorage.getItem("localUsers"));

  if (!localUsers) {
    console.error("No users found in local storage");
    return;
  }

  // Get the user object from the localUsers array
  const user = localUsers.find((user) => user.name === userName);

  if (!user) {
    console.error("User not found in local storage");
    return;
  }

  chooseAmOrPm.classList.remove("d-none");
  chooseAmOrPm.classList.add("d-flex");

  const morning = document.getElementById("morning");

  // Render the chore options based on the updated localStorage data
  if (morning.classList.contains("btn-AMPM-pressed")) {
    renderChoreOptions(user.choresAM); // This should now render updated AM chores from local storage
  } else {
    renderChoreOptions(user.choresPM); // This should now render updated PM chores from local storage
  }
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
