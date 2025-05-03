import { formatNumbers, formatMovDates } from "../helpers.js";

/**
 * Class that manages the UI updates related to displaying user movements (deposits and withdrawals).
 * This class is responsible for rendering the list of movements with their respective types, dates, and amounts.
 */
class MovementsView {

    _parentElement = document.querySelector('.movements');

    /**
     * Renders the list of movements by clearing the existing list and generating new markup.
     * This method is called to update the displayed movements on the screen.
     *
     * @param {Object} data - The data object containing the movements and their corresponding dates.
     * @param {number[]} data.movements - Array of movement amounts.
     * @param {string[]} data.movementsDates - Array of dates corresponding to each movement.
     * @returns {void}
     */
    renderMovements(data) {
        // console.log(data);
        this._clear();
        const markup = this._generateMarkup(data);
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }


    /**
     * Clears the current content in the movements container.
     * This method is typically called before rendering new data.
     *
     * @returns {void}
     * @private
     */
    _clear() {
        this._parentElement.innerHTML = '';
    }


    /**
     * Determines the type of movement (deposit or withdrawal) based on the movement's amount.
     * 
     * @param {number} mov - The movement amount (positive for deposit, negative for withdrawal).
     * @returns {string} - The movement type: 'deposit' or 'withdrawal'.
     * @private
     */
    _getMovementType(mov) {
        return mov < 0 ? 'withdrawal' : 'deposit';
    };


    /**
     * Generates the HTML markup for displaying the movements.
     * Each movement is displayed with its type, date, and formatted value.
     * 
     * @param {Object} data - The data object containing movements and movement dates.
     * @param {number[]} data.movements - Array of movement amounts.
     * @param {string[]} data.movementsDates - Array of movement dates.
     * @returns {string} - The HTML markup as a string.
     * @private
     */
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