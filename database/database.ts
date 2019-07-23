import * as mysql from 'mysql2';
import environment from '../environment';

const pool = mysql.createPool({
    host: environment.DB_HOST,
    user: environment.DB_USERNAME,
    password: environment.DB_PASSWORD,
    database: environment.DB_DATABASE
});

export default pool;