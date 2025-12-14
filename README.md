<div align="center">

# DevPath AI

**Automated Repository Auditing & Developer Profiling System**

[![GitHub stars](https://img.shields.io/github/stars/KrupalWarale/DevPath-AI?style=for-the-badge&logo=github&color=0A0F1E)](https://github.com/KrupalWarale/DevPath-AI/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/KrupalWarale/DevPath-AI?style=for-the-badge&logo=github&color=0A0F1E)](https://github.com/KrupalWarale/DevPath-AI/network)
[![GitHub issues](https://img.shields.io/github/issues/KrupalWarale/DevPath-AI?style=for-the-badge&logo=github&color=0A0F1E)](https://github.com/KrupalWarale/DevPath-AI/issues)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=open-source-initiative&color=0A0F1E)](LICENSE)

</div>

---

## 📋 Overview

**DevPath AI** is a fully client-side, AI-powered tool for static analysis and qualitative auditing of GitHub repositories. It goes beyond traditional linters by assessing **project health, architectural maturity, maintainability, and real-world relevance**.

Powered by the GitHub REST API for metadata extraction and (optionally) Google's Gemini model for deep semantic evaluation, it delivers insightful technical assessments without cloning the full codebase.

*(Live demo screenshots shown below)*

## 🏗 Architecture

![Architecture Diagram](https://github.com/user-attachments/assets/7c739725-0e8e-449e-9792-a9f01669f2b8)

The application follows a serverless, client-side pipeline with three core stages:

### 1. Data Ingestion & Normalization
- Interfaces directly with the GitHub API to reconstruct repository structure.
- Extracts: stars, forks, update timestamps, language distribution, root directory tree, CI/CD configs, Dockerfiles, etc.
- Truncates README to ~8,000 characters for optimal token usage while preserving key context.

### 2. Semantic Analysis Engine (Primary)
- **Model:** Google Gemini 1.5 Flash (`gemini-1.5-flash`)
- **Configuration:** - Temperature: 0.4 for consistent, analytical responses.
  - Persona: "Senior Technical Interviewer".
- **Output:** Enforced structured JSON via `responseSchema` for type-safe frontend rendering.

### 3. Visualization Layer
- Renders output into an interactive dashboard.
- **Features:** Overall 0–100 score, gauges, pie charts (via Recharts), prioritized improvement roadmap, and detailed feedback sections.

## 🔄 Alternative Rating Method (No Gemini API Required)

If you don't have a Google Gemini API key, DevPath AI automatically falls back to a **heuristic-based scoring system** using lightweight, rule-based metrics. This mode is fully local, instant, and provides a solid approximate rating.

### Heuristic Scoring Breakdown (0–100 Scale)

| Category | Weight | Key Metrics Considered |
| :--- | :--- | :--- |
| **Activity & Popularity** | **30%** | Stars, forks, recent commits (last update age), open/closed issues ratio. |
| **Documentation** | **25%** | README length & quality indicators, presence of `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`. |
| **Structure & Best Practices** | **25%** | Tests folder, CI/CD workflows, Dockerfile, LICENSE, config files, `.gitignore`. |
| **Language & Ecosystem** | **10%** | Primary language dominance, number of languages, inferred maturity. |
| **Maintenance Signals** | **10%** | Archived status, release frequency, issue responsiveness hints. |

This fallback ensures the tool remains usable for everyone. For advanced offline AI analysis in the future, integration with local models (e.g., via Ollama: DeepSeek-Coder, Qwen2.5-Coder, or Phi-3) could be added.

## 🛠 Tech Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Core Framework** | React 19 + TypeScript | Modern, type-safe UI development. |
| **Styling** | Tailwind CSS | Rapid, responsive, utility-first design. |
| **AI Runtime** | Google GenAI SDK | Native Gemini integration with schema support. |
| **Visualizations** | Recharts | Lightweight, composable React charts. |
| **Icons** | Lucide React | Consistent, lightweight SVG icons. |

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- (Optional) Google Gemini API Key for full AI-powered analysis

### Installation

```bash
git clone [https://github.com/KrupalWarale/DevPath-AI.git](https://github.com/KrupalWarale/DevPath-AI.git)
cd DevPath-AI

2.  **Environment Configuration**
    Create a `.env` file in the root directory.
    ```bash
    API_KEY=your_google_gemini_api_key
    ```
    *Note: In the current buildless setup, ensure the API key is accessible to the process or hardcoded securely for local testing.*

3.  **Execute**
    Serve the `index.html` using any static file server.
    ```bash
    npx serve .
    ```

## 🧩 Usage Guide

1.  **Input:** Enter a valid GitHub repository URL (e.g., `https://github.com/facebook/react`).
2.  **Process:** The system crawls the repo metadata and invokes the AI agent.
3.  **Result:**
    *   **Overall Score:** A high-level quality metric.
    *   **Roadmap:** A prioritized list (High/Medium/Low) of actionable steps to improve the codebase.
    *   **Deep Dive:** Specific feedback on Code Quality, Documentation, and Structure.

## 🤝 Contributing

Contributions are welcome. Please ensure all pull requests adhere to the following guidelines:
1.  **Type Safety:** No `any` types in TypeScript interfaces.
2.  **Component Modularity:** UI components must be decoupled from business logic.
3.  **AI Safety:** Ensure prompts do not leak sensitive context.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

**Demo**

https://github.com/user-attachments/assets/659596f7-c152-4aaa-a087-c067fa45a57e


