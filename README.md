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

## 🏗 Architecture & Engineering

The application operates on a serverless, client-side architecture with a focus on high-fidelity AI processing:

### 1. Data Ingestion & Normalization
The system interfaces directly with the GitHub API to reconstruct a holistic view of the repository:
- **Metadata Extraction:** Retrieves stars, forks, and update frequency.
- **Language Heuristics:** Aggregates byte-counts per language to map the technology stack.
- **Structural Mapping:** Fetches the file tree to infer architecture (Monorepo, CI/CD, Docker presence).
- **Context Optimization:** README content is programmatically truncated to ensure token efficiency within the AI context window.

### 2. Semantic Analysis Engine (Gemini 2.0)
The normalized data is processed via the **Google GenAI** pipeline:
- **Persona:** "Senior Technical Interviewer"
- **Analysis Vectors:**
    - **Code Quality:** Analysis of file structure conventions and stack complexity.
    - **Documentation:** Evaluation of clarity, setup instructions, and examples.
    - **Maturity:** Assessment of whether the project is production-ready or a prototype.

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

## 🧩 Usage Guide

1. **Input:** Enter a valid GitHub repository URL.
2. **Process:** The system crawls metadata and passes the context to the Gemini API.
3. **Result:**
    * **Overall Score:** A high-level quality metric (0-100).
    * **AI Insights:** Qualitative feedback on Code Quality, Documentation, and Structure.
    * **Roadmap:** A prioritized list of actionable steps for improvement.

---

## 🎥 Demo

https://github.com/user-attachments/assets/0630f1ec-6c11-49d7-b9e5-a66a7674ad5a

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
