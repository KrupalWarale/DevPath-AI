<div align="center">

# DevPath AI
### Automated Repository Auditing & Developer Profiling System

[![GitHub stars](https://img.shields.io/github/stars/KrupalWarale/DevPath-AI?style=for-the-badge&logo=github&color=0A0F1E)](https://github.com/KrupalWarale/DevPath-AI/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/KrupalWarale/DevPath-AI?style=for-the-badge&logo=github&color=0A0F1E)](https://github.com/KrupalWarale/DevPath-AI/network)
[![GitHub issues](https://img.shields.io/github/issues/KrupalWarale/DevPath-AI?style=for-the-badge&logo=github&color=0A0F1E)](https://github.com/KrupalWarale/DevPath-AI/issues)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=open-source-initiative&color=0A0F1E)](LICENSE)

<br />

**From raw code metrics to human-like technical assessment.**
<br />
[**View Demo**](#-demo) · [**Report Bug**](https://github.com/KrupalWarale/DevPath-AI/issues) · [**Request Feature**](https://github.com/KrupalWarale/DevPath-AI/issues)

</div>

---

## 📋 Overview

**DevPath AI** is a client-side, AI-driven application designed to perform static analysis and qualitative auditing of GitHub repositories. It evaluates project health, architectural maturity, and maintainability by combining repository metadata with LLM reasoning.

It leverages the **GitHub REST API** for metadata extraction and **Google's Gemini 2.0 Flash** model for deep semantic analysis.

---
## 🎥 Demo

https://github.com/user-attachments/assets/0630f1ec-6c11-49d7-b9e5-a66a7674ad5a

---
## 🏗 Architecture & Engineering

The application operates on a serverless, client-side architecture with a focus on high-fidelity AI processing:

### 1. Data Ingestion & Normalization
The system uses the GitHub API to understand a repository:
- **Repo Info:** Stars, forks, and last update.
- **Languages:** Detects tech stack from language usage.
- **Structure:** Reads file tree to identify project setup (CI/CD, Docker, etc.).
- **README Handling:** Shortens README to fit AI limits.

### 2. Semantic Analysis Engine (Gemini 2.0)
The processed data is analyzed using Google Gemini:
- **Role:** Senior Technical Interviewer
- **Checks:**
  - **Code Quality:** Project structure and stack complexity.
  - **Documentation:** Clarity of README and setup steps.
  - **Project Level:** Prototype vs production-ready.


---

## 🛠 Tech Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Core Framework** | React 19 + TypeScript | Type-safe component architecture. |
| **Styling** | Tailwind CSS | Utility-first CSS for rapid layout execution. |
| **AI Runtime** | Google GenAI SDK | Native interface for Gemini models. |
| **Visualizations** | Recharts | Interactive charting for metric parsing. |

---

## 🚀 Getting Started

### Prerequisites
* Node.js v18+
* Google Gemini API Key

### Installation

1. **Clone the Repository**
    ```bash
    git clone [https://github.com/KrupalWarale/DevPath-AI.git](https://github.com/KrupalWarale/DevPath-AI.git)
    cd DevPath-AI
    ```

2. **Environment Configuration**
    Create a `.env` file in the root directory:
    ```bash
    VITE_GEMINI_API_KEY=your_google_gemini_api_key
    ```

3. **Execute**
    Install dependencies and run the development server:
    ```bash
    npm install
    npm run dev
    ```

---




## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
