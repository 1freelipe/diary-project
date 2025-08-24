import validator from 'validator';

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const form = e.target;
        const inputName = form.querySelector('input[name="nome"]');
        const inputPhoneNumber = form.querySelector('input[name="telefone"]');
        const inputEmail = form.querySelector('input[name="email"]');
        const divName = form.querySelector('.div-name');
        const divPhonenumber = form.querySelector('.div-phonenumber');
        const divEmail = form.querySelector('.div-email');
        let error = false

        if (!inputName.value) {
            divName.classList.add('incorrect-name');
            error = true;
        } else {
            divName.classList.remove('incorrect-name');
        }

        if (!inputPhoneNumber.value) {
            divPhonenumber.classList.add('incorrect-phonenumber');
            error = true;
        } else {
            divPhonenumber.classList.remove('incorrect-phonenumber');        
        }

        if(!validator.isEmail(inputEmail.value)) {
            divEmail.classList.add('incorrect-email');
            error = true;
        } else {
            divEmail.classList.remove('incorrect-email');
        }

        if(!error) form.submit();
    }

}