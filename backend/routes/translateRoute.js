const express = require('express');
const axios = require('axios'); // If calling an external API for translations
const router = express.Router();


router.post('/', async (req, res) => {
    const { text, sourceLang, targetLang } = req.body;

    if (!text || !sourceLang || !targetLang) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        //Example, will be replaced by corpus later
        const translatedText = `Translated (${sourceLang} -> ${targetLang}): ${text}`;

        res.json({ translatedText });
    } catch (error) {
        res.status(500).json({ error: 'Translation failed' });
    }
});

module.exports = router;
