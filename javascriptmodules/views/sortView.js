/**
 * Class that handles the UI interactions related to sorting data, specifically the sorting of movements or summaries.
 * It listens for user clicks on the sorting button and calls the provided handler when a click is detected.
 */
class SortView {

    _parentElement = document.querySelector('.summary');


    /**
     * Adds an event listener to the parent element to listen for user clicks on the sort button.
     * When the sort button is clicked, it invokes the provided handler function.
     * 
     * @param {Function} handler - The function to be called when the sort button is clicked.
     * @returns {void}
     */
    addHandlerSort(handler) {
        this._parentElement.addEventListener('click', function (e) {

            const click = e.target.closest('.btn--sort');
            if (!click) return;
            handler();

        });
    }
}

export default new SortView();