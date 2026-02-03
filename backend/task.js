import express from 'express';
import { DatabaseSync } from 'node:sqlite';

const app = express();
const port = 3000;

app.use(express.json());

const db = new DatabaseSync('./database.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE
  )
`);

app.post('/register', (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ error: "Username and email are required" });
    }

    try {
        const insert = db.prepare('INSERT INTO users (username, email) VALUES (?, ?)');
        
        const result = insert.run(username, email);

        res.status(201).json({
            message: "User registered",
            userId: result.lastInsertRowid,
            username: username
        });

    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(409).json({ error: "Username or email already exists" });
        }
        
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/users', (req, res) => {
    try {
        const query = db.prepare('SELECT * FROM users');
        const users = query.all(); 
        
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});