const xlsx = require('xlsx');
const db = require('./database/db');
const sql = require('mssql');

(async () => {
    try {
        await db.connection();
        const workbook = xlsx.readFile('./assets/data.xlsx');
        const sheet_name_list = workbook.SheetNames;
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

        await db.insertData(data);
        console.log('Dados inseridos com sucesso!');
    } catch (error) {
        console.log('Ocorreu algum erro interno', error);
    }finally{
        await sql.close();
    }
})();