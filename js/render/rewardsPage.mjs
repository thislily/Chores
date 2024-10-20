import { checkTimeOfDay } from "../UI/checkTimeOfDay.mjs";

export const videoContainer = document.getElementById('video-container');

export function renderRewardsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('child');

    const name = document.getElementById('name');
    name.textContent = userName + ' is the best!';

    //create a youtube video window
    const video = document.createElement('iframe');

    if (userName === 'Oliver') {
        video.src = 'https://www.youtube.com/embed/ROX1SN5Op8A?si=Iv7RcZqK8IRzMu84?autoplay=1&controls=0';
    } else if (userName === 'Casper') {
        video.src = 'https://www.youtube.com/embed/uwT6ziRxnVU?si=rRCg7pXJaXwRvrtB?autoplay=1&controls=0';
    }
    video.width = '80%';
    video.height = '560px';
    video.allow = 'autoplay;';
    video.allowFullscreen = true;
    video.style.border = 'none';


    videoContainer.appendChild(video);

    //reset the chores in local storage for this user to all be competed:'false'

    const localUsers = JSON.parse(localStorage.getItem('localUsers'));
    const user = localUsers.find((user) => user.name === userName);
    if (checkTimeOfDay() === 'morning') {
        user.choresAM.forEach(chore => chore.completed = false);
    } else if (checkTimeOfDay() === 'evening') {
        user.choresPM.forEach(chore => chore.completed = false);
        user.choresAM.forEach(chore => chore.completed = false);
    }
    localStorage.setItem('localUsers', JSON.stringify(localUsers));

}


