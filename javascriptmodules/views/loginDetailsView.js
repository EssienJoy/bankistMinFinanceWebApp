class loginDetailsView {

    _parentElement = document.querySelector('.login');
    _btnLogin = document.querySelector('.login__btn');
    _containerApp = document.querySelector('.app');
    _labelWelcome = document.querySelector('.welcome');
    _inputLoginUsername = document.querySelector('.login__input--user');
    _inputLoginPin = document.querySelector('.login__input--pin');
    _details = document.querySelector('.details');


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

    hideDetails() {
        this._details.style.display = "none";

    }

    renderUi(user) {
        this._containerApp.style.opacity = 1;
        this._labelWelcome.textContent = `Welcome Back ${user}`;
        this._clearInput();
    }

    _clearInput() {
        this._inputLoginUsername.value = this._inputLoginPin.value = '';
    }
}

export default new loginDetailsView();