/**
 * Class that manages the UI updates related to logging out and the logout timer.
 * This class is responsible for displaying the log-out UI and updating the timer during the session.
 */
class LogoutView {
    _containerApp = document.querySelector('.app');
    _labelWelcome = document.querySelector('.welcome');
    _labelTimer = document.querySelector('.timer');

    /**
     * Renders the UI for logging out by hiding the app and showing a "Log In" message.
     * This method is typically called when the user has logged out.
     *
     * @returns {void}
     */
    renderlogoutUi() {
        this._containerApp.style.opacity = 0;
        this._labelWelcome.textContent = 'Log In To Get Started';
    }

    /**
     * Updates the displayed timer with the current time left.
     * The timer is used to show the remaining time before the user is logged out automatically.
     *
     * @param {string} timer - The formatted time string (e.g., '02:15') to display on the UI.
     * @returns {void}
     */
    renderlabelTimer(timer) {
        this._labelTimer.textContent = timer;
    }

    /**
     * Clears the timer label, typically when the logout countdown has finished.
     *
     * @returns {void}
     * @private
     */
    _clearInput() {
        this._labelTimer.textContent = '';
    }
}

export default new LogoutView();