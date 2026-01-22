
class TransferView {

    _parentElement = document.querySelector('.form--transfer');
    _inputTransferTo = document.querySelector('.form__input--to');
    _inputTransferAmount = document.querySelector('.form__input--amount');

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

    _clearInput() {
        this._inputTransferAmount.value = this._inputTransferTo.value = '';
    }
}

export default new TransferView();