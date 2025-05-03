/**
 * Class that manages the rendering of the user's balance and balance-related information in the UI.
 */
class BalanceView {
    _labelBalance = document.querySelector('.balance__value');
    _dateBalance = document.querySelector('.date');


    /**
     * Renders the balance value in the UI.
     *
     * @param {string} balance - The current balance to be displayed.
     * @returns {void}
     */
    renderBalance(balance) {
        this._labelBalance.textContent = balance;
    }

    /** Renders the balance date in the UI.
     * 
     * @param {string} balanceDate - The formatted date of the balance.
     * @returns {void}
     */
    renderBalanceDate(balanceDate) {
        this._dateBalance.textContent = balanceDate;
    }

}

export default new BalanceView();