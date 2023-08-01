import mysql from 'mysql2/promise';

export async function query({ query, values = []}:any) {
    const dbConnect = await mysql.createConnection({
        host: process.env.MY_SQL_HOST,
        database: process.env.MY_SQL_DATABASE,
        user: process.env.MY_SQL_USER,
        password: process.env.MY_SQL_PASSWORD,
    });

    try {
        const [results] = await dbConnect.execute(query, values);
        dbConnect.end();
        return results;
    } catch (error) {
        return { error }
    }
}