class SortView {

    _parentElement = document.querySelector('.summary');


    addHandlerSort(handler) {
        this._parentElement.addEventListener('click', function (e) {

            const click = e.target.closest('.btn--sort');
            if (!click) return;
            handler();

        });
    }
}

export default new SortView();