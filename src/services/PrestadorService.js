const { compare, hash } = require('bcryptjs');
const db = require('../config/conexao');
const { sign } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');
const uuid = require('uuid');

class PrestadorService {
    async login(dto) {
        const [rows] = await db.query(
            'SELECT id, ra, senha FROM prestadores WHERE ra = ?',
            [dto.ra]
        );
        const prestador = rows[0];

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
        const [prestadorComEmail] = await db.query(
            'SELECT * FROM prestadores WHERE email = ?',
            [dto.email]
        );

        const [prestadorComRa] = await db.query(
            'SELECT * FROM prestadores WHERE ra = ?',
            [dto.ra]
        );

        if (prestadorComEmail.length > 0 || prestadorComRa.length > 0) {
            throw new Error('Usuário já cadastrado com email ou R.A');
        }

        const senhahash = await hash(dto.senha, 8);

        try {
            const [result] = await db.query(
                'INSERT INTO prestadores (id, email, ra, senha, tipo_servico) VALUES (?, ?, ?, ?, ?)',
                [uuid.v4(), dto.email, dto.ra, senhahash, dto.tipo_servico]
            );

            const novoPrestadorId = result.insertId;
            return { id: novoPrestadorId, email: dto.email, ra: dto.ra, tipo_servico: dto.tipo_servico };
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao cadastrar o prestador');
        }
    }
}

module.exports = PrestadorService;
