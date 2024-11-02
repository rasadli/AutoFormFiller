// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const BOT_TOKEN = 'AAHYq5AzwiQrGH3mKfQmpJFtzDI8dsaq0tY';
const CHAT_ID = '7213250472';

app.use(express.json());

app.post('/send-message', async (req, res) => {
    const message = req.body.message;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error sending message' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
