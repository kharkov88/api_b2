import dotnev from 'dotenv';
dotnev.config();

export default {
    db: {
        username: process.env.DB_USERNAME || 'default',
        password : process.env.DB_PASSWORD || 'default',
        database: process.env.DB_DATABASE || 'default',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: process.env.DB_DIALECT || 'postgres'
    }
}