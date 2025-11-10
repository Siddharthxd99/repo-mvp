const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Check if public folder exists
const publicPath = path.join(__dirname, 'public');
if (!fs.existsSync(publicPath)) {
    console.error('❌ ERROR: public/ folder not found!');
    console.error('📁 Please create public/ folder and add:');
    console.error('   - index.html');
    console.error('   - style.css');
    console.error('   - script.js');
    process.exit(1);
}

app.use(express.static(publicPath));

// Explicit root route
app.get('/', (req, res) => {
    const indexPath = path.join(publicPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send(`
            <h1>404 - index.html not found</h1>
            <p>Please create public/index.html</p>
            <p>Current directory: ${__dirname}</p>
            <p>Looking for: ${indexPath}</p>
        `);
    }
});

// Main API endpoint
app.post('/api/describe-mvp', async (req, res) => {
    try {
        const { repoUrl, repoData, readme } = req.body;

        const prompt = `Analyze this GitHub repository and describe it in simple MVP (Minimum Viable Product) terms:

Repository: ${repoData.name}
URL: ${repoUrl}
Description: ${repoData.description || 'No description'}
Language: ${repoData.language || 'Not specified'}
Stars: ${repoData.stargazers_count}

README excerpt:
${readme ? readme.slice(0, 800) : 'No README available'}

Provide a clear, concise MVP description covering:
1. What does this project do? (core purpose)
2. Key features (top 3-5)
3. Tech stack used
4. Target users
5. MVP implementation complexity (Easy/Medium/Hard)

Keep it simple and actionable. Maximum 300 words.`;

        console.log('🤖 Calling Groq AI...');

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { 
                        role: 'system', 
                        content: 'You are a product analyst. Describe GitHub repositories in clear, simple MVP terms.' 
                    },
                    { 
                        role: 'user', 
                        content: prompt 
                    }
                ],
                temperature: 0.5,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Groq API failed');
        }

        const data = await response.json();
        console.log('✅ MVP Description Generated!');
        
        res.json({ 
            success: true, 
            description: data.choices[0].message.content 
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        path: req.path,
        message: 'This endpoint does not exist',
        availableEndpoints: {
            'GET /': 'Main page',
            'POST /api/describe-mvp': 'Generate MVP description'
        }
    });
});

app.listen(PORT, () => {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 RepoMVP Server Started!');
    console.log('='.repeat(60));
    console.log(`📍 Server: http://localhost:${PORT}`);
    console.log(`📂 Public folder: ${publicPath}`);
    console.log(`🔑 API Key: ${process.env.GROQ_API_KEY ? '✅ Configured' : '❌ Missing'}`);
    console.log('='.repeat(60));
    console.log('\n📁 Files in public/:');
    if (fs.existsSync(publicPath)) {
        const files = fs.readdirSync(publicPath);
        files.forEach(file => console.log(`   ✓ ${file}`));
    }
    console.log('\n✨ Ready!\n');
});