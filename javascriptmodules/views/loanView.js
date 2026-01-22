class Loanview {

    _parentElement = document.querySelector('.form--loan');
    _inputLoanAmount = document.querySelector('.form__input--loan-amount');
    _btnLoan = document.querySelector('.form__btn--loan');


    addHandlerLoan(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();

            // Create FormData object from the form
            const formData = new FormData(this);

            // Convert to plain object
            const data = Object.fromEntries(formData.entries());

            handler(data);


        });
    }

    _clearInput() {
        this._inputLoanAmount.value = '';
    }
}


export default new Loanview();