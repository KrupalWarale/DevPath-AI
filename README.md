# DevPath AI - AI Code Analysis System ⚡

DevPath AI is an intelligent system designed to evaluate GitHub repositories and convert them into a meaningful Score + Summary + Personalized Roadmap. It acts as a "Repository Mirror," reflecting the real strengths and weaknesses of a project to help developers improve their code for recruiters and mentors.

## 🚀 Features

1.  **Repository Analysis**: Accepts any public GitHub URL.
2.  **Automated Data Fetching**: Retrieves file structure, language breakdown, commit history (inferred), and documentation quality via GitHub API.
3.  **AI Evaluation**: Uses **Google Gemini 2.5 Flash** to judge code quality, maintainability, and real-world relevance.
4.  **Comprehensive Dashboard**:
    *   **Score**: 0-100 rating with difficulty level (Beginner/Intermediate/Advanced).
    *   **Insights**: Key strengths and weaknesses.
    *   **Visuals**: Language distribution charts and dimension scores.
5.  **Actionable Roadmap**: A prioritized list of steps to improve the project.

## 🛠️ Tech Stack

*   **Frontend**: React 19, TypeScript
*   **Styling**: Tailwind CSS
*   **AI Engine**: Google GenAI SDK (Gemini 2.5 Flash)
*   **Visualization**: Recharts
*   **Icons**: Lucide React

## 🧠 Approach

### 1. Data Collection (GitHub Service)
The system uses the GitHub REST API to fetch:
*   **Metadata**: Stars, forks, open issues, description.
*   **Languages**: Byte count per language to determine the tech stack.
*   **Content**: The root file tree to understand project structure (e.g., separating `src` from `public`, identifying config files like `package.json` or `docker-compose.yml`).
*   **Documentation**: Fetches the raw `README.md` content to evaluate clarity and instruction quality.

### 2. AI Analysis (Gemini Service)
We construct a structured prompt for the **Gemini 2.5 Flash** model. The prompt acts as a "Senior Technical Interviewer" context.
*   **Input**: The raw metadata, file tree string, and truncated README text.
*   **Heuristics**: The AI is instructed to look for specific markers (e.g., existence of test files, clear folder hierarchy, informative commit conventions implied by the state).
*   **Output**: A strict JSON schema containing scores, feedback strings, and a roadmap array.

### 3. Visualization (Dashboard)
The UI is built to be encouraging yet honest.
*   **Score Gauge**: Immediate visual feedback.
*   **Priority Roadmap**: Separates tasks into High/Medium/Low priority so the user knows where to start.

## 📦 Installation & Usage

1.  **Clone the repository**
2.  **Environment Setup**: Ensure you have a valid Google Gemini API Key available in `process.env.API_KEY`.
3.  **Run**: Open `index.html` via a local server.

## 🎯 Goal
To bridge the gap between writing code and writing *employable* code by providing instant, automated mentorship.