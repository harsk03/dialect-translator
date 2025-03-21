import express from 'express';
import axios from 'axios'; 

const router = express.Router();

router.post('/', async (req, res) => {
    const { text, sourceLang, targetLang } = req.body;

    if (!text || !sourceLang || !targetLang) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        
        const translatedText = `Translated (${sourceLang} -> ${targetLang}): ${text}`;

        res.json({ translatedText });
    } catch (error) {
        res.status(500).json({ error: 'Translation failed' });
    }
});

export default router;
