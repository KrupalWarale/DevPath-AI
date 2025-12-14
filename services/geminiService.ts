import { GoogleGenAI, Type, Schema } from "@google/genai";
import { RepoMetadata, AnalysisResult } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    overallScore: { type: Type.NUMBER, description: "A score from 0 to 100 representing the quality of the repository." },
    difficultyLevel: { type: Type.STRING, enum: ["Beginner", "Intermediate", "Advanced"] },
    summary: { type: Type.STRING, description: "A concise 2-3 sentence summary of the repository status." },
    strengths: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List of 3-5 key strengths."
    },
    weaknesses: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List of 3-5 key areas for improvement."
    },
    dimensions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          score: { type: Type.NUMBER },
          feedback: { type: Type.STRING }
        },
        required: ["name", "score", "feedback"]
      },
      description: "Detailed scores for dimensions: Code Quality, Documentation, Structure, Real-world Relevance."
    },
    roadmap: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] }
        },
        required: ["title", "description", "priority"]
      }
    }
  },
  required: ["overallScore", "difficultyLevel", "summary", "strengths", "weaknesses", "dimensions", "roadmap"]
};

export const analyzeRepoWithGemini = async (data: RepoMetadata): Promise<AnalysisResult> => {
  const model = "gemini-2.5-flash";
  
  const prompt = `
    You are a Senior Technical Interviewer and Code Mentor. 
    Analyze the following GitHub Repository metadata to evaluate a developer's project.
    
    Repository: ${data.owner}/${data.name}
    Description: ${data.description || 'N/A'}
    Stars: ${data.stars}, Forks: ${data.forks}
    Last Updated: ${data.updatedAt}
    
    Languages: ${JSON.stringify(data.languages)}
    
    File Structure (Top Level):
    ${data.fileStructure}
    
    README Content (Truncated):
    ${data.readmeContent}
    
    Your Task:
    1. Evaluate Code Quality & Readability (Inferred from structure, naming in file list, language usage).
    2. Evaluate Project Structure (Is it standard? Organized?).
    3. Evaluate Documentation (Is the README helpful? Does it explain setup?).
    4. Evaluate Real-world Relevance (Is this a toy app or a production-ready tool?).
    
    Be honest but constructive. If the README is missing, penalize heavily. If there are no tests (e.g. no .test.js, no spec files, no pytest), penalize maintainability.
    
    Generate a JSON response strictly following the schema.
  `;

  try {
    const result = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.4 // Lower temperature for more consistent, analytical results
      }
    });

    const responseText = result.text;
    if (!responseText) {
      throw new Error("Empty response from AI");
    }
    return JSON.parse(responseText) as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze repository with AI.");
  }
};
