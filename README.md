# <img src="frontend/public/icon3.png" alt="Dialecta Logo" width="50" height="50"> Dialecta - Cultural Dialect Translator

_________________________________________________________________________________
| Sr.No |        NAME         |           EMAIL ID           |      ROLE       |
|-------|---------------------|------------------------------|-----------------|
| 1     | Shruti Ramdurg      | 1032222376@mitwpu.edu.in     | Team Leader     |
| 2     | Divyanshi Singh     | 1032222294@mitwpu.edu.in     | Team Member 1   |
| 3     | Harshal Kale        | 1032222441@mitwpu.edu.in     | Team Member 2   |
| 4     | Om Surana           | 1032222255@mitwpu.edu.in     | Team Member 3   |
_________________________________________________________________________________

## 📝 Overview
**Cultural Dialect Translator** is an advanced AI-powered application designed to bridge the gap between standard languages and their regional dialects. Unlike traditional translation tools, our system considers linguistic variations, contextual meanings, and cultural nuances to provide accurate and meaningful translations.

## 🔥 Key Features
- **Dialect-Specific Contextual Translation** 
  - Adapts translations based on cultural context and dialect-specific meanings.
- **Real-Time Feedback** 
  - Users receive instant suggestions to refine their translations.
- **Multilingual Support** 
  - Currently supports dialects in **Hindi, Bengali, Marathi, and Tamil**.
- **AI-Powered Language Detection** 
  - Automatically identifies dialects and applies appropriate translation models.
- **Syntactic & Semantic Adjustments** 
  - Ensures grammatically accurate translations with dialectal variations.

## 🎯 Target Dialects
| Language  | Standard Version | Dialect Variants         |
|-----------|-----------------|--------------------------|
| **Hindi**  | Standard Hindi  | Bhojpuri, Awadhi        |
| **Bengali** | Standard Bengali | Chittagong, Sylhet     |
| **Marathi** | Standard Marathi | Pune Marathi, Kolhapuri |
| **Tamil**  | Standard Tamil  | Madurai Tamil           |

## 🏗️ Project Workflow
### 1) **Data Collection**
- Gather parallel corpora of common phrases in different dialects.
- Leverage native speakers and professional translators for accuracy.

### 2️) **Dialect Identification**
- **Model:** Fine-tuned **BERT** for dialect classification.
- **Goal:** Detect and classify the dialect before translation.

### 3️) **Translation Model**
- **Model:** **NLLB-200** (No Language Left Behind 200) for low-resource dialect translation.
- **Process:** After dialect identification, NLLB-200 translates with high contextual accuracy.

### 4️) **User Feedback & Refinement**
- Implement a **feedback loop** for continuous model improvement.

## 🚀 Tech Stack
- **Frontend:** React.js 🌐
- **Backend:** Python (FastAPI) 🐍
- **Machine Learning:** Transformers (Hugging Face), PyTorch ⚡
- **Database:** Atlas MongoDB (for storing translation logs & feedback) 🗄️

## ⚙️ Installation
```bash
# Clone the repository
git clone https://github.com/your-repo/cultural-dialect-translator.git

# Navigate to the frontend directory
cd cultural-dialect-translator/frontend

# Install dependencies
npm install

# Start the frontend
npm start

# Open a new terminal and navigate to the backend directory
cd ../backend

# Install dependencies
npm install

# Start the backend
node server.js
```

## 🎯 Future Enhancements
- **Speech-to-Text Integration** 🎙️ for dialectal speech processing.
- **Multimodal Translation** 📷 (text, audio, and images) for richer context awareness.
- **Expansion to More Languages** 🏆.

## 📜 License
This project is **NOT open-source** and is provided only for **competition review**.  
Any unauthorized use, copying, or modification is strictly prohibited.  
For licensing discussions, contact us at **[harshalkale2402@gmail.com]**.


