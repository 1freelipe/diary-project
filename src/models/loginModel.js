const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const loginSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('login', loginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    // Método para verificação de login
    async login() {
        this.valid();
        if (this.errors.length > 0) return;
        // Buscando validação do email, se ele já existe na base de dados
        this.user = await LoginModel.findOne({ email: this.body.email });

        // Checando se o usuário realmente existe
        if (!this.user) {
            this.errors.push('Usuário não existe');
            return;
        }

        // Checando se a senha que o usuário está passando, bate com o hash do banco de dados
        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida');
            this.user = null;
            return;
        };
    }

    async register() {
        this.valid();
        if (this.errors.length > 0) return;

        // Verificando se o usuário já existe
        const usersexist = await LoginModel.findOne({ email: this.body.email })
        if (usersexist) {
            this.errors.push('Esse e-mail já está sendo utilizado');
            return;
        }

        if (this.errors.length > 0) return;

        // Criando um hash de senhas com o bcryptjs
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        // Sempre utilizar try/catch com funções async/await

        this.user = await LoginModel(this.body).save();

    }

    valid() {
        this.cleanUp()
        // Validação
        // O email precisa ser válido
        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');

        // A senha precisa conter entre 3 e 15 caracteres
        if (this.body.password.length < 3 || this.body.password.length > 15) {
            this.errors.push('A senha precisa ter entre 3 e 15 caracteres.');
        }
    }

    // Limpando os campos e garantindo que no meu formulário de cadastro, só haverá os campos que eu preciso e que eles serão strings
    cleanUp() {
        for (let keys in this.body) {
            if (typeof this.body[keys] !== 'string') {
                this.body[keys] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login;