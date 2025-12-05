import express from 'express';
import sql from './db.js';
import { namesRandom } from "./names_random.js";

const app = express();

const name = namesRandom[Math.floor(Math.random() * namesRandom.length)];
await sql`INSERT INTO people (name) VALUES (${name});`

app.get('/', async (req, res) => {
    const results  = await sql`SELECT * FROM people;`

    let names = '<h1>Full Cycle Rocks!</h1>' +
        '<br>' +
        '<h2>Lista de nomes</h2>' +
        '<br>' +
        '<ul>'
    results.forEach(row => {
        names += `<li>${row.name}</li>`
    });
    names += '</ul>'
    res.send(names)
})

app.listen(3000, () => {
    console.log('Listening on port 3000!');
})