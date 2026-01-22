
class SummaryView {

    _parentElement = document.querySelector('.summary');
    _labelSumIn = document.querySelector('.summary__value--in');
    _labelSumOut = document.querySelector('.summary__value--out');
    _labelSumInterest = document.querySelector('.summary__value--interest');

    renderSummaryIn(inValue) {
        this._labelSumIn.textContent = inValue;
    }


    renderSummaryOut(outValue) {
        this._labelSumOut.textContent = outValue;
    }

    renderSummaryInterest(interestValue) {
        this._labelSumInterest.textContent = interestValue;
    }

}

export default new SummaryView();