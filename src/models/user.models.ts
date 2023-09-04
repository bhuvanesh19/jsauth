import { Connection, Pool, PoolConfig } from 'pg';
import { formatDateToPostgresTimestamp } from '../utils/dateOperations';

const config: PoolConfig = {
    host: 'localhost',
    port: 5432,
    database: 'auth',
    user: 'admin',
    password: 'admin',
}
const pool = new Pool(config)

export class User {
    id: number;
    primary_uid: string;
    is_logged_in: boolean;
    is_locked: boolean;
    expires_on: string;
    jwt: string;
    username: string;


    constructor({ id, username, primary_uid, is_logged_in, is_locked, expires_on, jwt }: { id: number, username: string, primary_uid: string, is_logged_in: boolean, is_locked: boolean, expires_on: Date, jwt: string }) {
        this.id = id;
        this.username = username;
        this.primary_uid = primary_uid;
        this.is_logged_in = is_logged_in;
        this.is_locked = is_locked;
        this.expires_on = formatDateToPostgresTimestamp(expires_on);
        this.jwt = jwt;
    }
}

export class UserDAO {

    static async createUser(user: User) {

        let connection = await pool.connect();
        let query = `INSERT INTO users(id,username,primary_uid,is_logged_in,is_locked,expires_on,jwt) 
        VALUES(${user.id},'${user.username}','${user.primary_uid}',${user.is_logged_in},${user.is_locked},'${user.expires_on}','${user.jwt}');`
        await connection.query(query);
        connection.release();
        return user;
    }

}