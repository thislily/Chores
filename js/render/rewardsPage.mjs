export const videoContainer = document.getElementById('video-container');

export function renderRewardsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('child');

    const name = document.getElementById('name');
    name.textContent = userName + ' is the best!';

    //create a youtube video window
    const video = document.createElement('iframe');
    video.src = 'https://www.youtube.com/embed/tQQ4FWeaKWA?si=eKdpw_WWzyzKbTEx';
    video.width = '800px';
    video.height = '500px';
    video.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    video.allowFullscreen = true;
    video.style.border = 'none';


    videoContainer.appendChild(video);
}


