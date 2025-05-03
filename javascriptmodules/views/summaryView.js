/**
 * Class that handles the UI updates related to displaying the user's account summary.
 * This includes rendering values for incoming transactions, outgoing transactions, and interest.
 */

class SummaryView {

    _parentElement = document.querySelector('.summary');
    _labelSumIn = document.querySelector('.summary__value--in');
    _labelSumOut = document.querySelector('.summary__value--out');
    _labelSumInterest = document.querySelector('.summary__value--interest');

    /**
     * Renders the incoming summary value in the UI.
     * 
     * @param {string} inValue - The formatted value for incoming transactions.
     * @returns {void}
     */
    renderSummaryIn(inValue) {
        this._labelSumIn.textContent = inValue;
    }


    /**
     * Renders the outgoing summary value in the UI.
     * 
     * @param {string} outValue - The formatted value for outgoing transactions.
     * @returns {void}
     */
    renderSummaryOut(outValue) {
        this._labelSumOut.textContent = outValue;
    }

    /**
     * Renders the interest summary value in the UI.
     * 
     * @param {string} interestValue - The formatted value for interest.
     * @returns {void}
     */
    renderSummaryInterest(interestValue) {
        this._labelSumInterest.textContent = interestValue;
    }

}

export default new SummaryView();