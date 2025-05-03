/**
 * Class that handles the UI interactions for closing an account.
 * This class manages form submissions and updates the UI after account closure.
 */

class ClossAccView {

    _parentElement = document.querySelector('.form--close');
    _inputCloseUsername = document.querySelector('.form__input--user');
    _inputClosePin = document.querySelector('.form__input--pin');
    _containerApp = document.querySelector('.app');
    _labelWelcome = document.querySelector('.welcome');

    /**
     * Adds an event listener to the close account form for handling form submissions.
     *
     * @param {Function} handler - The callback function to handle the form data.
     * @returns {void}
     */
    addHandlerCloseAcc(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();

            // Create FormData object from the form
            const formData = new FormData(this);

            // Convert to plain object
            const data = Object.fromEntries(formData.entries());

            handler(data);

        });
    };


    /**
   * Updates the UI to indicate the account has been deleted.
   * This hides the main app container and changes the welcome text to "Account Deleted".
   *
   * @returns {void}
   */
    closeUi() {
        this._containerApp.style.opacity = 0;
        this._labelWelcome.textContent = `Account Deleted`;
    }


    /**
     * Clears the username and pin input fields in the close account form.
     *
     * @returns {void}
     * @private
     */
    _clearInput() {
        this._inputCloseUsername.value = this._inputClosePin.value = '';
    }
}

export default new ClossAccView();