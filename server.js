const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const upload = multer({ dest: '/uploads' });
const app = express();

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

app.post('/upload', upload.single('file'), async (req, res) => {
    const filePath = req.file.path;
    const originalName = req.headers['matchzy-filename'] || req.file.originalname;

    const form = new FormData();
    form.append('file', fs.createReadStream(filePath), originalName);

    try {
        await axios.post(DISCORD_WEBHOOK_URL, form, {
            headers: form.getHeaders(),
        });
        res.status(200).send('Upload erfolgreich');
    } catch (error) {
        res.status(500).send('Fehler beim Upload: ' + error.message);
    } finally {
        fs.unlinkSync(filePath);
    }
});

app.listen(80, () => {
    console.log('Server läuft auf Port 80');
});
