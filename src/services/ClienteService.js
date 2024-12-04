const { compare, hash } = require('bcryptjs');
const db = require('../config/conexao');
const { sign } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');
const uuid = require('uuid')
class ClienteService {
    async login(dto) {
        const [rows] = await db.query(
            'SELECT id, ra, senha FROM clientes WHERE ra = ?',
            [dto.ra]
        )
        const cliente = rows[0];

        if (!cliente) {
            throw new Error('Usuário não cadastrado');
        }

        const senhasIguais = await compare(dto.senha, cliente.senha);

        if (!senhasIguais) {
            throw new Error('Usuário ou senha inválido');
        }

        const acessToken = sign({
            id: cliente.id,
            ra: cliente.ra
        },jsonSecret.secret, {
            expiresIn: 86400
        })
        
        return {acessToken}
    }

    async cadastrar(dto) {
        const [clienteComEmail] = await db.query(
            'SELECT * FROM clientes WHERE email = ?',
            [dto.email]
        );

        const [clienteComRa] = await db.query(
            'SELECT * FROM clientes WHERE ra = ?',
            [dto.ra]
        );

        if (clienteComEmail.length > 0 || clienteComRa.length > 0) {
            throw new Error('Usuário já cadastrado com email ou R.A');
        }

        const senhahash = await hash(dto.senha, 8);

        try {
            const [result] = await db.query(
                'INSERT INTO clientes (id,email, ra, senha) VALUES (?,?, ?, ?)',
                [uuid.v4(),dto.email, dto.ra, senhahash]
            );

            const novoClienteId = result.insertId;
            return { id: novoClienteId, email: dto.email, ra: dto.ra };
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao cadastrar o cliente');
        }
    }
}

module.exports = ClienteService;
