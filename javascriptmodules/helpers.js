import logoutView from "./views/logoutView.js";
import { LOGOUT_TIME_SEC, USER_LOCALE } from "./configure.js";

export const formatNumbers = function (num) {

    const formatted = new Intl.NumberFormat(USER_LOCALE, {
        style: 'currency',
        currency: 'USD',
    }).format(num);

    return formatted;
};

export const formatDates = function (date) {

    const formattedDates = new Intl.DateTimeFormat(USER_LOCALE, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));

    return formattedDates;
};


export const formatMovDates = function (date, locale = USER_LOCALE) {
    // Converts Iso String to Date
    const inputDate = typeof date === 'string' ? new Date(date) : date;

    const calcDaysPassed = (date1, date2) =>
        Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(new Date(), inputDate);

    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    return new Intl.DateTimeFormat(locale).format(inputDate);
};


export const startLogOutTimer = function () {
    let time = LOGOUT_TIME_SEC;

    logoutView._clearInput?.();

    const tick = () => {
        const min = String(Math.trunc(time / 60)).padStart(2, '0');
        const sec = String(time % 60).padStart(2, '0');

        logoutView.renderlabelTimer(`${min}:${sec}`);

        if (time === 0) {
            clearInterval(interval); // clear the outer global timer
            logoutView.renderlogoutUi();
        }

        time--;
    };

    tick(); // Call immediately to avoid 1-second delay

    const interval = setInterval(tick, 1000);
    return interval;
};
