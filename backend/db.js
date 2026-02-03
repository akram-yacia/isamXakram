import { DatabaseSync } from 'node:sqlite'
const db = new DatabaseSync(':memory:')

// Execute SQL statements from strings
db.exec(`
    CREATE TABLE users (
        username TEXT UNIQUE,
        email TEXT
    )
`)

export default db