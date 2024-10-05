import { choresArrayAM, choresArrayPM } from "./choresArray.mjs";

/**
 * @module localUsers.mjs
 * @description This file contains the localUsers array, which stores the users and their chores.
 */



// for both Casper and Oliver, create a user and store their chorelist on local storage
export const localUsers = [
    {
        name: 'Casper',
        choresAM: choresArrayAM,
        choresPM: choresArrayPM
    },
    {
        name: 'Oliver',
        choresAM: choresArrayAM,
        choresPM: choresArrayPM
    }
];

// store the localUsers array in local storage
export function setUsers () {
    if (localStorage.getItem('localUsers') === null) {
        localStorage.setItem('localUsers', JSON.stringify(localUsers));
    }
};

