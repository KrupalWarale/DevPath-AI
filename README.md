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

**DevPath AI** is a client-side, AI-driven application designed to perform static analysis and qualitative auditing of GitHub repositories. It evaluates **project health, architectural maturity, and maintainability** by bridging the gap between raw metadata and expert-level insight.

The system leverages the **GitHub REST API** for data extraction and **Google's Gemini 2.0 Flash** model to provide a deep, semantic "Senior Developer" perspective on any public repository.

---

## 🏗 Architecture & Engineering

The application operates on a serverless, client-side architecture with a streamlined three-stage pipeline:

### 1. Data Ingestion & Normalization
The system interfaces with the GitHub API to reconstruct a repository profile without full cloning:
* **Metadata Extraction:** Analyzes stars, forks, and activity timestamps.
* **Language Distribution:** Aggregates technology stacks based on byte-counts.
* **Structural Mapping:** Inspects file trees to infer architecture (Monorepo, CI/CD, Docker).
* **Context Optimization:** README content is programmatically processed to fit within the Gemini context window efficiently.

### 2. Analysis Engine (AI-Only)
The core intelligence is powered by **Gemini 2.0 Flash**. The engine uses a "Senior Technical Interviewer" persona to evaluate:
* **Code Quality:** Inferred from file structure and language conventions.
* **Documentation:** Clarity of installation, usage, and contribution guides.
* **Production Readiness:** Assessing if the project is a "toy" or ready for deployment.

### 3. Visualization Layer
The frontend transforms the AI's JSON output into an interactive dashboard using **Recharts** and **Tailwind CSS**.

---

## 🛠 Tech Stack

| Component | Technology |
| :--- | :--- |
| **Core Framework** | React 19 + TypeScript |
| **AI Runtime** | Google GenAI SDK (Gemini 2.0 Flash) |
| **Styling** | Tailwind CSS |
| **Visualizations** | Recharts |

---

## 🚀 Getting Started

### Prerequisites
* Node.js v18+
* **Google Gemini API Key** (Required for analysis)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/KrupalWarale/DevPath-AI.git](https://github.com/KrupalWarale/DevPath-AI.git)
    cd DevPath-AI
    ```

2.  **Environment Configuration**
    Create a `.env` file in the root directory:
    ```bash
    VITE_GEMINI_API_KEY=your_google_gemini_api_key
    ```

3.  **Execute**
    ```bash
    npm install
    npm run dev
    ```

---

## 🧩 Usage Guide

1.  **Input:** Enter a valid GitHub repository URL.
2.  **Analyze:** The system fetches metadata and sends it to the Gemini API.
3.  **Results:** * **Overall Score:** A qualitative metric (0-100).
    * **Roadmap:** Prioritized actionable steps for improvement.
    * **Deep Dive:** Feedback on Architecture, Readability, and Community Health.

---

## 🎥 Demo

https://github.com/user-attachments/assets/0630f1ec-6c11-49d7-b9e5-a66a7674ad5a

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
