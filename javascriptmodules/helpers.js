import logoutView from "./views/logoutView.js";
import { LOGOUT_TIME_SEC, USER_LOCALE } from "./configure.js";


/**
 * Formats a number into a currency string according to the user's locale.
 *
 * @param {number} num - The number to format.
 * @returns {string} The formatted currency string.
 */
export const formatNumbers = function (num) {

    const formatted = new Intl.NumberFormat(USER_LOCALE, {
        style: 'currency',
        currency: 'USD',
    }).format(num);

    return formatted;
};



/**
 * Formats a date into a human-readable string according to the user's locale.
 *
 * @param {Date|string} date - The date to format, can be a Date object or an ISO 8601 string.
 * @returns {string} The formatted date string (e.g., "Tuesday, June 1, 2025").
 */
export const formatDates = function (date) {

    const formattedDates = new Intl.DateTimeFormat(USER_LOCALE, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));

    return formattedDates;
};


/**
 * Formats a date into a human-readable string relative to the current date.
 * If the date is today or yesterday, it will show "Today" or "Yesterday".
 * For dates within the last week, it will show the number of days ago.
 * For older dates, it will use the user's locale to display a formatted date.
 *
 * @param {Date|string} date - The date to format, can be a Date object or an ISO 8601 string.
 * @param {string} [locale=USER_LOCALE] - The locale to use for formatting (defaults to `USER_LOCALE`).
 * @returns {string} The formatted relative date string (e.g., "Today", "3 days ago", or "June 1, 2025").
 */
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



/**
 * Starts a timer for user session logout.
 * The timer counts down from a predefined value (`LOGOUT_TIME_SEC`) and updates the UI every second.
 * Once the timer reaches zero, the user is logged out and the UI is updated.
 *
 * @returns {number} The interval ID that can be used to clear the timer later.
 */
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
