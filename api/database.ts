import {Pool} from 'pg'

if(!process.env.DATABASE_URL) 
    throw new Error('A variável DATABASE_URL nao esta disponível.');

const pool = new Pool({connectionString: process.env.DATABASE_URL});

export default pool;
