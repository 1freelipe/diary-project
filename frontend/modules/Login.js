import validator from 'validator';

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const form = e.target;
        const emailInput = form.querySelector('input[name="email"]');
        const inputContainer = form.querySelector('.input-container');
        const inputContainerPassword = form.querySelector('.input-container-password');
        const passwordInput = form.querySelector('input[name="password"]');

        let error = false;

        if (!validator.isEmail(emailInput.value)) {
            inputContainer.classList.add('incorrect-email');
            error = true;
        } else {
            inputContainer.classList.remove('incorrect-email');
        };

        if (passwordInput.value.length < 3 || passwordInput.value.length > 15) {
            inputContainerPassword.classList.add('incorrect-password');
            error = true;
        } else {
            inputContainerPassword.classList.remove('incorrect-password');
        };

        if (!error) form.submit();
    }
}