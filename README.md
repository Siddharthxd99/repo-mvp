# 🎯 RepoMVP

> Transform any GitHub repository into a clear, actionable MVP description using AI

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Groq AI](https://img.shields.io/badge/Powered%20by-Groq%20AI-blue.svg)](https://groq.com/)

**RepoMVP** is an AI-powered web application that analyzes GitHub repositories and generates simple, concise MVP (Minimum Viable Product) descriptions. Perfect for understanding projects quickly, creating documentation, or pitching ideas.

---

## ✨ Features

- 🤖 **AI-Powered Analysis** - Uses Groq's Llama 3.3 70B model for intelligent descriptions
- ⚡ **Lightning Fast** - Get results in 3-5 seconds
- 📋 **One-Click Copy** - Instantly copy descriptions to clipboard
- 🎨 **Beautiful UI** - Modern blue gradient theme with smooth animations
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🔒 **Secure** - API keys stored server-side via environment variables
- 🆓 **100% Free** - No registration or API limits (uses Groq's free tier)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm 6+ (comes with Node.js)
- Groq API key ([Get free key](https://console.groq.com/keys))

### Installation

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/repo-mvp.git
   cd repo-mvp
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Configure environment variables**
   ```
   # Create .env file
   echo "GROQ_API_KEY=your_api_key_here" > .env
   echo "PORT=3000" >> .env
   ```

4. **Create public folder structure**
   ```
   mkdir public
   # Add index.html, style.css, script.js to public/
   ```

5. **Start the server**
   ```
   npm start
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
repo-mvp/
├── .env                    # Environment variables (API key)
├── .gitignore             # Git ignore file
├── package.json           # Dependencies
├── server.js              # Express backend server
├── README.md              # This file
└── public/                # Frontend files
    ├── index.html         # Main HTML
    ├── style.css          # Blue theme styles
    └── script.js          # Frontend logic
```

---

## 🎯 Usage

### Basic Usage

1. Open `http://localhost:3000` in your browser
2. Paste any GitHub repository URL:
   ```
   https://github.com/vercel/next.js
   ```
3. Click **"📋 Describe MVP"**
4. Wait 3-5 seconds for AI analysis
5. Click **"📋 Copy"** to copy the description

### Example Output

**Input:** `https://github.com/facebook/react`

**Output:**
```
What does this project do?
React is a JavaScript library for building user interfaces...

Key Features:
1. Component-based architecture
2. Virtual DOM for performance
3. JSX syntax
4. React Hooks
5. Server-side rendering support

Tech Stack: JavaScript, JSX

Target Users: Frontend developers

MVP Complexity: Medium
```

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling (blue gradient theme)
- **Vanilla JavaScript** - Logic (no frameworks)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web server
- **dotenv** - Environment variables
- **cors** - Cross-origin requests

### AI
- **Groq Cloud API** - AI inference
- **Llama 3.3 70B Versatile** - Language model

### External APIs
- **GitHub REST API** - Repository data
- **Groq API** - MVP description generation

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```
# Required
GROQ_API_KEY=gsk_your_api_key_here

# Optional
PORT=3000
```

### Get Groq API Key

1. Visit [console.groq.com/keys](https://console.groq.com/keys)
2. Sign up for free account
3. Click "Create API Key"
4. Copy key (starts with `gsk_`)
5. Paste in `.env` file

**Free Tier Limits:**
- 30 requests per minute
- 14,400 requests per day
- No credit card required

---

## 🔌 API Documentation

### Backend API Endpoint

**POST** `/api/describe-mvp`

**Request Body:**
```
{
  "repoUrl": "https://github.com/user/repo",
  "repoData": {
    "name": "repository-name",
    "description": "Repository description",
    "language": "JavaScript",
    "stargazers_count": 1000
  },
  "readme": "README content..."
}
```

**Response:**
```
{
  "success": true,
  "description": "AI-generated MVP description..."
}
```

**Error Response:**
```
{
  "success": false,
  "error": "Error message"
}
```

---

## 🐛 Troubleshooting

### "Not Found" Error
**Problem:** Server shows "Not Found" at `http://localhost:3000`

**Solution:**
```
# Ensure public folder exists
mkdir public

# Move files to public folder
mv index.html public/
mv style.css public/
mv script.js public/

# Restart server
npm start
```

### "Failed to fetch" Error
**Problem:** Frontend cannot connect to backend

**Solution:**
1. Check server is running (`npm start`)
2. Verify URL in `script.js` line 75
3. Check CORS is enabled in `server.js`

### Copy Button Not Working
**Problem:** "Failed to copy" message appears

**Solution:**
- Modern browsers require HTTPS for clipboard API
- Current implementation uses fallback method
- Text remains selectable for manual copy

### Groq API Errors
**Problem:** "Groq API failed" error

**Solution:**
1. Verify API key in `.env` file
2. Check API key starts with `gsk_`
3. Ensure you haven't exceeded rate limits
4. Visit [console.groq.com](https://console.groq.com) to check status

---

## 🎨 Customization

### Change Theme Color

Edit `public/style.css`:

```
/* Primary color */
h1 {
    color: #42a5f5;  /* Change to your color */
}

/* Button color */
button {
    background: #42a5f5;  /* Change to your color */
}
```

### Adjust AI Response

Edit `server.js`:

```
temperature: 0.5,    // 0.0-1.0 (lower = more focused)
max_tokens: 1000     // Increase for longer descriptions
```

---

## 🚢 Deployment

### Deploy to Railway

1. Create account at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `repo-mvp` repository
4. Add environment variable: `GROQ_API_KEY=your_key_here`
5. Deploy!

### Deploy to Render

1. Create account at [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variable: `GROQ_API_KEY`
6. Deploy!

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m "Add amazing feature"`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 RepoMVP

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- **Groq** - For providing free, fast AI inference
- **GitHub** - For the REST API
- **Express.js** - For the web framework
- **Llama 3.3** - For the language model

---

## 📧 Contact

**Project Link:** [https://github.com/yourusername/repo-mvp](https://github.com/yourusername/repo-mvp)

**Issues:** [Report a bug](https://github.com/yourusername/repo-mvp/issues)

---

## 🗺️ Roadmap

- [ ] Add export to PDF feature
- [ ] Support multiple languages
- [ ] Add comparison mode (compare 2 repos)
- [ ] Integration with VS Code extension
- [ ] Add deployment complexity estimation
- [ ] Support for private repositories
- [ ] Add project templates generation

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

<p align="center">Made with ❤️ using Groq AI 🚀</p>
