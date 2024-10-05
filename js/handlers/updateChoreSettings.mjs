//on click of save changes button, update the chore.display value to true or false in local storage for the specific user, to reflect the changes in the chore list

export const saveChangesButton = document.getElementById("save-changes-button");
const morning = document.getElementById("morning");
const evening = document.getElementById("evening");

export function updateChoreSettings() {
  // Add event listeners for morning and evening buttons
  morning.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent any default behavior
    handleCheckboxes(); // Call handleCheckboxes to update local storage
  });

  evening.addEventListener("click", (e) => {
    e.preventDefault();
    handleCheckboxes();
  });

  // Save changes and navigate to the chore list when save button is clicked
  saveChangesButton.addEventListener("click", (e) => {
    e.preventDefault();
    handleCheckboxes(); // Update the chore settings in local storage
    const audio = new Audio("../../sounds/button-press.mp3");
    audio.play();
    const userName = new URLSearchParams(window.location.search).get("child");
    //wait until the sound has played before redirecting
    setTimeout(() => {
        window.location.href = "/chore-list/index.html?child=" + userName; // Redirect to the chore list page
    }, 400);

  });
}

// Function to handle checkbox state and update chores in local storage
export function handleCheckboxes() {
  const localUsers = JSON.parse(localStorage.getItem("localUsers")) || [];
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get("child");
  const checkboxes = document.querySelectorAll(".form-check-input");

  // Find the user in localUsers by their name
  const user = localUsers.find((user) => user.name === userName);

  if (!user) {
    console.error(`User "${userName}" not found in local storage.`);
    return;
  }

  // Iterate through checkboxes and update corresponding chores
  checkboxes.forEach((checkbox) => {
    const choreName = checkbox.dataset.name;
    const choreDisplay = checkbox.checked;
    const choreArray = checkbox.dataset.when === "am" ? "choresAM" : "choresPM";

    // Find the chore in the user's chores array by its name
    const chore = user[choreArray].find((chore) => chore.name === choreName);

    if (!chore) {
      console.error(
        `Chore "${choreName}" not found in ${choreArray} for user "${userName}".`
      );
      return;
    }

    // Update the chore's display property
    chore.display = choreDisplay;
  });

  // Save the updated localUsers array back to localStorage
  localStorage.setItem("localUsers", JSON.stringify(localUsers));
}
