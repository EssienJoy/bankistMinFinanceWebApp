/**
 * Class that handles the UI interactions for loan-related actions.
 * This class manages form submissions and updates the UI during loan requests.
 */
class Loanview {

    _parentElement = document.querySelector('.form--loan');
    _inputLoanAmount = document.querySelector('.form__input--loan-amount');
    _btnLoan = document.querySelector('.form__btn--loan');


    /**
    * Adds an event listener to the loan form for handling form submissions.
    * It captures the form data and passes it to the provided handler function.
    *
    * @param {Function} handler - The callback function to handle the loan data.
    * @returns {void}
    */
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


    /**
     * Clears the loan amount input field in the loan form.
     *
     * @returns {void}
     * @private
     */
    _clearInput() {
        this._inputLoanAmount.value = '';
    }
}


export default new Loanview();