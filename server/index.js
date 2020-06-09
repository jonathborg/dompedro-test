const express = require('express');
const { createPool } = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const conn = createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'secret',
});

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

app.get('/listar', (req, res) => {
    conn.query('SELECT * FROM dompedro.cliente WHERE deletado = 0', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.post('/cadastrar', (req, res) => {
    const { nome, email } = req.body;
    conn.query('INSERT INTO dompedro.cliente SET nome = ?, email = ?', [nome, email], (err, values) => {
        if (err) {
            return res.status(500).send(err);
        }
        conn.query('SELECT * FROM dompedro.cliente WHERE deletado = 0', (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    });
});

app.listen(9000, () => {
    console.log('Express running...');
});
