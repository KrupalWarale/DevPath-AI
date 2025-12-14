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

**DevPath AI** is a client-side, AI-driven application designed to perform static analysis and qualitative auditing of GitHub repositories. Unlike traditional linters that focus on syntax, DevPath AI evaluates **project health, architectural maturity, and maintainability**.

It leverages the **GitHub REST API** for metadata extraction and **Google's Gemini 2.5 Flash** model for semantic analysis, bridging the gap between raw code metrics and human-like technical assessment.

## 🏗 Architecture & Engineering
<img width="1920" height="280" alt="{215B7ABF-E786-488E-B012-3C13736C0B62}" src="https://github.com/user-attachments/assets/7c739725-0e8e-449e-9792-a9f01669f2b8" />


The application operates on a serverless, client-side architecture. The analysis pipeline consists of three distinct stages:

### 1. Data Ingestion & Normalization
The system interfaces directly with the GitHub API to reconstruct a holistic view of the repository without cloning the full codebase.
- **Metadata Extraction:** Retrieves stars, forks, and updated timestamps to gauge community interest and maintenance frequency.
- **Language Heuristics:** Aggregates byte-counts per language to construct a weighted distribution of the technology stack.
- **Structural Mapping:** Fetches the root directory file tree (`/contents`). This allows the system to infer architecture (e.g., Monorepo vs. Polyrepo, presence of CI/CD configs like `.github/workflows`, Docker containers, etc.) without reading every file.
- **Context Window Optimization:** The `README.md` is fetched and programmatically truncated to 8,000 characters to maximize token efficiency while retaining core documentation context.

### 2. Semantic Analysis Engine (Gemini 2.5)
The normalized data is fed into a **Google GenAI** pipeline.
- **Model:** `gemini-2.5-flash`
- **Configuration:** Temperature set to `0.4` for deterministic, analytical outputs.
- **Prompt Engineering:** The model is primed with a "Senior Technical Interviewer" persona. It evaluates based on:
    - **Code Quality:** Inferred from file structure conventions and language usage.
    - **Documentation:** Analyzed for clarity, installation instructions, and usage examples.
    - **Real-world Relevance:** Assesses if the project resembles a production-ready application or a toy project.
- **Structured Output:** We utilize `responseSchema` (OpenAPI standard) to enforce a strict JSON return format, preventing hallucinated data structures and ensuring type safety in the frontend.

### 3. Visualization Layer
The frontend renders the deterministic JSON output into an interactive dashboard.
- **Scoring Algorithm:** 0-100 weighted index based on the AI's multidimensional analysis.
- **Visuals:** Recharts-powered gauge and pie charts for immediate visual parsing of metrics.

## 🛠 Tech Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Core Framework** | React 19 + TypeScript | Type-safe component architecture for maintainability. |
| **Styling** | Tailwind CSS | Utility-first CSS for rapid, responsive layout execution. |
| **AI Runtime** | Google GenAI SDK | Native interface for Gemini models with schema validation. |
| **Visualizations** | Recharts | Composable charting library for React. |
| **Icons** | Lucide React | Lightweight, consistent SVG iconography. |

## 🚀 Getting Started

### Prerequisites
*   Node.js v18+
*   Google Gemini API Key

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/KrupalWarale/DevPath-AI.git
    cd DevPath-AI
    ```

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
