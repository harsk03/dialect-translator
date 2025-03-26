const express = require('express');
const axios = require('axios'); // If calling an external API for translations
const router = express.Router();


router.post('/', async (req, res) => {
    const { text, sourceLang, targetLang } = req.body;

    if (!text || !sourceDialect || !targetDialect) {
        return res.status(400).json({ success: false, message: "Missing required parameters." });
    }

    const fromLang = languageMap[sourceDialect.toLowerCase()];
    const toLang = languageMap[targetDialect.toLowerCase()];

    if (!fromLang || !toLang) {
        return res.status(400).json({ success: false, message: "Invalid dialects." });
    }

    if (fromLang === toLang) {
        return res.json({ success: true, translatedText: text });
    }

    try {
        //Example, will be replaced by corpus later
        const translatedText = `Translated (${sourceLang} -> ${targetLang}): ${text}`;

        res.json({ translatedText });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Translation failed.", error: error.message });
    }
});

export default router;
