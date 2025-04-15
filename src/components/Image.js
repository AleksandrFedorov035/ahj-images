
export class Image {
    constructor(inputUrl, addInput, imagesContainer) {
        if (typeof imagesContainer == 'string' && typeof inputUrl == 'string' && typeof addInput == 'string') {
            this.imagesContainer = document.querySelector(imagesContainer);
            this.inputUrl = document.querySelector(inputUrl);
            this.addInput = document.querySelector(addInput);
        } else {
            this.imagesContainer = imagesContainer;
            this.inputUrl = inputUrl;
            this.addInput = addInput;
        }

        this.imagesContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('image-close')) {
                this.delete(e);
            }
        });
        
        this.addInput.addEventListener('click', (e) => this.add(e));
        this.inputUrl.addEventListener('keydown', (e) => {
            if (e.code === 'Enter' && this.inputUrl.value !== '') {
                this.add()
                return
            }
        });
    }

    renderItem() {
        return `
            <div class="images-items">
                <img src="${this.inputUrl.value}" alt="${document.querySelector('.name').value}">
                <span class="image-close"></span>
            </div>
        `
    }

    async checkImageStatus(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.status === 200;
        } catch (error) {
            return false;
        }
    }

    async add() {
        const url = this.inputUrl.value.trim();
        if (!url) return this.checkValid();

        const errorElement = document.querySelector('.error');
        const isValid = await this.checkImageStatus(url);
        if (isValid) {
            const image = this.renderItem();
            this.imagesContainer.insertAdjacentHTML('beforeend', image);
            this.inputUrl.value = '';
            document.querySelector('.name').value = '';
            errorElement.classList.add('hidden')
        } else {
            errorElement.classList.remove('hidden');
        }
    }

    checkValid() {
        const url = this.inputUrl.value.trim()
        const error = document.querySelector('.error')
        if (url.length > 0) {
            error.classList.add('hidden');
        } else {
            error.classList.remove('hidden');
        }
    }

    delete(e) {
        const image = e.target.closest('.images-items');
        if (image) {
            image.remove();
        }
    }
}