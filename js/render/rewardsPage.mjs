export const videoContainer = document.getElementById('video-container');

export function renderRewardsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('child');

    const name = document.getElementById('name');
    name.textContent = userName + ' is the best!';

    //create a youtube video window
    const video = document.createElement('iframe');

    if (userName === 'Oliver') {
        video.src = 'https://www.youtube.com/embed/LDU_Txk06tM?si=NpDnQ4wnYNWipN3x';
    } else if (userName === 'Casper') {
        video.src = 'https://www.youtube.com/embed/X9XK9SVvp40?si=aXPP0TMZS-9FWF4d';
    }
    video.width = '900px';
    video.height = '600px';
    video.allow = 'autoplay;';
    //video autoplays on load
    video.autoplay = true;
  

    video.allowFullscreen = true;
    video.style.border = 'none';


    videoContainer.appendChild(video);

    //reset the chores in local storage for this user to all be competed:'false'

    const localUsers = JSON.parse(localStorage.getItem('localUsers'));
    const user = localUsers.find((user) => user.name === userName);
    user.chores.forEach((chore) => {
        chore.completed = false;
    });
    localStorage.setItem('localUsers', JSON.stringify(localUsers));
    
}


