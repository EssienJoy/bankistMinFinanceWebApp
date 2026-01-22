
class ClossAccView {

    _parentElement = document.querySelector('.form--close');
    _inputCloseUsername = document.querySelector('.form__input--user');
    _inputClosePin = document.querySelector('.form__input--pin');
    _containerApp = document.querySelector('.app');
    _labelWelcome = document.querySelector('.welcome');


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



    closeUi() {
        this._containerApp.style.opacity = 0;
        this._labelWelcome.textContent = `Account Deleted`;
    }


    _clearInput() {
        this._inputCloseUsername.value = this._inputClosePin.value = '';
    }
}

export default new ClossAccView();