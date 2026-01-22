
class BalanceView {
    _labelBalance = document.querySelector('.balance__value');
    _dateBalance = document.querySelector('.date');


    renderBalance(balance) {
        this._labelBalance.textContent = balance;
    }


    renderBalanceDate(balanceDate) {
        this._dateBalance.textContent = balanceDate;
    }

}

export default new BalanceView();