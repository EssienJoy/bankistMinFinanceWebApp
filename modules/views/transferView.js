/**
 * Class responsible for handling the user interface and event binding 
 * for money transfers between accounts.
 */
class TransferView {

    _parentElement = document.querySelector('.form--transfer');
    _inputTransferTo = document.querySelector('.form__input--to');
    _inputTransferAmount = document.querySelector('.form__input--amount');


    /**
    * Adds a submit event handler for the transfer form.
    * Converts form data into a plain object and passes it to the handler function.
    * 
    * @param {Function} handler - A callback function that receives the form data.
    * @returns {void}
    */
    addHandlerTransfer(handler) {
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
    * Clears the input fields after form submission.
    * @private
    * @returns {void}
    */
    _clearInput() {
        this._inputTransferAmount.value = this._inputTransferTo.value = '';
    }
}

export default new TransferView();