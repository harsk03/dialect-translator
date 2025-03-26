// backend/server.js
import express from 'express'; 
import dotenv from 'dotenv'; 
import cors from 'cors'; 
import connectDB from './config/db.js'; 
import authRoutes from './routes/authRoutes.js';
import translationService from './services/translationService.js';

dotenv.config(); 
const app = express();  

// Middleware
app.use(express.json()); 
app.use(cors({ origin: 'http://localhost:3000' }));  

// Connect to Database
connectDB();  

// Translation Route
app.post('/api/translate', (req, res) => {
    try {
      const { 
        sourceLanguage, 
        targetLanguage, 
        sourceDialect = 'Standard', 
        targetDialect = 'Standard', 
        text 
      } = req.body;
  
      if (!sourceLanguage || !targetLanguage || !text) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing required parameters' 
        });
      }
  
      const translation = translationService.translateText(
        sourceLanguage, 
        targetLanguage, 
        sourceDialect,
        targetDialect,
        text
      );
  
      if (translation) {
        res.json({ 
          success: true, 
          translation,
          source: {
            language: sourceLanguage,
            dialect: sourceDialect,
            text
          },
          target: {
            language: targetLanguage,
            dialect: targetDialect,
            text: translation
          }
        });
      } else {
        res.status(404).json({ 
          success: false, 
          message: `Translation not found for "${text}" from ${sourceLanguage} (${sourceDialect}) to ${targetLanguage} (${targetDialect})` 
        });
      }
    } catch (error) {
      console.error('Translation error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error during translation' 
      });
    }
  });

// Existing routes and middleware...
app.get('/', (req, res) => {     
    res.send("API is running..."); 
});  

app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));