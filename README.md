<div align="center">

# DevPath AI
### Automated Repository Auditing & Developer Profiling System

[![GitHub stars](https://img.shields.io/github/stars/KrupalWarale/DevPath-AI?style=for-the-badge&logo=github&color=0A0F1E)](https://github.com/KrupalWarale/DevPath-AI/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/KrupalWarale/DevPath-AI?style=for-the-badge&logo=github&color=0A0F1E)](https://github.com/KrupalWarale/DevPath-AI/network)
[![GitHub issues](https://img.shields.io/github/issues/KrupalWarale/DevPath-AI?style=for-the-badge&logo=github&color=0A0F1E)](https://github.com/KrupalWarale/DevPath-AI/issues)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=open-source-initiative&color=0A0F1E)](LICENSE)

<br />

**From raw GitHub repositories to human-like technical evaluation.**
<br />
[**View Demo**](#-demo) · [**Report Bug**](https://github.com/KrupalWarale/DevPath-AI/issues) · [**Request Feature**](https://github.com/KrupalWarale/DevPath-AI/issues)

</div>

---

## 📋 Overview

**DevPath AI** is a client-side application that analyzes GitHub repositories and generates **qualitative technical assessments** using **Google Gemini**.

Instead of relying on rule-based linters or static scores, DevPath AI uses a **large language model** to reason about:
- Project structure
- Architectural maturity
- Documentation quality
- Real-world usability

All analysis is performed **exclusively through the Gemini API**.

---

## 🏗 Architecture

<div align="center">
  <img width="100%" alt="DevPath Architecture" src="https://github.com/user-attachments/assets/7c739725-0e8e-449e-9792-a9f01669f2b8" />
</div>
<br>

DevPath AI follows a fully client-side, serverless pipeline:

### 1. Data Ingestion
The application fetches repository information using the **GitHub REST API** without cloning the repository.
- Repository metadata (stars, forks, activity)
- Language distribution
- File and folder structure
- README content (truncated for token efficiency)

### 2. AI Analysis Engine
The normalized repository context is passed directly to **Google Gemini** for reasoning and evaluation.
- **Model:** `gemini-2.5-flash`
- **Temperature:** `0.4`
- **Persona:** Senior Technical Interviewer

The model generates structured feedback covering:
- Codebase organization
- Documentation clarity
- Engineering maturity
- Production readiness

### 3. Visualization Layer
The AI response is returned as deterministic JSON and rendered into an interactive dashboard using **Recharts**.

---

## 🧠 Analysis Methodology

DevPath AI relies entirely on **semantic reasoning**, not static rules.

Gemini evaluates the repository across multiple dimensions:
- **Code Quality:** inferred from structure, language usage, and conventions
- **Documentation:** clarity, completeness, and onboarding readiness
- **Architecture:** modularity, configuration, and scalability signals
- **Practical Relevance:** hobby project vs real-world system

The output includes:
- An overall technical score (0–100)
- Strengths and weaknesses
- A prioritized improvement roadmap

---

## 🛠 Tech Stack

| Component | Technology |
|---------|------------|
| Frontend | React 19 + TypeScript |
| Styling | Tailwind CSS |
| AI Engine | Google Gemini API |
| Charts | Recharts |
| Icons | Lucide React |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Google Gemini API Key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/KrupalWarale/DevPath-AI.git
cd DevPath-AI


2. **Environment Configuration**
    Create a `.env` file in the root directory.
    ```bash
    VITE_GEMINI_API_KEY=your_google_gemini_api_key
    ```
    *If no key is provided, the system will automatically default to the Lightweight Heuristic Model.*

3. **Execute**
    Install dependencies and run the development server.
    ```bash
    npm install
    npm run dev
    ```

---

## 🧩 Usage Guide

1. **Input:** Enter a valid GitHub repository URL (e.g., `https://github.com/facebook/react`).
2. **Process:** The system crawls the repo metadata.
   - *If AI is active:* It performs a deep semantic dive.
   - *If AI is inactive:* It calculates the Heuristic Health Score.
3. **Result:**
    * **Overall Score:** A high-level quality metric (0-100).
    * **Roadmap:** A prioritized list (High/Medium/Low) of actionable steps.
    * **Deep Dive:** Specific feedback on Code Quality, Documentation, and Structure.

---

## 🤝 Contributing

Contributions are welcome. Please ensure all pull requests adhere to the following guidelines:

1. **Type Safety:** No `any` types in TypeScript interfaces.
2. **Component Modularity:** UI components must be decoupled from business logic.
3. **AI Safety:** Ensure prompts do not leak sensitive context.

---

## 🎥 Demo


https://github.com/user-attachments/assets/0630f1ec-6c11-49d7-b9e5-a66a7674ad5a




---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
