/**
 * Class that handles the UI interactions for login-related actions.
 * This class manages form submissions and updates the UI during login.
 */
class loginDetailsView {

    _parentElement = document.querySelector('.login');
    _btnLogin = document.querySelector('.login__btn');
    _containerApp = document.querySelector('.app');
    _labelWelcome = document.querySelector('.welcome');
    _inputLoginUsername = document.querySelector('.login__input--user');
    _inputLoginPin = document.querySelector('.login__input--pin');


    /**
     * Adds an event listener to the login form for handling form submissions.
     * It captures the form data and passes it to the provided handler function.
     *
     * @param {Function} handler - The callback function to handle the login data.
     * @returns {void}
     */
    addHandlerLogin(handler) {
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
     * Renders the UI after a successful login by displaying the app and showing the welcome message.
     * Clears the login input fields after rendering.
     *
     * @param {string} user - The username of the logged-in user.
     * @returns {void}
     */
    renderUi(user) {
        this._containerApp.style.opacity = 1;
        this._labelWelcome.textContent = `Welcome Back ${user}`;
        this._clearInput();
    }

    /**
     * Clears the login input fields for username and pin.
     *
     * @returns {void}
     * @private
     */
    _clearInput() {
        this._inputLoginUsername.value = this._inputLoginPin.value = '';
    }
}

export default new loginDetailsView();