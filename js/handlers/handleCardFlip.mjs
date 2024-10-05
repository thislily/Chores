//on card flip, update local storage with the chore.completed value set now to true, and the reverse if the card is flipped back

import { checkTimeOfDay } from "../UI/checkTimeOfDay.mjs";

export function choreCompleted(chore) {
  const localUsers = JSON.parse(localStorage.getItem("localUsers"));
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get("child");
  const user = localUsers.find((user) => user.name === userName);

  let completedChore;
  // Check the time of day and change the chore in the appropriate list
  if (checkTimeOfDay() === "morning") {
    completedChore = user.choresAM.find((c) => c.name === chore.name);
  } else {
    completedChore = user.choresPM.find((c) => c.name === chore.name);
  }

  // Update local storage with the chore.completed value
  completedChore.completed = !completedChore.completed;

  localStorage.setItem("localUsers", JSON.stringify(localUsers));
}
