import { formatNumbers, formatMovDates } from "../helpers.js";

class MovementsView {

    _parentElement = document.querySelector('.movements');


    renderMovements(data) {
        // console.log(data);
        this._clear();
        const markup = this._generateMarkup(data);
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    _getMovementType(mov) {
        return mov < 0 ? 'withdrawal' : 'deposit';
    };


    _generateMarkup(data) {
        const { movements, movementsDates } = data;
        // console.log(movements, movementsDates);
        return movements.map((mov, i) => `
        <div class="movements__row">
        <div class="movements__type movements__type--${this._getMovementType(mov)}">
        ${i + 1} ${this._getMovementType(mov)}
            </div>
            <div class="movements__date"> ${formatMovDates(movementsDates[i])}</div>
            <div class="movements__value">${formatNumbers(mov)}€</div>
        </div>
    `).join('');
    }

};

export default new MovementsView();