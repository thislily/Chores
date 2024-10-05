//check if it is morning or evening
export function checkTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 5 && hours < 12) {
        return 'morning';
    } else {
        return 'evening';
    }

}