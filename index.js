import express from 'express';
import pg from 'pg';
import { config } from 'dotenv';

config();
const app = express();
const port = process.env.PORT || 8083;

const client = new pg.Client({
    connectionString: process.env.POSTGRES_PRISMA_URL
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL database on Vercel'))
    .catch(err => console.error('Connection error', err.stack));

app.post('/insert', async(req, res)=>{
    const users = [
        { username: 'user1' },
        { username: 'user2' },
        { username: 'user3' },
        { username: 'user4' },
        { username: 'user5' }
    ];

    try {
        for (const user of users) {
            await client.query('INSERT INTO users (username) VALUES ($1)', [user.username]);
        }
        res.status(201).json({ success: true, message: 'Users inserted successfully' });
    } catch (error) {
        console.error('Error inserting users:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(port, (req, res)=>{
    console.log(`Servidor corriendo en: http://localhost:${port}`);
});

export default (req, res) => {
    app(req, res);
}