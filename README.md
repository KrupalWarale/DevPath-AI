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

**DevPath AI** is a client-side, AI-driven application designed to perform static analysis and qualitative auditing of GitHub repositories. Unlike traditional linters that strictly focus on syntax, DevPath AI evaluates **project health, architectural maturity, and maintainability**.

It leverages the **GitHub REST API** for metadata extraction and **Google's Gemini 2.5 Flash** model for semantic analysis. When AI services are unavailable, it gracefully degrades to a **Lightweight Heuristic Engine**, ensuring users always receive actionable insights.

---

## 🏗 Architecture & Engineering

<div align="center">
  <img width="100%" alt="DevPath Architecture" src="https://github.com/user-attachments/assets/7c739725-0e8e-449e-9792-a9f01669f2b8" />
</div>
<br>

The application operates on a serverless, client-side architecture with a three-stage pipeline:

### 1. Data Ingestion & Normalization
The system interfaces directly with the GitHub API to reconstruct a holistic view of the repository without cloning the full codebase.
- **Metadata Extraction:** Retrieves stars, forks, and updated timestamps to gauge community interest and maintenance frequency.
- **Language Heuristics:** Aggregates byte-counts per language to construct a weighted distribution of the technology stack.
- **Structural Mapping:** Fetches the root directory file tree to infer architecture (Monorepo vs. Polyrepo, CI/CD configs, Docker presence).
- **Context Window Optimization:** The `README.md` is fetched and programmatically truncated to 8,000 characters to maximize token efficiency.

### 2. Analysis Engine (Hybrid Approach)
The system utilizes a dual-engine approach to scoring:
- **Primary:** Semantic Analysis via Gemini 2.5 Flash.
- **Secondary:** Lightweight Heuristic Algorithms (Fallback).

### 3. Visualization Layer
The frontend renders deterministic JSON output into an interactive dashboard using **Recharts** for immediate visual parsing of metrics.

---

## ⚖️ Scoring Methodology

DevPath AI ensures reliability even without an active AI connection. Below are the two methods used to audit repositories.

### 🧠 Primary: Semantic Analysis (Gemini 2.5)
When the API key is active, the normalized data is fed into a **Google GenAI** pipeline.
- **Model:** `gemini-2.5-flash` (Temperature: `0.4`)
- **Persona:** "Senior Technical Interviewer"
- **Analysis Vectors:**
    - **Code Quality:** Inferred from file structure conventions and language usage.
    - **Documentation:** Analyzed for clarity, installation instructions, and usage examples.
    - **Real-world Relevance:** Assesses if the project resembles a production-ready application or a toy project.

### 📉 Secondary: Lightweight Heuristic Model (Fallback)
If Gemini is unavailable (e.g., no API key, quota exceeded, or offline mode), DevPath switches to a deterministic algorithmic scoring model based on weighted metadata:

| Metric Category | Weight | Logic |
| :--- | :--- | :--- |
| **Activity Health** | 40% | Calculates decay based on `pushed_at`. Projects updated within 30 days score max; >6 months incur penalties. |
| **Community Validation** | 30% | Logarithmic scoring of `stargazers_count` and `forks_count`. Prevents outliers from skewing data while rewarding popularity. |
| **Documentation Check** | 20% | Boolean checks for `README.md` existence + length heuristics (>500 chars) and presence of `description` field. |
| **Complexity Bonus** | 10% | Awards points for multi-language stacks and recognized config files (e.g., `package.json`, `docker-compose.yml`) implying architectural depth. |

> **Note:** While the Lightweight model cannot provide specific "qualitative" feedback (like "your variable naming is poor"), it provides a highly accurate "Health Index" based on statistical auditing standards.

---

## 🛠 Tech Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Core Framework** | React 19 + TypeScript | Type-safe component architecture for maintainability. |
| **Styling** | Tailwind CSS | Utility-first CSS for rapid, responsive layout execution. |
| **AI Runtime** | Google GenAI SDK | Native interface for Gemini models with schema validation. |
| **Visualizations** | Recharts | Composable charting library for React. |
| **Icons** | Lucide React | Lightweight, consistent SVG iconography. |

---

## 🚀 Getting Started

### Prerequisites
* Node.js v18+
* Google Gemini API Key (Optional - required for Semantic Analysis only)

### Installation

1. **Clone the Repository**
    ```bash
    git clone [https://github.com/KrupalWarale/DevPath-AI.git](https://github.com/KrupalWarale/DevPath-AI.git)
    cd DevPath-AI
    ```

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

<div align="center">
  <a href="https://github.com/user-attachments/assets/659596f7-c152-4aaa-a087-c067fa45a57e">
    <img src="https://img.youtube.com/vi/placeholder/0.jpg" alt="Watch the Demo Video" width="600"/>
    <br>
    <i>(Click to view the demo video)</i>
  </a>
</div>

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
