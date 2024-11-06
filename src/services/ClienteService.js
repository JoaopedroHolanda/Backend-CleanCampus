const { compare, hash } = require('bcryptjs');
const database = require('../models');
const { sign } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');

class ClienteService {
    async login(dto) {
        const cliente = await database.Cliente.findOne({
            attributes: ['id', 'ra', 'senha'],
            where: { ra: dto.ra }
        });

        if (!cliente) {
            throw new Error('Usuário não cadastrado');
        }

        const senhasIguais = await compare(dto.senha, cliente.senha);

        if (!senhasIguais) {
            throw new Error('R.A ou senha inválido');
        }

        const acessToken = sign(
            { id: cliente.id, ra: cliente.ra },
            jsonSecret.secret,
            { expiresIn: 86400 }
        );

        return { acessToken };
    }

    async cadastrar(dto) {
        const clienteComEmail = await database.Cliente.findOne({
            where: { email: dto.email }
        });

        const clienteComRa = await database.Cliente.findOne({
            where: { ra: dto.ra }
        });

        if (clienteComEmail || clienteComRa) {
            throw new Error('usuário já cadastrado com email ou R.A');
        }

        const senhahash = await hash(dto.senha, 8);

        try {
            const novoCliente = await database.Cliente.create({
                email: dto.email,
                ra: dto.ra,
                senha: senhahash
            });

            return novoCliente;
        } catch (error) {
            console.error(error)
            throw new Error(error);
        }
    }
}

module.exports = ClienteService;
