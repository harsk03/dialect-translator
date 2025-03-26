const express = require('express');
const fs = require('fs');
const path = require('path');
const { parseStringPromise } = require('xml2js');

const router = express.Router();
const tmxFilePath = path.join(__dirname, '../corpus/Multilingual_Corpus.tmx');

// Language mapping
const languageMap = {
    "english": "en",
    "hindi": "hi",
    "bhojpuri (varanasi)": "bho",
    "marathi": "mr",
    "konkani marathi": "kok",
    "bengali": "bn",
    "chittagonian": "ctg",
    "tamil": "ta",
    "madurai tamil": "ta-madurai"
};

// Load TMX file and parse translations
async function loadTmxFile() {
    try {
        if (!fs.existsSync(tmxFilePath)) {
            throw new Error(`File not found: ${tmxFilePath}`);
        }

        const data = fs.readFileSync(tmxFilePath, 'utf8');
        const parsedData = await parseStringPromise(data);

        if (!parsedData.tmx || !parsedData.tmx.body || !parsedData.tmx.body[0].tu) {
            throw new Error(`Invalid TMX format in file: ${tmxFilePath}`);
        }

        const translationData = [];
        parsedData.tmx.body[0].tu.forEach(entry => {
            const translations = {};
            entry.tuv.forEach(tuv => {
                let lang = (tuv.$['xml:lang'] || tuv.$.lang || "").trim().toLowerCase();
                if (languageMap[lang]) {
                    lang = languageMap[lang];
                }
                translations[lang] = tuv.seg[0].trim();
            });
            translationData.push(translations);
        });
        return translationData;
    } catch (error) {
        console.error("Error loading TMX file:", error);
        return [];
    }
}

// Function to translate text via English
async function translate(text, fromLang, toLang) {
    const corpus = await loadTmxFile();
    if (corpus.length === 0) {
        return "Error: TMX file is empty or invalid.";
    }

    fromLang = fromLang.toLowerCase();
    toLang = toLang.toLowerCase();
    text = text.toLowerCase();

    // Step 1: Source dialect → English
    let englishText = null;
    for (let entry of corpus) {
        if (entry[fromLang] && entry[fromLang].toLowerCase() === text) {
            englishText = entry["en"];
            break;
        }
    }
    if (!englishText) return `No translation found for '${text}' in English.`;

    // Step 2: English → Target dialect
    for (let entry of corpus) {
        if (entry["en"] && entry["en"].toLowerCase() === englishText.toLowerCase()) {
            return entry[toLang] || `No translation found in ${toLang}.`;
        }
    }
    return `No translation found for '${text}' from ${fromLang} to ${toLang}.`;
}

// Translation API Route
router.post('/translate', async (req, res) => {
    const { text, sourceDialect, targetDialect } = req.body;

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
        const translatedText = await translate(text, fromLang, toLang);
        return res.json({ success: true, translatedText });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Translation failed.", error: error.message });
    }
});

module.exports = router;
