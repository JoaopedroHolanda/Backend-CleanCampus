const { compare, hash } = require('bcryptjs');
const database = require('../models');
const uuid = require('uuid');
const { sign } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');

class PrestadorService {
    async login(dto) {
        const prestador = await database.Prestador.findOne({
            attributes: ['id', 'ra', 'senha'],
            where: { ra: dto.ra }
        });

        if (!prestador) {
            throw new Error('Usuário não cadastrado');
        }

        const senhasIguais = await compare(dto.senha, prestador.senha);

        if (!senhasIguais) {
            throw new Error('R.A ou senha inválido');
        }

        const acessToken = sign(
            { id: prestador.id, ra: prestador.ra },
            jsonSecret.secret,
            { expiresIn: 86400 }
        );

        return { acessToken };
    }

    async cadastrar(dto) {
        const prestadorComEmail = await database.Prestador.findOne({
            where: { email: dto.email }
        });

        const prestadorComRa = await database.Prestador.findOne({
            where: { ra: dto.ra }
        });

        if (prestadorComEmail || prestadorComRa) {
            throw new Error('usuário já cadastrado com email ou R.A');
        }

        const senhahash = await hash(dto.senha, 8);

        try {
            const novoPrestador = await database.Prestador.create({
                email: dto.email,
                ra: dto.ra,
                senha: senhahash,
                tipo_servico: dto.tipo_servico
            });

            return novoPrestador;
        } catch (error) {
            console.error(error)
            throw new Error(error);
        }
    }
    
}

module.exports = PrestadorService;
