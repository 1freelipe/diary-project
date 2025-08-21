const mongoose = require('mongoose');
const validator = require('validator');

const contatoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    email: { type: String, required: true },
    createdIn: { type: Date, default: Date.now }

});

const ContatoModel = mongoose.model('Contato', contatoSchema);

class Contato {
    constructor(body, userId) {
        this.body = body;
        this.userId = userId;
        this.errors = [];
        this.contato = null;
    }

    static async deleteId(id) {
        console.log('Chamou o deleteId com ID', id);
        try {
            if(typeof id !== 'string') return;
            const contato = await ContatoModel.findByIdAndDelete(id);
            return contato
        } catch(e) {
            console.log(e);
        }
    }

    static async findId(id) {
        try {
            if (typeof id !== 'string') return;
            const user = await ContatoModel.findById(id);
            return user;
        } catch (e) {
            console.log(e);
        }
    }

    static async find(userId) {
        try {
            const contatos = await ContatoModel.find({ userId })
                .sort({ createdIn: -1 }); // Ordenando a lista de contatos de forma decrescente
            return contatos;
        } catch(e) {
            console.log(e);
        }
    }

    async edit(id) {
        try {
            if (typeof id !== 'string') return;
            this.valida()
            if (this.errors.length > 0) return;
            this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
        } catch (e) {
            console.log(e);
        }
    }

    async register() {
        this.valida();

        try {
            if (this.errors.length > 0) return;

            const usersexist = await ContatoModel.findOne({ email: this.body.email, userId: this.userId })
            if (usersexist) {
                this.errors.push('Você já possui esse contato cadastrado');
                return;
            };

            if (this.errors.length > 0) return;


            this.contato = await ContatoModel.create({
                ...this.body,
                userId: this.userId
            });

        } catch (e) {
            console.log(e);
        }
    }


    valida() {
        this.cleanUp();

        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

        if (!this.body.nome) this.errors.push('O nome é um campo obrigatório');

        if (this.body.telefone.length < 11) this.errors.push('Telefone incorreto');
    }

    cleanUp() {
        for (const keys in this.body) {
            if (typeof this.body[keys] !== 'string') {
                this.body[keys] = '';
            };
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            telefone: this.body.telefone,
            email: this.body.email
        };
    };

}
module.exports = Contato;