class LogoutView {
    _containerApp = document.querySelector('.app');
    _labelWelcome = document.querySelector('.welcome');
    _labelTimer = document.querySelector('.timer');
    _details = document.querySelector('.details');

    renderlogoutUi() {
        this._containerApp.style.opacity = 0;
        this._labelWelcome.textContent = 'Log In To Get Started';
        this._details.style.display = "block";
    }

    renderlabelTimer(timer) {
        this._labelTimer.textContent = timer;
    }

    _clearInput() {
        this._labelTimer.textContent = '';
    }
}

export default new LogoutView();