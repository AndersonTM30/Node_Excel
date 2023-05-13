const sql = require('mssql');
require('dotenv').config();

/**
 * Configuração da conexão com o banco de dados
 *  @returns {Promise<void>}    
 *  @throws {Error} - Ocorreu algum erro 
 */
const config = {
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: parseInt(process.env.PORT || '1433'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

/**
 * Conexão com o banco de dados
 * @returns {Promise<void>}
 * @throws {Error} - Ocorreu algum erro
 */
const connection = async () => {
    try {
        await sql.connect(config);
        console.log('Connected!');
    } catch (error) {
        console.log(error);
    }
};

/**
 * Inserção de dados
 * @param {Array} data - Dados a serem inseridos
 * @returns {Promise<void>}
 * @throws {Error} - Ocorreu algum erro
 */
const insertData = async (data) => {
    // await connection();
    let query = 'INSERT INTO users (nome, email, telefone) VALUES ';
    console.log(data);
    data.forEach((row) => {
        const values = `('${row.nome}', '${row.email}', '${row.telefone}')`;
        query += values + ',';
    })

    query = query.slice(0, -1) + ';';

    try {
        const result = await sql.query(query);
        console.log(result);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    connection,
    insertData
};