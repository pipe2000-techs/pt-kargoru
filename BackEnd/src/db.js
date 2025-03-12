import pg from 'pg';
import {DB_user,DB_host,DB_password,DB_database,DB_port} from './config.js';

export const pool = new pg.Pool({ 
    user: DB_user,
    host: DB_host,
    password: DB_password,
    database: DB_database,
    port: DB_port
});

