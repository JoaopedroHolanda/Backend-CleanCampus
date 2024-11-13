const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12345678",
    timezone: 'Z'
});

(async () => {
    try {
        // Conecte-se ao banco de dados sem especificar `database` para criar o banco se ele não existir.
        const connection = await pool.getConnection();
        
        // Criação do banco de dados, se ele não existir
        await connection.query('CREATE DATABASE IF NOT EXISTS cleancampus');
        console.log("Banco de dados `cleancampus` verificado/criado com sucesso!");

        // Use o banco de dados `cleancampus`
        await connection.query('USE cleancampus');

        // Criação das tabelas
        await connection.query(`
            CREATE TABLE IF NOT EXISTS clientes (
                id CHAR(36) PRIMARY KEY NOT NULL,
                email VARCHAR(255),
                ra VARCHAR(9),
                senha VARCHAR(255)
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS categorias (
                id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                titulo VARCHAR(60)
            )
        `);

        // Inserção inicial de categorias, ignorando duplicações
        await connection.query(`
            INSERT INTO categorias (titulo) VALUES
                ("limpeza"),
                ("manutencao_equipamentos"),
                ("problemas_eletricos"),
                ("climatizacao")
            ON DUPLICATE KEY UPDATE titulo = titulo
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS prestadores (
                id CHAR(36) PRIMARY KEY NOT NULL,
                email VARCHAR(255),
                ra VARCHAR(20),
                senha VARCHAR(255),
                tipo_servico INT,
                FOREIGN KEY (tipo_servico) REFERENCES categorias(id)
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS ocorrencias (
                id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                categoria_id INT,
                cliente_id CHAR(36),
                bloco VARCHAR(1),
                sala VARCHAR(3),
                descricao VARCHAR(255),
                severidade ENUM('alta', 'media', 'baixa'),
                resolvida TINYINT DEFAULT 0,
                FOREIGN KEY (categoria_id) REFERENCES categorias(id),
                FOREIGN KEY (cliente_id) REFERENCES clientes(id)
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS ocorrencias_resolvidas (
                id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                ocorrencia_id INT NOT NULL,
                prestador_id CHAR(36) NOT NULL,
                data_conclusao DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (ocorrencia_id) REFERENCES ocorrencias(id),
                FOREIGN KEY (prestador_id) REFERENCES prestadores(id)
            )
        `);

        console.log("Todas as tabelas foram criadas com sucesso!");
        connection.release();
    } catch (error) {
        console.error("Erro ao configurar o banco de dados:", error);
    }
})();

module.exports = pool;
