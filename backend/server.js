const express = require('express');
const pg = require('pg');
const axios = require('axios');
const app = express();
const port = 3000;

const client = new pg.Client({
    user: 'youruser',
    host: 'postgres',
    database: 'bitcoin_explorer',
    password: 'yourpassword',
    port: 5432,
});

client.connect();

app.get('/block-height', async (req, res) => {
    const result = await client.query('SELECT block_height FROM block_data ORDER BY id DESC LIMIT 1');
    res.json({ blockHeight: result.rows[0].block_height });
});

app.get('/bitcoin-price', async (req, res) => {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    res.json({ price: response.data.bitcoin.usd });
});

app.listen(port, () => {
    console.log(`Backend API running on port ${port}`);
});
