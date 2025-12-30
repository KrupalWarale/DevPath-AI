<div align="center">

# DevPath AI  
### AI-Based GitHub Repository Analysis

[![GitHub stars](https://img.shields.io/github/stars/KrupalWarale/DevPath-AI?style=for-the-badge&logo=github)](https://github.com/KrupalWarale/DevPath-AI/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/KrupalWarale/DevPath-AI?style=for-the-badge&logo=github)](https://github.com/KrupalWarale/DevPath-AI/network)
[![GitHub issues](https://img.shields.io/github/issues/KrupalWarale/DevPath-AI?style=for-the-badge&logo=github)](https://github.com/KrupalWarale/DevPath-AI/issues)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**AI-powered analysis for GitHub repositories**

[View Demo](#-demo) · [Report Bug](https://github.com/KrupalWarale/DevPath-AI/issues)

</div>

---

## 📌 About

**DevPath AI** is a client-side web application that analyzes GitHub repositories using the **Google Gemini API**.

The system focuses on **semantic understanding** rather than rule-based checks or static scoring methods.  
All analysis is performed **only through Gemini AI**.

---

## 🔍 What It Does

Given a GitHub repository URL, DevPath AI evaluates the project and generates an overall technical assessment based on AI reasoning.

No repository cloning  
No backend server  
No static linters  

---

## 🧠 How It Works

1. Fetches repository metadata using the GitHub REST API  
2. Sends structured context to Google Gemini  
3. Receives AI-generated evaluation  
4. Displays results in a simple dashboard  

---

## 🤖 AI Configuration

- Model: `gemini-2.5-flash`
- Temperature: `0.4`
- Analysis Type: AI-only semantic reasoning

---

## 🛠 Tech Stack

- React + TypeScript  
- Tailwind CSS  
- Google Gemini API  
- Recharts  

---

## 🚀 Getting Started

### Requirements
- Node.js v18+
- Google Gemini API Key

### Setup

```bash
git clone https://github.com/KrupalWarale/DevPath-AI.git
cd DevPath-AI
npm install
Create .env file:

bash
Copy code
VITE_GEMINI_API_KEY=your_gemini_api_key
Run the app:

bash
Copy code
npm run dev
🧩 Usage
Enter a GitHub repository URL

Start analysis

View AI-generated results

🎥 Demo
https://github.com/user-attachments/assets/0630f1ec-6c11-49d7-b9e5-a66a7674ad5a

🤝 Contributing
Contributions are welcome.
Please keep the codebase simple and AI-focused.
